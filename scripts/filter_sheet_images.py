#!/usr/bin/env python3
"""
filter_sheet_images.py — 重写版
用 BeautifulSoup 解析微信公众号文章 HTML，按 DOM 结构识别真正的乐谱图。

乐谱图的核心识别特征：
1. 位于包含"谱"字的 section 块内部
2. 图片不在 <a> 标签内（不是可点击的广告图）
3. 不含广告特征词（"戳图直达""扫码""往期热门""曲谱大合集"等）

数据来源：
- 原始 HTML（含完整 DOM 和 data-index）: http://localhost:8001/views/article/{biz_mid}
- 简化 content（含本地 img src 路径）: wechat_songs.json 中的 content 字段
"""

import json
import re
import sys
import urllib.request
from pathlib import Path
from typing import Optional, Dict, Set

venv_site = Path("/Users/lisanchuan1/.pyenv/harmonica/lib/python3.14/site-packages")
sys.path.insert(0, str(venv_site))

from bs4 import BeautifulSoup, NavigableString

# ---------------------------------------------------------------
# 广告特征词
# ---------------------------------------------------------------

AD_LABEL_PATTERNS = [
    r"曲谱大合集",
    r"戳图直达",
    r"更多\S{0,20}歌单",
    r"往期热门内容",
    r"点击图片直达",
    r"扫码",
    r"二维码",
    r"微信小店",
    r"购琴点击直达",
]


# ---------------------------------------------------------------
# 工具函数
# ---------------------------------------------------------------

def _fetch_original_html(biz_mid: str, timeout: int = 10) -> Optional[str]:
    """从本地预览服务器获取原始 HTML（含完整 DOM）。"""
    url = f"http://localhost:8001/views/article/{biz_mid}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"    [WARN] 获取原始HTML失败: {e}")
        return None


def _biz_mid_from_content(content: str) -> Optional[str]:
    """从 content 中的 img src 路径提取 biz_mid。"""
    m = re.search(r'/images/wb_(\d+-\d+_\d+)_', content)
    if m:
        return m.group(1)
    return None


def _parse_local_index(src: str) -> Optional[int]:
    """从本地文件 src 提取序号，例如 _005.jpg -> 5。"""
    m = re.search(r'_(\d+)\.jpg$', src)
    if m:
        return int(m.group(1))
    return None


def _in_anchor_tag(img) -> bool:
    """检查图片是否在 <a> 标签内（可点击的广告图）。"""
    for parent in img.parents:
        if parent.name == "a":
            return True
    return False


def _has_ad_pattern(text: str) -> bool:
    """检查文本是否含广告特征词。"""
    return any(re.search(pat, text) for pat in AD_LABEL_PATTERNS)


def _get_text_before_img(img, window: int = 500) -> str:
    """获取图片前面的文本（向上遍历 siblings）。"""
    parts = []
    for sib in img.previous_siblings:
        if sum(len("".join(parts)) for _ in [1]) >= window:
            break
        if isinstance(sib, NavigableString):
            t = str(sib).strip()
            if t:
                parts.append(t)
        elif hasattr(sib, "get_text"):
            t = sib.get_text().strip()
            if t:
                parts.append(t)
    return "".join(parts)


