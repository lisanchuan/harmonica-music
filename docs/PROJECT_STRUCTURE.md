# 项目结构说明

## 唯一主项目

音乐展示项目统一放在：

`/Volumes/我的文档/ai code/harmonica-music`

后续开发、启动、抓取和数据维护都在这个目录执行。不要再把 `/Users/lisanchuan1/Documents/code/ai code/projects/harmonica-music` 当成运行目录。

## 顶层目录

```text
harmonica-music/
├── data/
├── docs/
├── public/
├── scripts/
├── src/
├── package.json
├── next.config.ts
├── vitest.config.ts
└── tsconfig.json
```

### `data`

项目内结构化数据。

- `songs.json`：口琴曲谱基准数据，当前 686 条。
- `wechat_songs.json`：公众号/尤克里里数据，当前 86 条。
- `wechat_songs_clean.json`：清洗后的公众号/尤克里里数据，当前 70 条。
- `bilibili_videos.json`：视频相关辅助数据。
- `*.bak*`：历史备份，只用于人工追溯。
- `*-report.md`：历史处理报告，不参与运行。

会重写这些文件的脚本执行前，应先备份目标 JSON。

### `public`

项目内媒体和静态资源。

- `public/images`：口琴单图谱和公众号/尤克里里曲谱图片，当前 2339 个文件。
- `public/audio`：口琴示范演奏与伴奏，当前 1321 个文件。
- `public/tuner`：旧版独立调音器静态资源。

口琴详情页的图片和音频通过 `/api/music-assets/...` 读取，不直接依赖浏览器访问绝对磁盘路径。

### `scripts`

本项目脚本。

- `crawl-incremental.js`：增量抓取口琴数据。
- `crawl-all.js`：全量抓取口琴数据。
- `crawl.js`：历史抓取脚本。
- `classify.ts`：分类辅助脚本。
- `sync_white_bear.py`：白熊音乐同步脚本。
- `fetch_bilibili.py`：Bilibili 辅助数据脚本。
- `build-local-cache.sh`：把源码同步到本机缓存后执行生产构建。
- `start-standalone.sh`：启动 Next.js standalone 产物，并把运行时数据根目录指回外置盘项目。

抓取脚本默认以脚本所在项目为根目录，可用 `HARMONICA_PROJECT_DIR` 临时覆盖。

### `src/app`

Next.js App Router 页面和 API。

- `page.tsx`：乐谱资料馆首页。
- `scores/page.tsx`：乐谱资料馆列表。
- `scores/[id]/page.tsx`：乐谱资料馆详情。
- `api/score-assets/[id]/route.ts`：乐谱资料馆图片/PDF 受控资源接口。
- `harmonica/page.tsx`：口琴列表。
- `harmonica/[id]/page.tsx`：口琴详情。
- `api/music-assets/[...path]/route.ts`：口琴图片/音频受控资源接口。
- `api/songs/route.ts`：歌曲数据 API。
- `ukulele/page.tsx`、`ukulele/[id]/page.tsx`：尤克里里页面。
- `tuner/page.tsx`：调音器页面。

### `src/components`

可复用界面组件。

- `SiteHeader.tsx`：统一顶部导航。
- `ScoreRow.tsx`：乐谱资料馆列表项。
- `ScoreImageReader.tsx`：图片乐谱阅读器，支持单页/双页、缩放、缩略图和全屏。
- `PdfReader.tsx`：PDF 预览和全屏。
- `SongList.tsx`、`SongCard.tsx`：口琴列表。
- `SheetMusicViewer.tsx`：口琴曲谱图片查看器。
- `AudioPlayer.tsx`：音频播放器。
- `components/tuner`：调音器组件。

### `src/lib`

服务端数据访问、路径安全和纯逻辑。

- `scores.ts`：乐谱资料馆 SQLite 查询、统计、分页和资源解析。
- `harmonica-library.ts`：口琴 JSON 读取、媒体 URL 规范化和资源路径校验。
- `tuner/*`：调音器音名、口琴孔位和频率映射逻辑。

服务端路径逻辑必须校验资源仍在允许的根目录内。

### `docs`

项目文档。

- `PROJECT_OVERVIEW.md`：整体项目说明、模块边界和维护原则。
- `PROJECT_STRUCTURE.md`：目录职责和关键文件说明。
- `tuner-local-setup.md`：调音器本地说明。
- `superpowers/*`：历史方案、报告和规格资料。

## 外部依赖目录

乐谱资料馆的大型谱库仍在项目外：

- SQLite：`/Users/lisanchuan1/Documents/乐谱爬虫/data/qupu.sqlite3`
- 图片/PDF：`/Volumes/我的文档/乐谱`

Python 项目 `/Users/lisanchuan1/Documents/乐谱爬虫` 继续负责抓取、下载、校验和数据库维护。Next.js 项目只做展示和只读查询。

## 可忽略目录

- `node_modules`：依赖目录，可重新安装。
- `.next`：Next.js 构建产物，可删除重建。
- `_migration_backups`：迁移备份，不参与运行。
- `~/Library/Caches/harmonica-music`：本机构建缓存，不在里面改代码。

这些目录不应作为代码审查或数据核对的主依据。

## 常用命令

```bash
cd '/Volumes/我的文档/ai code/harmonica-music'
npm install
npm run dev -- -p 3001
npm test
npx --no-install tsc --noEmit
npm run lint
npm run build
PORT=3001 npm start
```

## 数据规则

1. 口琴页面读取 `data/songs.json`，并关联 `public/images/a_*` 与 `public/audio/a_*`。
2. 尤克里里页面读取 `data/wechat_songs*.json`，并关联项目内图片资源。
3. 乐谱资料馆读取 SQLite，只展示真实文件存在且位于 `SCORE_DATA_DIR` 内的记录。
4. 媒体资源通过 API 读取，支持图片/PDF 内联预览、下载和音频/PDF Range 请求。
5. 不把临时抓取结果直接覆盖基准数据，除非已经确认记录数量、媒体文件和页面展示都正常。
