#!/usr/bin/env python3
"""并行 OCR 过滤脚本 v2"""
import sys, os, json, subprocess, time
from pathlib import Path
from multiprocessing import Pool, cpu_count

THUMBNAIL_MAX_PX = 200
MIN_WIDTH_PX = 240
MAX_RATIO = 3.5
MIN_SIZE_KB = 5

SHEET_KEYWORDS = ['谱','和弦','弹唱','指弹','调号','Capo','capo',
                   'ukulele','guitar','fingerstyle','chord','tab']

TESSERACT = '/opt/homebrew/bin/tesseract'


def analyze(args):
    fname, p = args
    try:
        from PIL import Image
        img = Image.open(p)
        w, h = img.size
        kb = p.stat().st_size // 1024
        ratio = w / h

        if w < THUMBNAIL_MAX_PX or h < THUMBNAIL_MAX_PX:
            return fname, False, 'thumbnail'
        if ratio > MAX_RATIO:
            return fname, False, 'extreme_ratio'
        if kb < MIN_SIZE_KB:
            return fname, False, 'small_file'

        text = subprocess.run(
            [TESSERACT, str(p), 'stdout', '-l', 'chi_sim+eng', '--psm', '6'],
            capture_output=True, text=True, timeout=8
        ).stdout

        if any(k in text for k in SHEET_KEYWORDS):
            return fname, True, 'ocr_hit'
        if kb >= 200 and 0.5 <= ratio <= MAX_RATIO and w >= MIN_WIDTH_PX:
            return fname, True, 'size_hint'
        return fname, False, 'no_match'
    except Exception as e:
        return fname, False, f'err:{e}'


def main():
    base = Path(__file__).parent.parent
    img_dir = base / "public" / "images"
    songs_file = base / "data" / "wechat_songs.json"
    output_file = base / "data" / "wechat_songs_filtered.json"

    with open(songs_file, "r", encoding="utf-8") as f:
        songs = json.load(f)

    # 建立 article -> {seq: fname}
    article_images = {}
    for fname in sorted(os.listdir(img_dir)):
        if not fname.startswith('wb_'): continue
        bizmid = fname.rsplit('_', 1)[0]
        try:
            seq = int(fname.rsplit('_', 1)[-1].replace('.jpg', ''))
        except: continue
        article_images.setdefault(bizmid, {})[seq] = fname

    all_tasks = [
        (fname, img_dir / fname)
        for bizmid, imgs in article_images.items()
        for seq, fname in imgs.items()
    ]
    print(f"Total images: {len(all_tasks)}")

    n_workers = max(1, cpu_count() - 1)
    results = {}

    BATCH = 300
    for start in range(0, len(all_tasks), BATCH):
        batch = all_tasks[start:start+BATCH]
        t0 = time.time()
        with Pool(n_workers) as pool:
            res = pool.map(analyze, batch)
        elapsed = time.time() - t0
        for fname, is_sheet, reason in res:
            results[fname] = (is_sheet, reason)
        print(f"  Done {min(start+BATCH, len(all_tasks))}/{len(all_tasks)} ({elapsed:.1f}s)")

    from collections import Counter
    reasons = Counter(r for _, (i, r) in results.items())
    print(f"Reason distribution: {dict(reasons.most_common())}")

    n_with = sum(1 for s in songs if any(results.get(f, (False,''))[0] for f in (article_images.get(s['resource_id'], {}) or {}).values()))
    total_kept = sum(len([f for f in (article_images.get(s['resource_id'], {}) or {}).values() if results.get(f, (False,''))[0]]) for s in songs)
    print(f"Articles with sheet_images: {n_with} | Total kept: {total_kept}")

    new_songs = []
    for s in songs:
        rid = s['resource_id']
        imgs = article_images.get(rid, {})
        kept = sorted(f'/images/{fname}' for seq, fname in sorted(imgs.items()) if results.get(fname, (False,''))[0])
        new_entry = dict(s)
        new_entry['sheet_images'] = kept
        new_songs.append(new_entry)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(new_songs, f, ensure_ascii=False, indent=2)
    print(f"Saved: {output_file}")


if __name__ == "__main__":
    main()
