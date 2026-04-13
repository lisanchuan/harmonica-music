#!/usr/bin/env python3
"""
filter_sheet_images.py
用 BeautifulSoup 解析微信公众号文章 HTML，按 DOM 结构识别真正的乐谱图。

从 localhost:8001 获取原始 HTML（含完整结构），
过滤结果映射回本地文件名（wechat_songs.json 中的格式）。
"""

import json
import re
import sys
import urllib.request
from pathlib import Path
from typing import Optional, Dict, Set, Tuple

venv_site = Path("/Users/lisanchuan1/.pyenv/harmonica/lib/python3.14/site-packages")
sys.path.insert(0, str(venv_site))

from bs4 import BeautifulSoup, NavigableString

# ---------------------------------------------------------------
# 核心配置
# ---------------------------------------------------------------

AD_LABEL_PATTERNS = [
    r"曲谱大合集",
    r"戳图直达",
    r"更多\S{0,20}歌单",
    r"往期热门内容",
    r"点击图片直达",
    r"扫码",
    r"二维码",
]


# ---------------------------------------------------------------
# 工具函数
# ---------------------------------------------------------------

def _fetch_original_html(biz_mid: str, timeout: int = 10) -> Optional[str]:
    """
    从本地预览服务器获取原始 HTML。
    biz_mid 格式: "3273006200-2649342222_1"（从本地文件名提取）
    """
    url = f"http://localhost:8001/views/article/{biz_mid}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"    [WARN] 获取原始HTML失败: {e}")
        return None


def _biz_mid_from_content(content: str) -> Optional[str]:
    """
    从 content 中提取 biz_mid（从本地 img src 路径提取）。
    例如: /images/wb_3273006200-2649342222_1_001.jpg -> "3273006200-2649342222_1"
    """
    m = re.search(r'/images/wb_(\d+-\d+_\d+)_', content)
    if m:
        return m.group(1)
    return None


def _parse_local_index(src: str) -> Optional[int]:
    """
    从本地文件 src 提取序号。
    例如: /images/wb_3273006200-2649342222_1_005.jpg -> 5
    """
    m = re.search(r'_(\d+)\.jpg$', src)
    if m:
        return int(m.group(1))
    return None


def _map_data_index_to_local(html: str, biz_mid: str) -> Dict[int, str]:
    """
    解析原始 HTML，建立 data-index → 本地文件名 的映射。
    data-index=N (0-based) -> local file index = N+1
    """
    soup = BeautifulSoup(html, "lxml")
    mapping: Dict[int, str] = {}
    for img in soup.find_all("img"):
        data_idx = img.get("data-index")
        if data_idx is None:
            continue
        try:
            idx = int(data_idx)
        except ValueError:
            continue
        src = (img.get("src") or img.get("data-src") or "").strip()
        if not src:
            continue
        # 原始 src 可能是微信 CDN URL，提取文件名
        fname = src.split("/")[-1]
        if not fname:
            continue
        # 本地文件名格式已知，直接构造
        local_fname = f"wb_{biz_mid}_{idx+1:03d}.jpg"
        mapping[idx] = local_fname
    return mapping


def _in_anchor_tag(img) -> bool:
    parent = img.parent
    while parent:
        if parent.name == "a":
            return True
        parent = parent.parent
    return False


def _get_text_before_img(img, window: int = 1000) -> str:
    parts = []
    for sib in img.previous_siblings:
        if len("".join(parts)) >= window:
            break
        if isinstance(sib, NavigableString):
            parts.append(str(sib))
        elif hasattr(sib, "get_text"):
            parts.append(sib.get_text())
    return "".join(parts)


def _get_ancestor_block(el):
    block = el.parent
    while block and block.name not in ("section", "p", "div", "article"):
        block = block.parent
    return block


# ---------------------------------------------------------------
# 核心过滤
# ---------------------------------------------------------------

