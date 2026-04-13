#!/usr/bin/env python3
"""
extract_sheets_fix.py — 修复版：从原始 HTML 提取 sheet_images
- 使用非贪婪匹配 (.*?) 避免跨 section 贪婪
- 正确处理嵌套 section
"""
import json, os, re
from pathlib import Path
from multiprocessing import Pool, cpu_count
import time

BASE = Path(__file__).parent.parent
HTML_DIR = BASE / "public" / "html_pages"
DATA_FILE = BASE / "data" / "wechat_songs.json"
BACKUP_SUFFIX = ".bak_regex_fix"

# 从已有 wechat_songs.json 读取，保持其他字段不变
with open(DATA_FILE) as f:
    songs = json.load(f)

def extract_sheet_images_from_html(html_content):
    """从简化 HTML content 字段提取 sheet_images（图片 src 列表）"""
    if not html_content:
        return []
    imgs = re.findall(r'<img[^>]+src="(/images/[^"]+)"', html_content)
    return imgs

def extract_sheet_images_from_html_full(html_content):
    """
    从原始完整 HTML 提取乐谱图。
    策略：找所有 data-id="33" section，用非贪婪匹配
    """
    if not html_content:
        return [], {}

    results = []
    seen = set()

    # 错误方式（贪婪）：
    # re.findall(r'<section[^>]*data-id="33"[^>]*>(.*?)</section>', html, re.DOTALL)
    #
    # 正确方式：分段处理每个 data-id="33" section
    # 找所有 section 及其 data-id，然后只在 data-id="33" 的 section 内找 img
    section_pattern = re.compile(r'<section[^>]*data-id="(\d+)"[^>]*>', re.DOTALL)

    # 把 HTML 按 section 分割
    # 思路：找到所有带 data-id 的 section 位置和它们的 data-id
    matches = list(section_pattern.finditer(html_content))

    for i, m in enumerate(matches):
        data_id = m.group(1)
        if data_id != "33":
            continue

        # 这个 section 的内容范围：从 <section...> 开始到下一个 section 开始之前
        start = m.start()
        if i + 1 < len(matches):
            end = matches[i + 1].start()
        else:
            end = len(html_content)

        section_html = html_content[start:end]
        # 在这个 section 内找所有 img 的 data-index
        indices = re.findall(r'data-index="(\d+)"', section_html)
        for idx in indices:
            if idx not in seen:
                seen.add(idx)
                results.append(f"/images/{int(idx) + 1:03d}.jpg")

    return results, {}


def process_article(args):
    song = args
    rid = song['resource_id']

    # 尝试读取原始 HTML 文件
    html_file = HTML_DIR / f"{rid}.html"
    if html_file.exists():
        with open(html_file, encoding='utf-8') as f:
            html = f.read()
        sheets, _ = extract_sheet_images_from_html_full(html)
        if sheets:
            return song, sheets

    # 如果没有 HTML 文件，从 content 字段提取（fallback）
    content = song.get('content', '')
    if content:
        sheets = extract_sheet_images_from_html(content)
        if sheets:
            return song, sheets

    return song, song.get('sheet_images', [])


def main():
    print(f"Processing {len(songs)} articles...")

    t0 = time.time()
    n_workers = max(1, cpu_count() - 1)
    results = {}

    with Pool(n_workers) as pool:
        for song, sheets in pool.imap(process_article, songs):
            results[song['resource_id']] = sheets

    elapsed = time.time() - t0
    print(f"Done in {elapsed:.1f}s")

    # 统计
    n_with = sum(1 for s in songs if results.get(s['resource_id'], []))
    total = sum(len(results.get(s['resource_id'], [])) for s in songs)
    print(f"Articles with sheet_images: {n_with} / {len(songs)}")
    print(f"Total sheet images: {total}")

    # 预览
    print("\nPreview (first 5):")
    for s in songs[:5]:
        rid = s['resource_id']
        sheets = results.get(rid, [])
        old = s.get('sheet_images', [])
        status = "✓" if sheets == old else "✗ CHANGED"
        print(f"  [{status}] {s['title'][:30]:30s} {len(sheets)}张: {sheets[:3]}")

    # 备份原文件
    backup_file = DATA_FILE.with_name(DATA_FILE.name + BACKUP_SUFFIX)
    with open(backup_file, 'w', encoding='utf-8') as f:
        json.dump(songs, f, ensure_ascii=False, indent=2)
    print(f"\nBackup: {backup_file}")

    # 更新 sheet_images 字段
    updated = 0
    for s in songs:
        new_sheets = results.get(s['resource_id'], [])
        if new_sheets != s.get('sheet_images', []):
            s['sheet_images'] = new_sheets
            updated += 1

    print(f"Updated {updated} articles")

    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(songs, f, ensure_ascii=False, indent=2)
    print(f"Saved: {DATA_FILE}")


if __name__ == "__main__":
    main()