def _build_data_index_to_local(html: str, biz_mid: str) -> Dict[int, str]:
    """
    解析原始 HTML，建立 data-index → 本地文件名 的映射。
    data-index=N (0-based) -> local file index = N+1
    返回格式: {2: "wb_bizmid_003.jpg", ...}
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
        local_fname = f"wb_{biz_mid}_{idx+1:03d}.jpg"
        mapping[idx] = local_fname
    return mapping


# ---------------------------------------------------------------
# 核心过滤逻辑
# ---------------------------------------------------------------

def parse_sheet_images_from_original_html(html: str, biz_mid: str) -> Set[str]:
    """
    从原始 HTML 识别真正的乐谱图。

    微信公众号乐谱的标准 DOM 结构：
    <section[data-id=33]>              ← 乐谱区块（可能有多个）
      <p>1<span>尤克里里弹唱</span><span>谱</span></p>
      <section><img data-index=N></section>   ← 乐谱图在子 section 里
      <p>2<span>吉他弹唱</span><span>谱</span></p>
      <section><img data-index=N></section>

    "谱"字通常嵌在 <span> 里，不是 section 的直接文本。
    因此：找到含"谱"字的 section[data-id=33]，收集其父节点下所有
    sibling section[data-id=33] 里的图片。
    """
    soup = BeautifulSoup(html, "lxml")
    idx_to_local = _build_data_index_to_local(html, biz_mid)
    kept: Set[str] = set()

    # ---- 策略 1：含"谱"字的 section[data-id=33] 及其同组 sibling ----
    # Step A：找到所有含"谱"（且在 <p>/<span> 内）的 section[data-id=33]
    pu_parents: list = []
    seen_parents: Set = set()
    for el in soup.find_all(string=re.compile(r"谱")):
        if not isinstance(el, NavigableString):
            continue
        # "谱" 在 <span> 或 <p> 内，向上找最近的 section
        block = el.parent
        while block and block.name != "section":
            block = block.parent
        if not block or block.get("data-id") != "33":
            continue
        # 找到 section[data-id=33]，用其父 section 作为收集桶
        if block.parent and block.parent.name == "section":
            parent_sec = block.parent
            if parent_sec not in seen_parents:
                seen_parents.add(parent_sec)
                pu_parents.append(parent_sec)

    # Step B：对于每个 pu_parent，收集其下所有 section[data-id=33] 的图片
    for parent_sec in pu_parents:
        for sec in parent_sec.find_all("section", {"data-id": "33"}):
            for img in sec.find_all("img"):
                if _in_anchor_tag(img):
                    continue
                before_text = _get_text_before_img(img)
                if _has_ad_pattern(before_text):
                    continue
                data_idx = img.get("data-index")
                if data_idx is not None:
                    try:
                        idx = int(data_idx)
                        if idx in idx_to_local:
                            kept.add(idx_to_local[idx])
                    except ValueError:
                        pass

    # ---- 策略 2：直接用 data-index 映射（备选）----
    # 如果策略1没找到，用所有不在<a>内且无广告特征的图片
    if not kept and idx_to_local:
        for img in soup.find_all("img"):
            if _in_anchor_tag(img):
                continue
            before_text = _get_text_before_img(img)
            if _has_ad_pattern(before_text):
                continue
            data_idx = img.get("data-index")
            if data_idx is not None:
                try:
                    idx = int(data_idx)
                    if idx in idx_to_local:
                        kept.add(idx_to_local[idx])
                except ValueError:
                    pass

    return kept


def parse_sheet_images_from_simplified_html(content: str, biz_mid: str) -> Set[str]:
    """
    对简化版 HTML：用文件名序号启发式。
    规则：序号在 4~20 之间的图片更可能是乐谱（避开封面和广告）。
    """
    soup = BeautifulSoup(content, "lxml")
    kept: Set[str] = set()
    for img in soup.find_all("img"):
        src = (img.get("src") or "").strip()
        seq = _parse_local_index(src)
        if seq and 4 <= seq <= 20:
            kept.add(src.split("/")[-1])
    return kept


# ---------------------------------------------------------------
# 主脚本
# ---------------------------------------------------------------

def _normalize_for_match(s: str) -> str:
    """标准化字符串用于模糊匹配。"""
    s = s.lower()
    s = s.replace("（", "(").replace("）", ")").replace("【", "[").replace("】", "]")
    s = re.sub(r"[^\w\u4e00-\u9fff()（）【\]\[\]]+", " ", s)
    s = re.sub(r"[（(][^）)]*[)）]", " ", s)
    return s.strip()


def _extract_song_names(content: str) -> list[str]:
    """从文章 content 中提取所有歌名（去重）。"""
    brackets = re.findall(r"[《〈]([^》〉]{2,20})[》〉]", content)
    seen = set()
    result = []
    for b in brackets:
        b = b.strip()
        if b and len(b) > 1 and b not in seen:
            seen.add(b)
            result.append(b)
    return result


def _load_bilibili_data() -> tuple[list[dict], dict]:
    """加载 bilibili 视频列表和标题映射。"""
    base_dir = Path(__file__).parent.parent
    bv_path = base_dir / "data" / "bilibili_videos.json"
    if not bv_path.exists():
        return [], {}
    with open(bv_path, "r", encoding="utf-8") as f:
        videos = json.load(f)

    def extract_song_name(title: str) -> str:
        m = re.search(r"[〈《]([^〉》]+)[〉》]", title)
        if m:
            return m.group(1).strip()
        return title[:30].strip()

    title_map: Dict[str, str] = {}
    for v in videos:
        sn = extract_song_name(v.get("title", ""))
        if sn and v.get("bvid"):
            title_map[sn] = v["bvid"]
    return videos, title_map


def _match_score(song_name: str, bili_title: str) -> float:
    """计算歌曲名与B站标题的匹配得分 (0-1)。"""
    song_n = _normalize_for_match(song_name)
    bili_n = _normalize_for_match(bili_title)
    if not song_n or not bili_n:
        return 0.0
    if song_n in bili_n or bili_n in song_n:
        return 1.0
    song_words = set(song_n.split())
    bili_words = set(bili_n.split())
    if not song_words:
        return 0.0
    intersection = song_words & bili_words
    union = song_words | bili_words
    jaccard = len(intersection) / len(union) if union else 0
    word_bonus = sum(1 for w in song_words if w in bili_n) / len(song_words)
    return max(jaccard, word_bonus * 0.8)


def _match_bvid(
    article_title: str, content: str, bili_videos: list[dict], threshold: float = 0.35
) -> tuple[Optional[str], Optional[str]]:
    """
    用公众号文章标题 + content 中的歌名 匹配 B站视频。
    """
    if not bili_videos:
        return None, None

    best_bvid, best_title, best_score = None, None, threshold

    song_names = _extract_song_names(content)
    if song_names:
        for sn in song_names:
            for v in bili_videos:
                score = _match_score(sn, v["title"])
                if score > best_score:
                    best_score = score
                    best_bvid = v["bvid"]
                    best_title = v["title"]
            if best_bvid:
                break

    if not best_bvid:
        for v in bili_videos:
            score = _match_score(article_title, v["title"])
            if score > best_score:
                best_score = score
                best_bvid = v["bvid"]
                best_title = v["title"]

    return best_bvid, best_title


def main():
    base_dir = Path(__file__).parent.parent
    input_path = base_dir / "data" / "wechat_songs.json"
    output_path = base_dir / "data" / "wechat_songs.json"  # 覆盖原文件

    with open(input_path, "r", encoding="utf-8") as f:
        songs = json.load(f)

    bili_videos, bilibili_map = _load_bilibili_data()
    print(f"Loaded {len(songs)} songs | {len(bilibili_map)} bilibili entries")
    print()

    # ---- 全文处理 ----
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
            sheet_images = [f"/images/{s}" for s in sorted(kept_srcs)]
            fetch_ok += 1
        else:
            soup_c = BeautifulSoup(content, "lxml")
            total = len(soup_c.find_all("img"))
            kept_srcs = parse_sheet_images_from_simplified_html(content, biz_mid or "")
            sheet_images = [f"/images/{s}" for s in sorted(kept_srcs)]
            fetch_fail += 1

        bilibili_bvid, matched_title = _match_bvid(
            entry.get("title", ""), content, bili_videos
        )

        new_entry = dict(entry)
        new_entry["content"] = content
        new_entry["sheet_images"] = sheet_images
        if bilibili_bvid:
            new_entry["bilibili_bvid"] = bilibili_bvid
            new_entry["_bilibili_matched_title"] = matched_title
        new_songs.append(new_entry)

        total_before += total
        total_after += len(kept_srcs)

        label = ""
        if i < 3:
            label = "◀ 前3条"
        elif i >= len(songs) - 2:
            label = "▶ 后2条"
        print(
            f"  [{i:3d}] {entry.get('title', ''):28s} | "
            f"{total:3d} imgs → {len(kept_srcs):3d} sheets {label}"
        )

    print()
    print("=" * 60)
    print(f"原始HTML获取: 成功 {fetch_ok} / 失败 {fetch_fail}")
    print(
        f"总计：过滤前 {total_before} 张 → {total_after} 张 "
        f"({100*(total_before-total_after)/max(total_before,1):.1f}% 被过滤)"
    )

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(new_songs, f, ensure_ascii=False, indent=2)
    print(f"已保存: {output_path}")


if __name__ == "__main__":
    main()
