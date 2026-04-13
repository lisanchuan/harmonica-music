# 口琴音乐馆

口琴曲谱展示网站，包含乐谱图片、示范演奏和伴奏音频。

## 功能

- 曲谱列表展示，支持搜索、口琴类型筛选、风格筛选
- 曲谱详情页，显示高清乐谱图片
- 示范演奏和伴奏音频播放
- 支持放大/缩小曲谱（0.5x - 3x）

## 快速开始

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 目录结构

```
harmonica-music/
├── data/
│   └── songs.json              # 曲谱数据
├── public/
│   ├── audio/                  # 音频文件
│   │   ├── {id}_demo.mp3           # 示范演奏
│   │   └── {id}_accompaniment.mp3   # 伴奏
│   └── images/                 # 曲谱图片
├── scripts/
│   ├── crawl.js                # 主爬虫脚本
│   ├── crawl.js                # 伴奏下载脚本
│   └── classify.ts             # OCR分类脚本
├── src/
│   ├── app/
│   │   ├── page.tsx            # 首页
│   │   ├── songs/[id]/page.tsx # 详情页
│   │   └── api/songs/route.ts  # API
│   ├── components/
│   │   ├── AudioPlayer.tsx     # 音频播放器
│   │   ├── SheetMusicViewer.tsx# 曲谱查看器
│   │   ├── SongCard.tsx        # 列表卡片
│   │   └── SongList.tsx        # 曲谱列表+搜索
│   └── types/
│       └── song.ts             # TypeScript类型
└── .claude/skills/             # Claude Code skills
```

## 数据管理

### 下载 demo + 图片
```bash
node scripts/crawl.js
```

### 下载伴奏
```bash
node scripts/crawl.js --mode=accompaniment
```

### OCR 分类（口琴类型+风格）
```bash
npx tsx scripts/classify.ts
```

## Docker 部署

```bash
# 启动
docker compose up -d

# 查看日志
docker compose logs -f

# 停止
docker compose down
```

访问 http://localhost:3000

**注意**: 爬虫在宿主机本地运行，不需要在容器内：
```bash
# 宿主机上跑爬虫
node scripts/crawl.js
node scripts/crawl.js --mode=accompaniment
```

数据更新后容器自动读取最新文件，无需重启。

## 数据来源

网站: https://www.kouqinke.com

Cookie 配置在 `scripts/crawl.js` 中。
