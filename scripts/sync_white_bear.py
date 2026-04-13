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

# Bilibili 配置
BILI_MID = "71565747"
BILI_VIDEOS_FILE = os.path.join(HARMONICA_ROOT, "data", "bilibili_videos.json")

# Bug 1 fix: 动态判断乐器类型，不再写死
GUITAR_KEYWORDS = ["吉他弹唱", "Guitar", "guitar", "吉他", "弹唱"]
UKULELE_KEYWORDS = ["尤克里里", "Ukulele", "ukulele", "尤克", "小U"]

def detect_instrument(title: str = "", description: str = "") -> str:
    text = (title + " " + description).lower()
    has_guitar = any(kw.lower() in text for kw in GUITAR_KEYWORDS)
    has_ukulele = any(kw.lower() in text for kw in UKULELE_KEYWORDS)
    # 都匹配到优先吉他
    if has_guitar or has_ukulele:
        return "guitar" if has_guitar else "ukulele"
    return "ukulele"  # 默认

INSTRUMENT = detect_instrument()  # 保持全局默认值用于类型标注

# Plan A: 严格只保留弹唱教学/曲谱类文章
# 跳过：娱乐/合作/活动类文章
ENTertainment_KEYWORDS = [
    "合作", "太好哭", "神仙友谊", "毕业", "太幸福", "刷屏",
    "宝藏", "绝了", "太好听了", "谁懂", "被低估", "发行",
    "治愈", "天花板", "破防", "直呼", "痛了", "送琴",
    "活动", "福利", "打卡", "羊毛", "测评",
]

TEACHING_KEYWORDS = [
    "弹唱", "教学", "入门", "指弹", "泛音", "基本功", "干货",
]
PURE_SONG_KEYWORDS = ["曲谱", "大合辑"]
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
REFERER = "https://mp.weixin.qq.com/"


def parse_timestamp(ts: int) -> str:
    if not ts:
        return ""
    return datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M")


def check_container_running() -> bool:
    """Bug 2 fix: 检查 we-mp-rss 容器是否在运行"""
    try:
        result = subprocess.run(
            ["docker", "ps", "--filter", f"name={CONTAINER_NAME}", "--format", "{{.Names}}"],
            capture_output=True, text=True, timeout=10
        )
        return CONTAINER_NAME in result.stdout
    except Exception:
        return False


def copy_from_container() -> bool:
    # Bug 2 fix: 先检查容器状态，阻止静默空跑
    if not check_container_running():
        print(f"Error: Container '{CONTAINER_NAME}' is not running. Cannot sync.")
        raise RuntimeError(f"Container '{CONTAINER_NAME}' is not running")

    os.makedirs(LOCAL_CACHE, exist_ok=True)
    try:
        subprocess.run(["docker", "cp", f"{CONTAINER_NAME}:{DB_IN_CONTAINER}", LOCAL_DB],
            check=True, capture_output=True, timeout=30)
        subprocess.run(["docker", "cp", f"{CONTAINER_NAME}:{CACHE_IN_CONTAINER}/.", LOCAL_CACHE],
            check=True, capture_output=True, timeout=60)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error: docker cp failed: {e.stderr.decode() if e.stderr else e}")
        raise
    except Exception as e:
        print(f"Error: copy_from_container failed: {e}")
        raise


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

    # 内容：优先用 DB 的 content_html（懒加载实际存储在这里），cache 不可靠
    raw_html = g('content_html') or get_content_from_cache(article_id) or g('content') or ""
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
        "instrument": detect_instrument(g('title', ''), g('description', '')),
        "style": ["pop"],
    }


def is_sheet_music_article(title: str, description: str = "") -> bool:
    """Plan A: 判断是否是弹唱教学/曲谱类文章"""
    text = title + " " + description
    # 有教学/曲谱关键词 → 保留
    if any(kw in text for kw in TEACHING_KEYWORDS + PURE_SONG_KEYWORDS):
        return True
    # 有娱乐关键词 → 跳过
    if any(kw in text for kw in ENTertainment_KEYWORDS):
        return False
    # 无关键词的文章保守跳过（避免混进娱乐内容）
    return False


