#!/usr/bin/env python3
"""
白熊音乐 → harmonica-music 数据同步脚本

支持两种运行方式：
  1. 本地运行（通过 docker exec 实时查询）
  2. Docker 容器内运行（直连 /app/data/db.db）

用法：
    python3 sync_white_bear.py --limit 50
    python3 sync_white_bear.py --keyword 尤克里里
    python3 sync_white_bear.py --all          # 不过滤关键词
    python3 sync_white_bear.py --docker        # 在宿主机通过 docker exec 查询
"""
from __future__ import annotations
import argparse
import json
import os
import sqlite3
import subprocess
from datetime import datetime
from typing import Dict, List, Optional

# ====== 配置 ======
CONTAINER_NAME = "we-mp-rss"          # Docker 容器名
DB_PATH_IN_CONTAINER = "/app/data/db.db"
OUTPUT_FILE = "/Users/lisanchuan1/Documents/code/ai code/harmonica-music/data/wechat_songs.json"
WHITE_BEAR_MP_ID = "MP_WXS_3273006200"
WHITE_BEAR_NAME = "白熊音乐"
INSTRUMENT = "ukulele"

# 默认关键词（OR 逻辑）
DEFAULT_KEYWORDS = ["尤克里里", "ukulele", "Ukulele", "琴", "和弦", "弹唱", "指弹"]


def parse_timestamp(ts: int) -> str:
    if not ts:
        return ""
    return datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M")


def clean_html(raw_html: str) -> str:
    """去掉 <!DOCTYPE>, <head>, 保留 <body> 或 <section> 主体内容"""
    import re
    if not raw_html:
        return ""
    html = raw_html.strip()
    # 去掉 <!DOCTYPE>
    html = re.sub(r'^<!DOCTYPE[^>]*>\s*', '', html, flags=re.IGNORECASE)
    # 去掉 <head>...</head>
    html = re.sub(r'<head[^>]*>.*?</head>', '', html, flags=re.DOTALL | re.IGNORECASE)
    # 只保留 <body> 内部（如果有）
    body_match = re.search(r'<body[^>]*>(.*)</body>', html, flags=re.DOTALL | re.IGNORECASE)
    if body_match:
        html = body_match.group(1)
    return html.strip()


def article_to_song(article: Dict) -> Dict:
    article_id = article["id"]
    resource_id = f"wb_{article_id}"
    # 优先用 content_html（提取后的正文），其次 content_html，其次 content
    content = article.get("content_html") or article.get("content") or ""
    content = clean_html(content)
    summary = article.get("description") or ""
    return {
        "resource_id": resource_id,
        "title": article.get("title", "").strip(),
        "img_url": article.get("pic_url") or "",
        "view_count": "0",
        "price": 0,
        "line_price": 0,
        "source": "wechat_mp",
        "mp_id": WHITE_BEAR_MP_ID,
        "mp_name": WHITE_BEAR_NAME,
        "summary": summary.strip(),
        "content": content,
        "external_url": article.get("url") or "",
        "published_at": parse_timestamp(article.get("publish_time")),
        "instrument": INSTRUMENT,
        "style": ["pop"],
    }


def filter_by_keywords(title: str, description: str, keywords: List[str]) -> bool:
    if not keywords:
        return True
    text = (title + description).lower()
    return any(kw.lower() in text for kw in keywords)


def load_existing(file_path: str) -> List[Dict]:
    if not os.path.exists(file_path):
        return []
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data if isinstance(data, list) else []


def save_songs(file_path: str, songs: List[Dict]):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(songs, f, ensure_ascii=False, indent=2)
    print(f"Written {len(songs)} songs to {file_path}")


def query_db(sql: str, params: tuple = ()) -> List[Dict]:
    """通过 docker exec 查询容器内数据库"""
    cmd = [
        "docker", "exec", CONTAINER_NAME,
        "python3", "-c",
        f"import sqlite3,json; conn=sqlite3.connect('{DB_PATH_IN_CONTAINER}'); conn.row_factory=sqlite3.Row; c=conn.cursor(); rows=c.execute({repr(sql)},{params}).fetchall(); print(json.dumps([dict(r) for r in rows]))"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    if result.returncode != 0:
        raise RuntimeError(f"docker exec failed: {result.stderr}")
    return json.loads(result.stdout.strip())


def sync(keywords: List[str], limit: Optional[int] = None):
    print(f"Fetching from container: {CONTAINER_NAME}")
    print(f"Keywords: {keywords if keywords else 'none'}")
    print(f"MP_ID: {WHITE_BEAR_MP_ID}")

    # 1. 查询总数
    total_rows = query_db(
        "SELECT COUNT(*) as cnt FROM articles WHERE mp_id=?",
        (WHITE_BEAR_MP_ID,)
    )
    total = total_rows[0]["cnt"] if total_rows else 0
    print(f"Total articles for {WHITE_BEAR_NAME}: {total}")

    # 2. 查询文章列表（带 content）
    limit_clause = f"LIMIT {limit}" if limit else ""
    rows = query_db(
        f"""
        SELECT id, mp_id, title, pic_url, url, description,
               content, content_html, publish_time
        FROM articles
        WHERE mp_id=?
        ORDER BY publish_time DESC
        {limit_clause}
        """,
        (WHITE_BEAR_MP_ID,)
    )

    # 3. 过滤 & 转换
    songs: List[Dict] = []
    skipped = 0
    for row in rows:
        title = row.get("title", "")
        desc = row.get("description", "")
        if not filter_by_keywords(title, desc, keywords):
            skipped += 1
            continue
        songs.append(article_to_song(row))

    print(f"Converted: {len(songs)} (skipped {skipped})")

    # 4. 合并已有数据（去重）
    existing = {s["resource_id"]: s for s in load_existing(OUTPUT_FILE)}
    for song in songs:
        existing[song["resource_id"]] = song

    merged = list(existing.values())
    merged.sort(key=lambda s: s.get("published_at", ""), reverse=True)
    save_songs(OUTPUT_FILE, merged)


def main():
    parser = argparse.ArgumentParser(description="Sync WhiteBear articles to harmonica-music")
    parser.add_argument("--limit", type=int, default=200, help="Max articles to sync")
    parser.add_argument("--keyword", type=str, nargs="+", default=None)
    parser.add_argument("--all", action="store_true", help="Sync all (no keyword filter)")
    args = parser.parse_args()

    keywords = [] if args.all else (args.keyword or DEFAULT_KEYWORDS)
    sync(keywords, limit=args.limit)


if __name__ == "__main__":
    main()
