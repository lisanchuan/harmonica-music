# 音乐资料馆

这是统一后的本机音乐项目，包含乐谱资料馆、口琴曲谱、尤克里里曲谱和调音器。后续开发、运行、数据维护都以外置盘这份项目为准：

`/Volumes/我的文档/ai code/harmonica-music`

旧目录 `/Users/lisanchuan1/Documents/code/ai code/projects/harmonica-music` 不再作为主运行目录。

## 功能入口

- `/`：乐谱资料馆首页，读取 SQLite 谱库并展示分类、统计和最近更新。
- `/scores`：乐谱资料馆列表页，支持搜索、分类、类型、作者和排序筛选。
- `/scores/[id]`：乐谱详情页，支持图片双页阅读、PDF 预览、下载和全屏。
- `/harmonica`：口琴曲谱列表。
- `/harmonica/[id]`：口琴曲谱详情，展示乐谱图片、示范演奏和伴奏。
- `/ukulele`：尤克里里/公众号曲谱列表。
- `/ukulele/[id]`：尤克里里/公众号曲谱详情。
- `/tuner`：口琴调音器。

## 当前数据基线

- `data/songs.json`：686 条口琴曲谱记录。
- `data/wechat_songs.json`：86 条公众号/尤克里里记录。
- `data/wechat_songs_clean.json`：70 条清洗后的公众号/尤克里里记录。
- `public/images`：2339 个图片文件。
- `public/audio`：1321 个音频文件。
- 乐谱资料馆数据库默认读取 `/Users/lisanchuan1/Documents/乐谱爬虫/data/qupu.sqlite3`。
- 乐谱资料馆资源默认读取 `/Volumes/我的文档/乐谱`。

## 快速开始

```bash
cd '/Volumes/我的文档/ai code/harmonica-music'
npm install
npm run dev -- -p 3001
```

访问 `http://127.0.0.1:3001`。

生产模式：

```bash
cd '/Volumes/我的文档/ai code/harmonica-music'
npm run build
PORT=3001 npm start
```

## 常用命令

```bash
npm test
npx --no-install tsc --noEmit
npm run lint
npm run build
npm run crawl
npm run crawl:full
```

`npm run build` 会把源码同步到本机缓存目录再构建，避免在外置盘或 SMB 盘上扫描大量依赖小文件。源码、数据和媒体仍以外置盘项目为准。

## 环境变量

```bash
SCORE_DB_PATH=/Users/lisanchuan1/Documents/乐谱爬虫/data/qupu.sqlite3
SCORE_DATA_DIR=/Volumes/我的文档/乐谱
HARMONICA_LIBRARY_DIR=/Volumes/我的文档/ai code/harmonica-music
HARMONICA_PROJECT_DIR=/Volumes/我的文档/ai code/harmonica-music
PORT=3001
```

- `SCORE_DB_PATH`：乐谱资料馆 SQLite 数据库。
- `SCORE_DATA_DIR`：乐谱资料馆图片/PDF 资源根目录。
- `HARMONICA_LIBRARY_DIR`：运行时读取口琴数据和媒体的项目根目录，生产启动脚本会自动设置。
- `HARMONICA_PROJECT_DIR`：抓取脚本的项目根目录覆盖项，通常不需要手动设置。

## 项目结构

```text
harmonica-music/
├── data/                    # 口琴、公众号和辅助数据 JSON
├── docs/                    # 项目说明、结构和历史方案
├── public/
│   ├── audio/               # 口琴示范演奏和伴奏
│   ├── images/              # 口琴和公众号曲谱图片
│   └── tuner/               # 旧版独立调音器静态资源
├── scripts/                 # 抓取、清洗、构建和启动脚本
├── src/
│   ├── app/                 # Next.js 页面和 API
│   ├── components/          # 阅读器、播放器、列表和调音器组件
│   ├── hooks/               # 前端 hooks
│   ├── lib/                 # 数据访问、路径校验和调音器逻辑
│   ├── test/                # 测试初始化
│   └── types/               # TypeScript 类型
└── _migration_backups/      # 迁移备份，已忽略，不参与运行
```

更完整的管理说明见 [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) 和 [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)。

## 数据维护原则

1. 外置盘项目是唯一主项目，不在旧本机目录继续改代码。
2. 运行和展示只读取真实存在的本地资源，不能绕过受控资源接口直接暴露磁盘路径。
3. 会重写 JSON 或媒体文件的脚本，执行前先备份相关数据。
4. `node_modules`、`.next`、构建缓存和迁移备份不作为项目数据管理。
5. Python 乐谱爬虫项目继续负责采集、下载、校验和 SQLite 维护；展示层由本项目统一提供。