# ─────────────────────────────────────────────
# Bilibili 视频匹配
# ─────────────────────────────────────────────

def normalize_for_match(s: str) -> str:
    """标准化字符串用于模糊匹配"""
    s = s.lower()
    s = s.replace('（', '(').replace('）', ')').replace('【', '[').replace('】', ']')
    s = re.sub(r'[^\w\u4e00-\u9fff()（）【】\[\]]+', ' ', s)
    s = re.sub(r'[（(][^）)]*[)）]', ' ', s)
    return s.strip()


def extract_song_names_from_content(content: str) -> list[str]:
    """从文章 content 中提取所有歌名（去重）"""
    brackets = re.findall(r'[《〈]([^》〉]{2,20})[》〉]', content)
    seen = set()
    result = []
    for b in brackets:
        b = b.strip()
        if b and len(b) > 1 and b not in seen:
            seen.add(b)
            result.append(b)
    return result


def match_score(song_name: str, bili_title: str) -> float:
    """计算歌曲名与B站标题的匹配得分 (0-1)"""
    song_n = normalize_for_match(song_name)
    bili_n = normalize_for_match(bili_title)
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


def match_bilibili_video(article_title: str, bili_videos: list[dict], threshold: float = 0.35) -> tuple[Optional[str], Optional[str]]:
    """
    用公众号文章标题匹配 B站视频标题。
    返回 (bvid, matched_title) 或 (None, None)
    """
    if not article_title or not bili_videos:
        return None, None
    best_bvid, best_title, best_score = None, None, threshold
    for v in bili_videos:
        score = match_score(article_title, v["title"])
        if score > best_score:
            best_score = score
            best_bvid = v["bvid"]
            best_title = v["title"]
    return best_bvid, best_title


def embed_bilibili_iframe(bvid: str) -> str:
    """生成 B站视频 iframe HTML，插入到 content 末尾"""
    iframe = (
        f'<div class="bilibili-video">'
        f'<iframe src="https://player.bilibili.com/player.html?bvid={bvid}" '
        f'width="100%" height="500" scrolling="no" frameborder="0" '
        f'allowfullscreen="true"></iframe>'
        f'</div>'
    )
    return iframe


