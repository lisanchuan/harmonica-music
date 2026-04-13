#!/usr/bin/env python3
"""
Bilibili 视频爬取 & 白熊音乐匹配脚本
策略：
1. 优先用 space API (wbi/arc/search)
2. 备选：搜索 API 分页获取 UP 主视频
3. 模糊匹配微信公众号标题与 B站视频标题
"""
from __future__ import annotations
import hashlib
import json
import os
import re
import time
import urllib.request
import urllib.parse
from typing import Optional

PROJECT_ROOT = "/Users/lisanchuan1/Documents/code/ai code/harmonica-music"
BILI_VIDEOS_FILE = os.path.join(PROJECT_ROOT, "data", "bilibili_videos.json")
WECHAT_SONGS_FILE = os.path.join(PROJECT_ROOT, "data", "wechat_songs.json")

MID = "71565747"
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# 标题清洗：去掉语气词/营销词，提取歌曲名
STRIP_PATTERNS = [
    r'^(全员BE！)',
    r'^(没想到吧[？！?]?)',
    r'^(被刷屏了！)',
    r'^(扎堆翻唱！)',
    r'^(离谱！)',
    r'^(太顶了！)',
    r'^(这[首个部]?)?太[好冷热新]?了',
    r'^(谁懂)',
    r'^(神仙友谊)',
    r'^(宝藏)',
    r'^(绝了)',
    r'^(太好听了)',
    r'^(被低估)',
    r'^(治愈)',
    r'^(天花板)',
    r'^(破防)',
    r'^(直呼)',
    r'^(痛了)',
    r'^(送琴)',
    r'^(合作)',
    r'^(太幸福)',
    r'^(毕业)',
    r'^(活动)',
    r'^(福利)',
    r'^(测评)',
    r'^(太好哭)',
    r'^(羊毛)',
    r'^(合集)',
    r'《[^》]+》',   # 保留书名号内的
    r'〈[^〉]+〉',   # 保留尖括号内的
    r'【[^】]+】',
    r'\s*[?!？！,，.。…～~]+$',
    r'^[?!？！,，.。…～~]+\s*',
]