def parse_sheet_images_from_original_html(html: str, biz_mid: str) -> Set[str]:
    """
    微信公众号曲谱的结构特征：
    <section data-id="33">
      <section>...<p>...<span leaf>谱</span>...</p>...</section>
      <section><section><img src="..."></section></section>
    </section>

    核心策略：只保留 data-id="33" 的 <section> 块内的图片。
    """
    soup = BeautifulSoup(html, "lxml")
    idx_to_local = _map_data_index_to_local(html, biz_mid)
    kept_local: Set[str] = set()

    # 策略A（最准）：只保留 <section data-id="33"> 块内的图片
    for section33 in soup.find_all("section", {"data-id": "33"}):
        for img in section33.find_all("img"):
            if _in_anchor_tag(img):
                continue
            before_text = _get_text_before_img(img)
            if any(re.search(pat, before_text) for pat in AD_LABEL_PATTERNS):
                continue
            data_idx = img.get("data-index")
            if data_idx is not None:
                try:
                    idx = int(data_idx)
                    if idx in idx_to_local:
                        kept_local.add(idx_to_local[idx])
                except ValueError:
                    pass

    # 策略B（备选）：含"谱"字标签的 section/p 块内的图片
    if not kept_local:
        for text_node in soup.find_all(string=re.compile(r"谱")):
            if not isinstance(text_node, NavigableString):
                continue
            parent = text_node.parent
            if not parent:
                continue
            block = _get_ancestor_block(parent)
            if not block:
                continue
            for img in block.find_all("img"):
                if _in_anchor_tag(img):
                    continue
                before_text = _get_text_before_img(img)
                if any(re.search(pat, before_text) for pat in AD_LABEL_PATTERNS):
                    continue
                data_idx = img.get("data-index")
                if data_idx is not None:
                    try:
                        idx = int(data_idx)
                        if idx in idx_to_local:
                            kept_local.add(idx_to_local[idx])
                    except ValueError:
                        pass

    return kept_local


def parse_sheet_images_from_simplified_html(content: str, biz_mid: str) -> Set[str]:
    """
    对简化版 HTML：用文件名序号来猜哪些可能是乐谱图。
    启发式：序号 3~20 的图片更有可能是乐谱（避开封面/广告）。
    """
    soup = BeautifulSoup(content, "lxml")
    kept: Set[str] = set()
    for img in soup.find_all("img"):
        src = (img.get("src") or "").strip()
        seq = _parse_local_index(src)
        if seq and 3 <= seq <= 20:
            kept.add(src.split("/")[-1])
    return kept


# ---------------------------------------------------------------
# 主脚本
# ---------------------------------------------------------------

def _load_bilibili_map() -> Dict[str, str]:
    base_dir = Path(__file__).parent.parent
    bv_path = base_dir / "data" / "bilibili_videos.json"
    if not bv_path.exists():
        return {}
    with open(bv_path, "r", encoding="utf-8") as f:
        videos = json.load(f)

    def extract_song_name(title: str) -> str:
        m = re.search(r'[〈《]([^〉》]+)[〉》]', title)
        if m:
            return m.group(1).strip()
        return title[:30].strip()

    title_map: Dict[str, str] = {}
    for v in videos:
        sn = extract_song_name(v.get("title", ""))
        if sn and v.get("bvid"):
            title_map[sn] = v["bvid"]
    return title_map


def _match_bvid(song_title: str, bilibili_map: Dict[str, str]) -> Optional[str]:
    m = re.search(r'[〈《]([^〉》]+)[〉》]', song_title)
    if m:
        sn = m.group(1).strip()
        if sn in bilibili_map:
            return bilibili_map[sn]
    for part in reversed(re.split(r'[！？。,，]', song_title)):
        part = part.strip()
        if len(part) >= 4 and part in bilibili_map:
            return bilibili_map[part]
    return None


