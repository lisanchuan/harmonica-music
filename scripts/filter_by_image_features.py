#!/usr/bin/env python3
"""
filter_by_image_features.py
基于图片特征过滤乐谱图：
1. 尺寸（宽高）
2. 文件大小
3. OCR 文字内容（含"谱/和弦/弹唱/指弹/调号"等关键字）
"""

import json, re, os, subprocess, sys
from pathlib import Path
from PIL import Image
from collections import Counter
from typing import Optional, Set

# ---------------------------------------------------------------
# 配置
# ---------------------------------------------------------------

# 缩略图尺寸（已确认非乐谱）
THUMBNAIL_DIMENSIONS = {(133, 113), (70, 75), (248, 187)}

# 典型非乐谱的宽高比和尺寸
SKIP_RATIOS = []  # 暂时不用

# 文件大小阈值（KB）
MIN_SIZE_KB = 5

# OCR 关键字（乐谱特征词）
SHEET_KEYWORDS = [
    '谱', '和弦', '弹唱', '指弹', '调号', 'Capo', 'capo', '演奏',
    'ukulele', 'Ukulele', 'guitar', 'Guitar', 'fingerstyle',
    'chord', 'Chord', 'tab', 'Tab', 'tabs', '四弦', '六线',
    '♩', '♪', '♫',  # 音符符号
]

# 微信图片特征（已确认非乐谱）
AD_PATTERNS = [
    'qrcode', 'qr_code', 'qr', '二维码', '小程序', '公众号',
    '扫码', '关注', '视频号',
]


# ---------------------------------------------------------------
# 工具函数
# ---------------------------------------------------------------

def get_image_info(path: Path) -> Optional[dict]:
    """返回图片的尺寸、文件大小、OCR文本。"""
    try:
        img = Image.open(path)
        w, h = img.size
        kb = path.stat().st_size // 1024

        # OCR
        try:
            import pytesseract
            text = pytesseract.image_to_string(img, lang='chi_sim+eng')
        except Exception as e:
            text = ""
            print(f"    [OCR] {path.name}: {e}")

        return {"w": w, "h": h, "kb": kb, "text": text, "ok": True}
    except Exception as e:
        return None


def is_likely_sheet(info: dict) -> bool:
    """判断一张图是否像乐谱。"""
    w, h, kb, text = info["w"], info["h"], info["kb"], info.get("text", "")

    # 1. 排除缩略图
    if (w, h) in THUMBNAIL_DIMENSIONS:
        return False

    # 2. 排除极小文件
    if kb < MIN_SIZE_KB:
        return False

    # 3. 排除广告图（文字含二维码等）
    if any(p in text for p in AD_PATTERNS):
        return False

    # 4. OCR 有谱相关关键字 → 优先保留
    if any(k in text for k in SHEET_KEYWORDS):
        return True

    # 5. 文件大小 ≥ 200KB 且宽高比像乐谱
    if kb >= 200 and 0.5 <= w / h <= 3.0 and w >= 300:
        return True

    return False


# ---------------------------------------------------------------
# 分析本地图片，建立阈值
# ---------------------------------------------------------------

def analyze_sample_images():
    """分析已知乐谱图和非乐谱图，建立特征阈值。"""
    base = Path(__file__).parent.parent
    img_dir = base / "public" / "images"
    songs_file = base / "data" / "wechat_songs.json"

    with open(songs_file, "r", encoding="utf-8") as f:
        songs = json.load(f)

    # 建立 sheet_map
    sheet_map = {}
    for s in songs:
        rid = s["resource_id"]
        sheets = [p.split("/")[-1] for p in s.get("sheet_images", [])]
        sheet_map[rid] = set(sheets)

    wb_files = sorted([f for f in os.listdir(img_dir) if f.startswith("wb_")])

    def fname_to_bizmid(fname):
        return fname.rsplit("_", 1)[0]

    sheet_stats = []
    nonsheet_stats = []

    for fname in wb_files:
        bizmid = fname_to_bizmid(fname)
        is_sheet = fname in sheet_map.get(bizmid, set())
        p = img_dir / fname
        if not p.exists():
            continue
        try:
            img = Image.open(p)
            w, h = img.size
            kb = p.stat().st_size // 1024
            if is_sheet:
                sheet_stats.append((fname, w, h, kb))
            else:
                nonsheet_stats.append((fname, w, h, kb))
        except:
            pass

    return sheet_stats, nonsheet_stats