def fetch_space_api(page: int = 1, ps: int = 30) -> tuple[list[dict], bool]:
    """调用 space API，返回 (视频列表, 是否成功)"""
    url = f"https://api.bilibili.com/x/space/arc/search?mid={MID}&pn={page}&ps={ps}&order=pubdate"
    req = urllib.request.Request(url, headers={
        "User-Agent": USER_AGENT,
        "Referer": f"https://space.bilibili.com/{MID}/video",
        "Accept-Language": "zh-CN,zh;q=0.9",
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
        if data.get("code") == 0:
            vlist = data.get("data", {}).get("list", {}).get("vlist", [])
            return vlist, True
        else:
            return [], False
    except Exception as e:
        print(f"  [fetch_space] Error page {page}: {e}")
        return [], False


def fetch_search_api(keyword: str, page: int = 1, page_size: int = 20) -> list[dict]:
    """通过搜索 API 查找 UP 主视频"""
    videos = []
    query = urllib.parse.quote(keyword)
    url = f"https://api.bilibili.com/x/web-interface/search/all/v2?keyword={query}&page={page}&page_size={page_size}"
    req = urllib.request.Request(url, headers={
        "User-Agent": USER_AGENT,
        "Referer": "https://www.bilibili.com",
        "Accept-Language": "zh-CN,zh;q=0.9",
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
        if data.get("code") == 0:
            results = data.get("data", {}).get("result", [])
            for r in results:
                if r.get("data_type") == "video":
                    for item in r.get("data", []):
                        title_raw = re.sub(r'<[^>]+>', '', item.get("title", ""))
                        videos.append({
                            "bvid": item.get("bvid", ""),
                            "title": title_raw,
                            "author": item.get("author", ""),
                        })
        return videos
    except Exception as e:
        print(f"  [fetch_search] Error: {e}")
        return []


def fetch_user_videos_from_search(max_pages: int = 10) -> list[dict]:
    """从搜索 API 获取该 UP 主的所有视频（通过关键词组合分页）"""
    all_videos = []
    seen = set()

    # 用多种关键词组合分批获取
    keywords = [
        "白熊音乐Ukulele 弹唱",
        "白熊音乐Ukulele 教学",
        "白熊音乐Ukulele 尤克里里",
        "白熊音乐Ukulele 吉他",
        "白熊音乐Ukulele 曲谱",
        "白熊音乐Ukulele 翻唱",
    ]

    for kw in keywords:
        for page in range(1, max_pages + 1):
            videos = fetch_search_api(kw, page=page)
            if not videos:
                break
            new_count = 0
            for v in videos:
                if v["bvid"] and v["bvid"] not in seen:
                    seen.add(v["bvid"])
                    all_videos.append(v)
                    new_count += 1
            print(f"  Keyword '{kw}' page {page}: {len(videos)} videos, {new_count} new")
            time.sleep(1)
            if new_count == 0:
                break

    return all_videos


def fetch_bilibili_videos(force: bool = False) -> list[dict]:
    """主函数：获取所有 B站视频"""
    if os.path.exists(BILI_VIDEOS_FILE) and not force:
        with open(BILI_VIDEOS_FILE) as f:
            return json.load(f)

    all_videos = []

    # 策略1: space API (优先)
    print("=== Strategy 1: Space API ===")
    for page in range(1, 20):
        vlist, ok = fetch_space_api(page=page)
        if not ok:
            print(f"  Page {page}: rate-limited or error, retry after 5s...")
            time.sleep(5)
            vlist, ok = fetch_space_api(page=page)
            if not ok:
                break
        if not vlist:
            break
        for v in vlist:
            all_videos.append({"bvid": v["bvid"], "title": v["title"], "pubdate": v.get("pubdate", 0)})
        print(f"  Page {page}: {len(vlist)} videos, total={len(all_videos)}")
        time.sleep(2)

    if len(all_videos) > 50:
        print(f"✅ Space API fetched {len(all_videos)} videos")
        return save_videos(all_videos)

    # 策略2: 搜索 API
    print(f"\n=== Strategy 2: Search API (space got {len(all_videos)}) ===")
    search_videos = fetch_user_videos_from_search(max_pages=5)
    seen_bvid = {v["bvid"] for v in all_videos}
    for v in search_videos:
        if v["bvid"] and v["bvid"] not in seen_bvid:
            all_videos.append(v)
            seen_bvid.add(v["bvid"])

    print(f"✅ Total videos: {len(all_videos)}")
    return save_videos(all_videos)


def save_videos(videos: list[dict]) -> list[dict]:
    os.makedirs(os.path.dirname(BILI_VIDEOS_FILE), exist_ok=True)
    with open(BILI_VIDEOS_FILE, "w") as f:
        json.dump(videos, f, ensure_ascii=False, indent=2)
    print(f"💾 Saved {len(videos)} videos to {BILI_VIDEOS_FILE}")
    return videos


def extract_song_name(title: str) -> str:
    """从微信公众号标题中提取歌曲名"""
    t = title.strip()

    # 去掉开头的语气词
    strip_prefixes = [
        "扎堆翻唱！", "被刷屏了！", "离谱！", "太顶了！", "没想到，",
        "没想到吧", "太好哭了", "神仙友谊", "太好听了",
        "宝藏", "绝了", "谁懂", "被低估", "太幸福",
        "治愈", "天花板", "破防", "直呼", "痛了",
        "毕业", "合作", "活动", "福利", "测评", "羊毛",
        "全员BE！", "合集",
    ]
    for p in strip_prefixes:
        if t.startswith(p):
            t = t[len(p):]

    # 去掉结尾的语气词/标点
    t = re.sub(r'[?!？！,，.。…～~]+$', '', t).strip()
    t = re.sub(r'^[?!？！,，.。…～~]+', '', t).strip()

    # 提取书名号/尖括号内的歌曲名
    song_in_brackets = re.findall(r'《([^》]+)》', title)
    song_in_angle = re.findall(r'〈([^〉]+)〉', title)

    if song_in_brackets:
        return song_in_brackets[0].strip()
    if song_in_angle:
        return song_in_angle[0].strip()

    # 去掉"歌"字前的描述
    # 例如："周杰伦新专辑最大的黑马居然是这首！" → "周杰伦新专辑最大的黑马居然是这首"
    t = re.sub(r'^(周杰伦|林俊杰|蔡依林|[^\s]{2,4}?)新专辑最大的黑马居然是', r'\1', t)

    return t


def normalize_for_match(s: str) -> str:
    """标准化字符串用于匹配"""
    s = s.lower()
    # 全角转半角
    s = s.replace('（', '(').replace('）', ')').replace('【', '[').replace('】', ']')
    s = re.sub(r'[^\w\u4e00-\u9fff()（）【】\[\]]+', ' ', s)
    # 去掉括号内容（用于更宽松匹配）
    s = re.sub(r'[（(][^）)]*[)）]', ' ', s)
    return s.strip()


def match_score(song_name: str, bili_title: str) -> float:
    """计算歌曲名与B站标题的匹配得分 (0-1)"""
    song_n = normalize_for_match(song_name)
    bili_n = normalize_for_match(bili_title)

    if not song_n or not bili_n:
        return 0.0

    # 完全包含
    if song_n in bili_n or bili_n in song_n:
        return 1.0

    # 分词匹配
    song_words = set(song_n.split())
    bili_words = set(bili_n.split())

    if not song_words:
        return 0.0

    # 计算 Jaccard 相似度
    intersection = song_words & bili_words
    union = song_words | bili_words
    jaccard = len(intersection) / len(union) if union else 0

    # 额外奖励：两个词以上完全匹配
    word_bonus = sum(1 for w in song_words if w in bili_n) / len(song_words)

    return max(jaccard, word_bonus * 0.8)


def match_bilibili_video(song_title: str, bili_videos: list[dict], threshold: float = 0.4) -> Optional[str]:
    """从 B站视频列表中匹配最佳视频，返回 bvid 或 None"""
    if not bili_videos:
        return None

    song_name = extract_song_name(song_title)
    if not song_name or len(song_name) < 2:
        return None

    best_bvid = None
    best_score = threshold

    for v in bili_videos:
        score = match_score(song_name, v["title"])
        if score > best_score:
            best_score = score
            best_bvid = v["bvid"]

    return best_bvid


def embed_bilibili_iframe(bvid: str) -> str:
    """生成 B站视频 iframe HTML"""
    return (
        f'<iframe src="https://player.bilibili.com/player.html?bvid={bvid}" '
        f'width="100%" height="500" scrolling="no" frameborder="0" '
        f'allowfullscreen="true"></iframe>'
    )


def test_match() -> dict:
    """测试匹配效果：读取前5条 wechat_songs.json"""
    bili_videos = fetch_bilibili_videos(force=False)
    with open(WECHAT_SONGS_FILE) as f:
        songs = json.load(f)

    test_songs = songs[:5]
    results = []

    for song in test_songs:
        title = song["title"]
        song_name = extract_song_name(title)
        bvid = match_bilibili_video(title, bili_videos)
        results.append({
            "original_title": title,
            "extracted_song": song_name,
            "matched_bvid": bvid,
            "matched": bvid is not None,
        })

    return {
        "total_bili_videos": len(bili_videos),
        "test_results": results,
        "match_count": sum(1 for r in results if r["matched"]),
    }


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--fetch", action="store_true", help="强制重新爬取B站视频")
    parser.add_argument("--test", action="store_true", help="测试匹配效果")
    args = parser.parse_args()

    if args.fetch or args.test:
        bili_videos = fetch_bilibili_videos(force=args.fetch)
        print(f"\n爬取到 {len(bili_videos)} 条 B站视频")

    if args.test:
        result = test_match()
        print(f"\n=== 匹配测试结果 ===")
        print(f"B站视频总数: {result['total_bili_videos']}")
        print(f"匹配成功率: {result['match_count']}/5")
        for r in result["test_results"]:
            iframe_preview = embed_bilibili_iframe(r["matched_bvid"])[:80] + "..." if r["matched_bvid"] else "❌ 未匹配"
            print(f"\n  原始标题: {r['original_title']}")
            print(f"  提取歌曲: {r['extracted_song']}")
            print(f"  匹配结果: {'✅ ' + r['matched_bvid'] if r['matched'] else '❌ 未匹配'}")
