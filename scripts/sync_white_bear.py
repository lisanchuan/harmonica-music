#!/usr/bin/env python3
from __future__ import annotations
"""白熊音乐 → harmonica-music 数据同步脚本"""
import argparse
import json
import os
import sqlite3
from datetime import datetime
from typing import Dict, List

WE_MP_RSS_DB = "/tmp/we-mp-rss.db"
OUTPUT_FILE = "/Users/lisanchuan1/Documents/code/ai code/harmonica-music/data/wechat_songs.json"
WHITE_BEAR_MP_ID = "MP_WXS_3273006200"
WHITE_BEAR_NAME = "白熊音乐"
INSTRUMENT = "ukulele"
DEFAULT_KEYWORDS = ["尤克里里", "ukulele", "Ukulele", "琴", "和弦", "弹唱", "指弹"]


def parse_timestamp(ts: int) -> str:
    return datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M")


def article_to_song(article: Dict) -> Dict:
    article_id = article["id"]
    resource_id = f"wb_{article_id}"
    content = article.get("content_html") or ""
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
        "published_at": parse_timestamp(article["publish_time"]) if article.get("publish_time") else "",
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


def sync(db_path: str, output_path: str, keywords: List[str], limit: int = None, offset: int = 0):
    print(f"Reading DB: {db_path}")
    print(f"Keywords: {keywords if keywords else 'none'}")

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM articles WHERE mp_id = ?", (WHITE_BEAR_MP_ID,))
    total = cursor.fetchone()[0]
    print(f"Total articles for {WHITE_BEAR_NAME}: {total}")

    cursor.execute(
        "SELECT id, mp_id, title, pic_url, url, description, content_html, publish_time "
        "FROM articles WHERE mp_id = ? ORDER BY publish_time DESC LIMIT ? OFFSET ?",
        (WHITE_BEAR_MP_ID, limit if limit else 999999, offset),
    )

    songs: List[Dict] = []
    skipped = 0
    for row in cursor.fetchall():
        article = dict(row)
        title = article.get("title", "")
        desc = article.get("description", "")
        if not filter_by_keywords(title, desc, keywords):
            skipped += 1
            continue
        songs.append(article_to_song(article))

    conn.close()
    print(f"Converted: {len(songs)} (skipped {skipped})")

    existing = {s["resource_id"]: s for s in load_existing(output_path)}
    for song in songs:
        existing[song["resource_id"]] = song

    merged = list(existing.values())
    merged.sort(key=lambda s: s.get("published_at", ""), reverse=True)
    save_songs(output_path, merged)


def main():
    parser = argparse.ArgumentParser(description="Sync WhiteBear articles to harmonica-music")
    parser.add_argument("--limit", type=int, default=200, help="Max articles to sync")
    parser.add_argument("--keyword", type=str, nargs="+", default=None)
    parser.add_argument("--all", action="store_true", help="Sync all (no keyword filter)")
    args = parser.parse_args()

    keywords = [] if args.all else (args.keyword or DEFAULT_KEYWORDS)
    sync(WE_MP_RSS_DB, OUTPUT_FILE, keywords, limit=args.limit)


if __name__ == "__main__":
    main()
