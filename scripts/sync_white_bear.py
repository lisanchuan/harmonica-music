#!/usr/bin/env python3
"""
白熊音乐 → harmonica-music 数据同步脚本
数据来源：we-mp-rss 容器的 db.db + cache/content/
"""
from __future__ import annotations
import argparse
import json
import os
import re
import sqlite3
import subprocess
import urllib.request
from datetime import datetime
from typing import Dict, List, Optional

CONTAINER_NAME = "we-mp-rss"
DB_IN_CONTAINER = "/app/data/db.db"
CACHE_IN_CONTAINER = "/app/data/cache/content"
LOCAL_DB = "/tmp/we-mp-rss-sync.db"
LOCAL_CACHE = "/tmp/we-mp-rss-cache"

HARMONICA_ROOT = "/Users/lisanchuan1/Documents/code/ai code/harmonica-music"
OUTPUT_FILE = os.path.join(HARMONICA_ROOT, "data", "wechat_songs.json")
IMAGES_DIR = os.path.join(HARMONICA_ROOT, "public", "images")

WHITE_BEAR_MP_ID = "MP_WXS_3273006200"
WHITE_BEAR_NAME = "白熊音乐"
INSTRUMENT = "ukulele"

DEFAULT_KEYWORDS = ["尤克里里", "ukulele", "琴", "和弦", "弹唱", "指弹"]
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
REFERER = "https://mp.weixin.qq.com/"


def parse_timestamp(ts: int) -> str:
    if not ts:
        return ""
    return datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M")


def copy_from_container() -> bool:
    os.makedirs(LOCAL_CACHE, exist_ok=True)
    try:
        subprocess.run(["docker", "cp", f"{CONTAINER_NAME}:{DB_IN_CONTAINER}", LOCAL_DB],
            check=True, capture_output=True, timeout=30)
        subprocess.run(["docker", "cp", f"{CONTAINER_NAME}:{CACHE_IN_CONTAINER}/.", LOCAL_CACHE],
            check=True, capture_output=True, timeout=60)
        return True
    except Exception as e:
        print(f"Copy failed: {e}")
        return False


def download_image(url: str, local_path: str, timeout: int = 15) -> bool:
    if not url or not url.startswith("http"):
        return False
    if os.path.exists(local_path) and os.path.getsize(local_path) > 1000:
        return True
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Referer": REFERER})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = resp.read()
            if len(data) < 1000:
                return False
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            with open(local_path, "wb") as f:
                f.write(data)
            return True
    except Exception:
        return False


def get_content_from_cache(article_id: str) -> str:
    cache_file = os.path.join(LOCAL_CACHE, f"{article_id}.json")
    try:
        with open(cache_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("content") or ""
    except Exception:
        return ""


def clean_html(html: str) -> str:
    if not html:
        return ""
    h = html.strip()
    h = re.sub(r'^<!DOCTYPE[^>]*>\s*', '', h, flags=re.IGNORECASE)
    h = re.sub(r'<head[^>]*>.*?</head>', '', h, flags=re.DOTALL | re.IGNORECASE)
    return h.strip()


def replace_images_in_html(html: str, article_id: str) -> str:
    counter = [0]

    def replacer(m):
        orig_url = m.group(1)
        if "mmbiz" not in orig_url:
            return m.group(0)
        ext = "jpg"
        if ".png" in orig_url:
            ext = "png"
        elif ".gif" in orig_url:
            ext = "gif"
        elif ".webp" in orig_url:
            ext = "webp"
        counter[0] += 1
        local_name = f"wb_{article_id}_{counter[0]:03d}.{ext}"
        local_path = os.path.join(IMAGES_DIR, local_name)
        ok = download_image(orig_url, local_path)
        if ok:
            return f'src="/images/{local_name}"'
        return m.group(0)

    return re.sub(r'src=["\']([^"\']+)["\']', replacer, html, flags=re.IGNORECASE)


def article_to_song(row) -> Dict:
    def g(key: str, default=''):
        try:
            val = row[key]
            return val if val is not None else default
        except Exception:
            return default

    article_id = str(g('id', ''))
    if not article_id:
        raise ValueError("Empty article id")

    # 封面图
    cover_name = f"wb_{article_id}.jpg"
    cover_local = os.path.join(IMAGES_DIR, cover_name)
    cover_url = g('pic_url')
    local_cover = f"/images/{cover_name}"
    if cover_url:
        if not download_image(cover_url, cover_local):
            local_cover = cover_url

    # 内容：优先从 cache 读
    raw_html = get_content_from_cache(article_id) or g('content_html') or g('content') or ""
    clean = clean_html(raw_html)
    clean = replace_images_in_html(clean, article_id)

    pt = g('publish_time')
    published_at = parse_timestamp(int(pt) if pt else 0)

    return {
        "resource_id": f"wb_{article_id}",
        "title": g('title', '').strip(),
        "img_url": local_cover,
        "view_count": "0",
        "price": 0,
        "line_price": 0,
        "source": "wechat_mp",
        "mp_id": WHITE_BEAR_MP_ID,
        "mp_name": WHITE_BEAR_NAME,
        "summary": (g('description') or '').strip(),
        "content": clean,
        "external_url": g('url') or "",
        "published_at": published_at,
        "instrument": INSTRUMENT,
        "style": ["pop"],
    }


def filter_by_keywords(title: str, description: str, keywords: List[str]) -> bool:
    if not keywords:
        return True
    text = (title + description).lower()
    return any(kw.lower() in text for kw in keywords)


def load_existing() -> Dict[str, Dict]:
    if not os.path.exists(OUTPUT_FILE):
        return {}
    with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, list):
        return {s["resource_id"]: s for s in data}
    return {}


def save_songs(songs: List[Dict]):
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(songs, f, ensure_ascii=False, indent=2)
    print(f"Written {len(songs)} songs to {OUTPUT_FILE}")


def sync(keywords: List[str], limit: Optional[int] = None):
    if not copy_from_container():
        return

    conn = sqlite3.connect(LOCAL_DB)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM articles WHERE mp_id=?", (WHITE_BEAR_MP_ID,))
    total = cursor.fetchone()[0]
    print(f"Total articles for {WHITE_BEAR_NAME}: {total}")

    cursor.execute(
        "SELECT id, mp_id, title, pic_url, url, description, content_html, content, publish_time "
        "FROM articles WHERE mp_id=? ORDER BY publish_time DESC",
        (WHITE_BEAR_MP_ID,)
    )
    all_rows = cursor.fetchall()
    conn.close()

    songs: List[Dict] = []
    skipped = 0
    count = 0

    for row in all_rows:
        title = (row["title"] or "")[:80]
        desc = row["description"] or ""
        count += 1

        if not filter_by_keywords(title, desc, keywords):
            skipped += 1
            continue
        if limit and count > limit:
            break

        print(f"[{count}] {title[:40]}...", end=" ", flush=True)
        try:
            song = article_to_song(row)
            songs.append(song)
            print("OK")
        except Exception as e:
            print(f"ERROR: {e}")

    print(f"\nConverted: {len(songs)} (skipped {skipped})")

    existing = load_existing()
    for song in songs:
        existing[song["resource_id"]] = song

    merged = list(existing.values())
    merged.sort(key=lambda s: s.get("published_at", ""), reverse=True)
    save_songs(merged)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--keyword", type=str, nargs="+", default=None)
    parser.add_argument("--all", action="store_true")
    args = parser.parse_args()
    keywords = [] if args.all else (args.keyword or DEFAULT_KEYWORDS)
    sync(keywords, limit=args.limit)


if __name__ == "__main__":
    main()