def main():
    base_dir = Path(__file__).parent.parent
    input_path = base_dir / "data" / "wechat_songs.json"
    output_path = base_dir / "data" / "wechat_songs_clean.json"

    with open(input_path, "r", encoding="utf-8") as f:
        songs = json.load(f)

    bilibili_map = _load_bilibili_map()
    print(f"Loaded {len(songs)} songs | {len(bilibili_map)} bilibili entries")
    print()

    # ---- 前3条测试 ----
    print("=" * 60)
    print("【前3条过滤测试】")
    print("=" * 60)

    for i in range(min(3, len(songs))):
        entry = songs[i]
        content = entry.get("content", "") or ""
        biz_mid = _biz_mid_from_content(content)

        print(f"\n[{i}] {entry.get('title', '')[:40]}")
        print(f"    biz_mid: {biz_mid}")

        orig_html = None
        if biz_mid:
            orig_html = _fetch_original_html(biz_mid)

        if orig_html:
            from bs4 import BeautifulSoup as BS
            soup = BS(orig_html, "lxml")
            total = len(soup.find_all("img"))
            kept_srcs = parse_sheet_images_from_original_html(orig_html, biz_mid)
            print(f"    原始HTML图片: {total}  过滤后: {len(kept_srcs)}")
            for src in sorted(kept_srcs):
                print(f"    ✓ {src}")
        else:
            kept_srcs = parse_sheet_images_from_simplified_html(content, biz_mid or "")
            from bs4 import BeautifulSoup as BS
            soup = BS(content, "lxml")
            total = len(soup.find_all("img"))
            print(f"    (用简化HTML) 过滤前: {total}  过滤后: {len(kept_srcs)}")
            for src in sorted(kept_srcs):
                print(f"    ✓ {src}")

    # ---- 全文处理 ----
    print()
    print("=" * 60)
    print("【全文处理 → wechat_songs_clean.json】")
    print("=" * 60)

    new_songs = []
    total_before = 0
    total_after = 0
    fetch_ok = 0
    fetch_fail = 0

    for i, entry in enumerate(songs):
        content = entry.get("content", "") or ""
        biz_mid = _biz_mid_from_content(content)

        orig_html = None
        if biz_mid:
            orig_html = _fetch_original_html(biz_mid)

        if orig_html:
            soup_orig = BeautifulSoup(orig_html, "lxml")
            total = len(soup_orig.find_all("img"))
            kept_srcs = parse_sheet_images_from_original_html(orig_html, biz_mid)
            # 转换为本地文件路径 /images/wb_xxx_NNN.jpg
            sheet_images = [f"/images/{s}" for s in sorted(kept_srcs)]
            # 保持简化 HTML，只删不在 sheet_images 里的图片
            soup_c = BeautifulSoup(content, "lxml")
            for img in soup_c.find_all("img"):
                src = (img.get("src") or "").strip()
                if src not in sheet_images:
                    img.decompose()
            cleaned_content = str(soup_c)
            fetch_ok += 1
        else:
            soup_c = BeautifulSoup(content, "lxml")
            total = len(soup_c.find_all("img"))
            kept_srcs = parse_sheet_images_from_simplified_html(content, biz_mid or "")
            sheet_images = [f"/images/{s}" for s in sorted(kept_srcs)]
            # 从 content 中删除不在 sheet_images 里的图片
            if sheet_images:
                for img in soup_c.find_all("img"):
                    src = (img.get("src") or "").strip()
                    if src not in sheet_images:
                        img.decompose()
                cleaned_content = str(soup_c)
            else:
                cleaned_content = content
            fetch_fail += 1

        bilibili_bvid = _match_bvid(entry.get("title", ""), bilibili_map)

        new_entry = dict(entry)
        new_entry["content"] = cleaned_content
        new_entry["sheet_images"] = sheet_images
        if bilibili_bvid:
            new_entry["bilibili_bvid"] = bilibili_bvid
        new_songs.append(new_entry)

        total_before += total
        total_after += len(kept_srcs)

        label = ""
        if i < 3:
            label = "◀ 前3条"
        elif i >= len(songs) - 2:
            label = "▶ 后2条"
        print(f"  [{i:3d}] {entry.get('title', '')[:28]:28s} | {total:3d} → {len(kept_srcs):3d}  {label}")

    print(f"\n原始HTML获取: 成功 {fetch_ok} / 失败 {fetch_fail}")
    print(f"总计：过滤前 {total_before} 张 → {total_after} 张 "
          f"({100*(total_before-total_after)/max(total_before,1):.1f}% 被过滤)")

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(new_songs, f, ensure_ascii=False, indent=2)
    print(f"已保存: {output_path}")


if __name__ == "__main__":
    main()