def fetch_bilibili_videos(force: bool = False) -> list[dict]:
    """
    获取白熊音乐 B站空间视频列表。
    优先用 space API；被限流时用搜索 API 兜底。
    结果缓存到 data/bilibili_videos.json。
    """
    import time, urllib.request, urllib.parse

    if os.path.exists(BILI_VIDEOS_FILE) and not force:
        with open(BILI_VIDEOS_FILE) as f:
            return json.load(f)

    all_videos = []

    # 策略1: space API（需要 buvid3 cookie 才能过风控）
    print("[Bilibili] 策略1: space API...")
    buvid3 = "BILI_DESKTOP_SPMA_0.0.0.0"  # 基础 buvid3，不依赖外部 cookie
    for page in range(1, 20):
        # wts 参数防止 CDN 缓存导致 412
        wts = str(int(time.time()))
        url = f"https://api.bilibili.com/x/space/arc/search?mid={BILI_MID}&pn={page}&ps=30&order=pubdate&wts={wts}"
        req = urllib.request.Request(url, headers={
            "User-Agent": USER_AGENT,
            "Referer": f"https://space.bilibili.com/{BILI_MID}/video",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Origin": "https://space.bilibili.com",
            "Cookie": f"buvid3={buvid3}",
        })
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read())
            if data.get("code") == 0:
                vlist = data.get("data", {}).get("list", {}).get("vlist", [])
                if not vlist:
                    print(f"  page {page}: empty, stop")
                    break
                for v in vlist:
                    all_videos.append({"bvid": v["bvid"], "title": v["title"]})
                print(f"  page {page}: +{len(vlist)}, total={len(all_videos)}")
                time.sleep(random.uniform(3, 6))  # 随机间隔降低风控
            elif data.get("code") == -412:
                print(f"  page {page}: 412 -> break (space blocked)")
                break
            else:
                print(f"  page {page}: code={data.get('code')} {data.get('message','')} -> retry")
                time.sleep(5)
                continue
        except Exception as e:
            print(f"  page {page}: {e} -> retry after 5s")
            time.sleep(5)
            continue

    if len(all_videos) < 50:
        # 策略2: 搜索 API 补充（space API 只返回部分数据）
        print(f"[Bilibili] 策略2: 搜索 API 补充 (space got {len(all_videos)})")
        seen = {v["bvid"] for v in all_videos}
        for kw in ["白熊音乐Ukulele 弹唱", "白熊音乐Ukulele 尤克里里", "白熊音乐Ukulele 教学"]:
            for page in range(1, 4):
                query = urllib.parse.quote(kw)
                url = f"https://api.bilibili.com/x/web-interface/search/all/v2?keyword={query}&page={page}&page_size=20"
                req = urllib.request.Request(url, headers={
                    "User-Agent": USER_AGENT,
                    "Referer": "https://www.bilibili.com",
                })
                try:
                    with urllib.request.urlopen(req, timeout=15) as resp:
                        result_data = json.loads(resp.read())
                    if result_data.get("code") == 0:
                        for r in result_data.get("data", {}).get("result", []):
                            if r.get("result_type") == "video":
                                for item in r.get("data", []):
                                    bv = item.get("bvid", "")
                                    if bv and bv not in seen:
                                        title = re.sub(r'<[^>]+>', '', item.get("title", ""))
                                        all_videos.append({"bvid": bv, "title": title})
                                        seen.add(bv)
                    time.sleep(1)
                except Exception:
                    pass

    os.makedirs(os.path.dirname(BILI_VIDEOS_FILE), exist_ok=True)
    with open(BILI_VIDEOS_FILE, "w") as f:
        json.dump(all_videos, f, ensure_ascii=False, indent=2)
    print(f"[Bilibili] ✅ 共获取 {len(all_videos)} 个视频 -> {BILI_VIDEOS_FILE}")
    return all_videos


def sync_bilibili_videos(bili_videos: list[dict], songs: list[dict]) -> tuple[int, int]:
    """
    用公众号文章标题匹配 B站视频，写入 bilibili_bvid 字段。
    优先从 content 提取歌名（【《》】括号），再用 article_title兜底。
    返回 (成功匹配数, 文章总数)
    """
    matched = 0
    for song in songs:
        article_title = song.get("title", "")
        content = song.get("content", "")
        # 优先从 content 提取真实歌名
        song_names = extract_song_names_from_content(content)
        bvid, matched_title = None, None
        if song_names:
            for sn in song_names:
                bvid, matched_title = match_bilibili_video(sn, bili_videos)
                if bvid:
                    break
        # 兜底：用 article_title
        if not bvid:
            bvid, matched_title = match_bilibili_video(article_title, bili_videos)
        if bvid:
            song["bilibili_bvid"] = bvid
            song["_bilibili_matched_title"] = matched_title
            matched += 1
    return matched, len(songs)


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

        # 过滤逻辑：None=Plan A严格模式, []=全部保留, [kw]=关键词模式
        if keywords is None:
            # Plan A: 严格过滤
            if not is_sheet_music_article(title, desc):
                skipped += 1
                continue
        elif keywords:
            # 关键词过滤
            if not filter_by_keywords(title, desc, keywords):
                skipped += 1
                continue
        # keywords=[] 意味着不过滤，全部保留
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

    # Bilibili 视频匹配
    bili_videos = fetch_bilibili_videos(force=False)
    if bili_videos:
        matched_count, total = sync_bilibili_videos(bili_videos, merged)
        print(f"[Bilibili] 视频匹配: {matched_count}/{total} 篇已嵌入 iframe")
    else:
        print("[Bilibili] ⚠️ 未获取到 B站视频，跳过匹配")

    save_songs(merged)


def check_website_status() -> bool:
    """检查 harmonica-music 网站是否可访问，返回 True 表示正常"""
    import urllib.request
    url = "http://localhost:3000"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                print(f"✅ 网站正常访问: {url} (HTTP {resp.status})")
                return True
            else:
                print(f"⚠️ 网站返回异常状态: HTTP {resp.status}")
                return False
    except urllib.error.HTTPError as e:
        print(f"⚠️ 网站HTTP错误: {e.code}")
        return False
    except Exception as e:
        print(f"❌ 网站无法访问: {e}")
        return False


