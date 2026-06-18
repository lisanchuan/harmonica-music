#!/usr/bin/env python3
"""并行 OCR 过滤脚本——多进程加速"""
import sys, os, json, subprocess, time
from pathlib import Path
from multiprocessing import Pool, cpu_count
from functools import partial

# ---------------------------------------------------------------
# 配置
# ---------------------------------------------------------------
THUMBNAIL = {(133, 113), (70, 75), (248, 187)}
MIN_KB = 5

SHEET_KEYWORDS = [
    '谱', '和弦', '弹唱', '指弹', '调号', 'Capo', 'capo', '演奏',
    'ukulele', 'Ukulele', 'guitar', 'Guitar', 'fingerstyle',
    'chord', 'Chord', 'tab', 'Tab', 'tabs', '四弦', '六线',
]

AD_PATTERNS = ['qrcode', '二维码', '小程序', '公众号', '扫码', '关注', '视频号']

TESSERACT_CMD = '/opt/homebrew/bin/tesseract'

# ---------------------------------------------------------------
# 单图分析（进程内调用）
# ---------------------------------------------------------------
def analyze_image(args):
    fname, img_path = args
    try:
        from PIL import Image
        import pytesseract

        img = Image.open(img_path)
        w, h = img.size
        kb = img_path.stat().st_size // 1024

        if (w, h) in THUMBNAIL or kb < MIN_KB:
            return fname, False, "thumbnail/small"

        text = pytesseract.image_to_string(img, lang='chi_sim+eng')
        text_lower = text.lower()

        # 广告图
        if any(p.lower() in text_lower for p in AD_PATTERNS):
            return fname, False, "ad"

        # OCR 含谱关键字
        if any(k.lower() in text_lower or k in text for k in SHEET_KEYWORDS):
            return fname, True, "ocr_hit"

        # 大文件 + 合理比例
        if kb >= 200 and 0.4 <= w / h <= 3.0 and w >= 300:
            return fname, True, "size_hint"

        return fname, False, "no_match"
    except Exception as e:
        return fname, False, f"error:{e}"


# ---------------------------------------------------------------
# 主脚本
# ---------------------------------------------------------------
def main():
    base = Path(__file__).parent.parent
    img_dir = base / "public" / "images"
    songs_file = base / "data" / "wechat_songs.json"
    output_file = base / "data" / "wechat_songs_filtered.json"

    with open(songs_file, "r", encoding="utf-8") as f:
        songs = json.load(f)

    # 建立 resource_id -> {seq: fname}
    article_images = {}
    for fname in sorted(os.listdir(img_dir)):
        if not fname.startswith("wb_"):
            continue
        bizmid = fname.rsplit("_", 1)[0]
        try:
            seq = int(fname.rsplit("_", 1)[-1].replace(".jpg", ""))
        except ValueError:
            continue
        article_images.setdefault(bizmid, {})[seq] = fname

    n_workers = max(1, cpu_count() - 1)
    print(f"Using {n_workers} workers, {len(article_images)} articles")

    t0 = time.time()
    ocr_hit = size_hit = skipped_thumb = 0
    all_results = {}  # fname -> (is_sheet, reason)

    # 批量并行处理
    all_tasks = []
    for bizmid, imgs in article_images.items():
        for seq, fname in imgs.items():
            all_tasks.append((fname, img_dir / fname))

    print(f"Total images to analyze: {len(all_tasks)}")

    # 分批跑，每批 200 张（避免超时）
    BATCH = 200
    for batch_start in range(0, len(all_tasks), BATCH):
        batch = all_tasks[batch_start:batch_start + BATCH]
        print(f"  Batch {batch_start//BATCH + 1}: processing {len(batch)} images...")
        with Pool(n_workers) as pool:
            results = pool.map(analyze_image, batch)
        for fname, is_sheet, reason in results:
            all_results[fname] = (is_sheet, reason)
            if is_sheet:
                if reason == "ocr_hit":
                    ocr_hit += 1
                elif reason == "size_hint":
                    size_hit += 1
            elif reason == "thumbnail/small":
                skipped_thumb += 1

        elapsed = time.time() - t0
        done = batch_start + len(batch)
        rate = done / elapsed if elapsed > 0 else 0
        eta = (len(all_tasks) - done) / rate if rate > 0 else 0
        print(f"    Done {done}/{len(all_tasks)} | Elapsed: {elapsed:.0f}s | ETA: {eta:.0f}s")

    print(f"\nOCR命中: {ocr_hit} | 尺寸命中: {size_hit} | 跳过缩略图: {skipped_thumb}")
    print(f"总耗时: {time.time() - t0:.0f}s")

    # 写结果
    new_songs = []
    for entry in songs:
        rid = entry["resource_id"]
        imgs = article_images.get(rid, {})
        kept = sorted(
            f"/images/{fname}"
            for seq, fname in sorted(imgs.items())
            if all_results.get(fname, (False, ""))[0]
        )
        new_entry = dict(entry)
        new_entry["sheet_images"] = kept
        new_songs.append(new_entry)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(new_songs, f, ensure_ascii=False, indent=2)

    n_with_sheets = sum(1 for s in new_songs if s.get("sheet_images"))
    total_kept = sum(len(s.get("sheet_images", [])) for s in new_songs)
    print(f"有sheet_images的文章: {n_with_sheets} | 总保留图片: {total_kept}")
    print(f"已保存: {output_file}")


if __name__ == "__main__":
    main()