# ---------------------------------------------------------------
# 主脚本：对所有文章过滤
# ---------------------------------------------------------------

def main():
    base = Path(__file__).parent.parent
    img_dir = base / "public" / "images"
    songs_file = base / "data" / "wechat_songs.json"
    output_file = base / "data" / "wechat_songs_filtered.json"

    with open(songs_file, "r", encoding="utf-8") as f:
        songs = json.load(f)

    print(f"Loaded {len(songs)} songs, {len(list(os.listdir(img_dir)))} images")
    print(f"Tesseract path: {subprocess.run(['which', 'tesseract'], capture_output=True, text=True).stdout.strip()}")
    print()

    # 注册 tesseract 路径
    import pytesseract
    tesseract_path = subprocess.run(
        ["brew", "--prefix"], capture_output=True, text=True
    ).stdout.strip()
    if tesseract_path:
        pytesseract.pytesseract.tesseract_cmd = (
            Path(tesseract_path) / "bin" / "tesseract"
        )

    # 建立 resource_id -> article images
    # 每篇文章的所有图片，按序号排列
    article_images: dict = {}
    for fname in sorted(os.listdir(img_dir)):
        if not fname.startswith("wb_"):
            continue
        bizmid = fname.rsplit("_", 1)[0]
        seq_str = fname.rsplit("_", 1)[-1].replace(".jpg", "")
        try:
            seq = int(seq_str)
        except ValueError:
            continue
        if bizmid not in article_images:
            article_images[bizmid] = {}
        article_images[bizmid][seq] = fname

    new_songs = []
    total_before = 0
    total_after = 0
    ocr_hit = 0
    size_hit = 0
    skipped_thumb = 0

    for i, entry in enumerate(songs):
        rid = entry["resource_id"]
        content = entry.get("content", "") or ""

        # 收集这篇文章已有的 sheet_images（如有）
        existing_sheets = set(p.split("/")[-1] for p in entry.get("sheet_images", []))

        # 获取这篇文章的所有本地图片
        article_imgs = article_images.get(rid, {})
        if not article_imgs:
            new_songs.append(dict(entry))
            continue

        kept = set()
        for seq, fname in sorted(article_imgs.items()):
            p = img_dir / fname
            if not p.exists():
                continue
            total_before += 1

            info = get_image_info(p)
            if not info:
                continue

            # 缩略图直接跳过
            if (info["w"], info["h"]) in THUMBNAIL_DIMENSIONS:
                skipped_thumb += 1
                continue

            # 用 OCR + 尺寸综合判断
            text_lower = info["text"].lower()
            kb = info["kb"]
            w, h = info["w"], info["h"]
            ratio = w / h

            is_sheet = False

            # 规则1：OCR 含谱相关字
            if any(k.lower() in text_lower or k in info["text"] for k in SHEET_KEYWORDS):
                is_sheet = True
                ocr_hit += 1

            # 规则2：大文件 + 合理比例（备选）
            elif kb >= 200 and 0.4 <= ratio <= 3.0 and w >= 300:
                is_sheet = True
                size_hit += 1

            if is_sheet:
                kept.add(f"/images/{fname}")
                total_after += 1

        # 如果过滤后为空，保留原有 sheet_images
        if not kept and existing_sheets:
            kept = {f"/images/{f}" for f in existing_sheets}
            print(f"  [{i:3d}] 用原有sheet_images: {entry.get('title','')[:30]}")

        new_entry = dict(entry)
        new_entry["sheet_images"] = sorted(list(kept))
        new_entry["content"] = content
        new_songs.append(new_entry)

        if i < 5 or (kept and len(kept) < 3):
            label = " ◀前5" if i < 5 else ""
            print(f"  [{i:3d}] {entry.get('title','')[:30]:30s} "
                  f"| keep={len(kept):2d} {label}")

    print(f"\n统计: OCR命中={ocr_hit} 尺寸命中={size_hit} 跳过缩略图={skipped_thumb}")
    print(f"总计: {total_before} → {total_after} (过滤掉 {total_before - total_after})")

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(new_songs, f, ensure_ascii=False, indent=2)
    print(f"已保存: {output_file}")


if __name__ == "__main__":
    main()