def check_harmonica_container() -> bool:
    """检查 harmonica-music 容器是否在运行"""
    try:
        result = subprocess.run(
            ["docker", "ps", "--filter", "name=harmonica-music-app", "--format", "{{.Names}}"],
            capture_output=True, text=True, timeout=10
        )
        if result.stdout.strip():
            print(f"✅ 容器运行中: {result.stdout.strip()}")
            return True
        else:
            print("❌ harmonica-music 容器未运行")
            return False
    except Exception as e:
        print(f"❌ 检查容器状态失败: {e}")
        return False


def diagnose_and_fix():
    """诊断并尝试修复网站问题"""
    print("\n=== 网站诊断 ===")

    # 1. 检查容器状态
    if not check_harmonica_container():
        print("尝试启动容器...")
        try:
            subprocess.run(
                ["docker-compose", "up", "-d"],
                cwd=HARMONICA_ROOT,
                check=True, capture_output=True, timeout=30
            )
            print("✅ 容器已启动，等待 5 秒...")
            import time
import random
            time.sleep(5)
        except Exception as e:
            print(f"❌ 启动容器失败: {e}")
            return

    # 2. 检查网站访问
    if check_website_status():
        print("=== 诊断完成: 网站正常 ===\n")
    else:
        # 3. 尝试重启容器
        print("尝试重启容器...")
        try:
            subprocess.run(
                ["docker-compose", "restart"],
                cwd=HARMONICA_ROOT,
                check=True, capture_output=True, timeout=30
            )
            import time
            time.sleep(5)
            if check_website_status():
                print("=== 诊断完成: 网站已恢复 ===\n")
            else:
                print("=== 诊断完成: 网站仍不可访问，请手动检查 ===\n")
        except Exception as e:
            print(f"❌ 重启容器失败: {e}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--keyword", type=str, nargs="+", default=None,
                        help="Custom keywords (overrides Plan A filter)")
    parser.add_argument("--all", action="store_true",
                        help="Sync all articles without filtering")
    parser.add_argument("--verify", action="store_true",
                        help="Only run website health check without syncing")
    parser.add_argument("--bili-fetch", action="store_true",
                        help="强制重新爬取 B站视频（无视缓存）")
    parser.add_argument("--bili-only", action="store_true",
                        help="只测试 B站匹配（不执行同步）")
    args = parser.parse_args()

    if args.verify:
        diagnose_and_fix()
        return

    if args.bili_only:
        # 仅测试 B站匹配效果
        print("=== B站匹配测试 ===")
        bili_videos = fetch_bilibili_videos(force=args.bili_fetch)
        with open(OUTPUT_FILE) as f:
            songs = json.load(f)
        # 取前5条有歌名的文章
        test = [s for s in songs if extract_song_names_from_content(s.get("content", ""))][:5]
        matched = 0
        for s in test:
            sns = extract_song_names_from_content(s.get("content", ""))
            bv, sn = match_bilibili_video(sns, bili_videos)
            status = "✅" if bv else "❌"
            if bv: matched += 1
            print(f"{status} {s['title'][:40]}")
            print(f"   歌名: {sns[:3]}")
            print(f"   B站: {bv or '未匹配'}")
        print(f"\n匹配成功率: {matched}/{len(test)}")
        print(f"B站视频库: {len(bili_videos)} 条")
        return

    if args.all:
        # --all: 不过滤，同步所有文章
        keywords = []
    elif args.keyword:
        # --keyword: 自定义关键词过滤
        keywords = args.keyword
    else:
        # 默认: Plan A 严格过滤
        keywords = None  # sync() 函数用 is_sheet_music_article 判断

    sync(keywords=keywords, limit=args.limit)

    # 同步完成后自动检查网站状态
    print("\n=== 同步完成，开始验证网站 ===")
    check_website_status()


if __name__ == "__main__":
    main()
