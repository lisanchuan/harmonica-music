# 音乐项目总览

## 目标

把音乐相关展示能力收敛到一个 Next.js 项目里统一管理：

- 乐谱资料馆：大规模图片/PDF 乐谱检索和阅读。
- 口琴音乐馆：口琴曲谱、示范演奏和伴奏播放。
- 尤克里里曲谱：公众号/白熊音乐等曲谱展示。
- 调音器：浏览器内口琴调音工具。

项目的主目录固定为：

`/Volumes/我的文档/ai code/harmonica-music`

旧本机目录只作为历史来源参考，不再作为开发、启动或数据维护入口。

## 当前形态

这是一个 Next.js 16 + React 19 应用。页面、API、数据读取和受控文件访问都在同一个项目内完成。

| 模块 | 路由 | 数据来源 | 资源来源 |
| --- | --- | --- | --- |
| 乐谱资料馆首页 | `/` | SQLite 谱库 | `/Volumes/我的文档/乐谱` |
| 乐谱资料馆列表 | `/scores` | SQLite 谱库 | `/api/score-assets/[id]` |
| 乐谱资料馆详情 | `/scores/[id]` | SQLite 谱库 | `/api/score-assets/[id]` |
| 口琴列表 | `/harmonica` | `data/songs.json` | `/api/music-assets/images/...` |
| 口琴详情 | `/harmonica/[id]` | `data/songs.json` | `/api/music-assets/images/...`、`/api/music-assets/audio/...` |
| 尤克里里列表 | `/ukulele` | `data/wechat_songs*.json` | 项目内图片资源 |
| 尤克里里详情 | `/ukulele/[id]` | `data/wechat_songs*.json` | 项目内图片资源 |
| 调音器 | `/tuner` | 前端算法 | 浏览器麦克风 |

## 数据边界

### 项目内数据

- `data/songs.json` 是口琴基准数据。当前 686 条。
- `data/wechat_songs.json` 是公众号/尤克里里数据。当前 86 条。
- `data/wechat_songs_clean.json` 是清洗后的公众号/尤克里里数据。当前 70 条。
- `public/images` 存放口琴单图谱和公众号多页谱。当前 2339 个文件。
- `public/audio` 存放示范演奏和伴奏。当前 1321 个文件。

这些文件属于主项目，后续统一在外置盘项目内维护。

### 外部谱库数据

乐谱资料馆的大型谱库暂时不复制进本项目：

- SQLite 数据库：`/Users/lisanchuan1/Documents/乐谱爬虫/data/qupu.sqlite3`
- 乐谱图片/PDF：`/Volumes/我的文档/乐谱`

Next.js 只读访问 SQLite，并通过 `/api/score-assets/[id]` 提供受控资源读取。接口必须校验文件位于 `SCORE_DATA_DIR` 内，避免暴露任意磁盘文件。

### Python 爬虫项目

`/Users/lisanchuan1/Documents/乐谱爬虫` 继续负责：

- 抓取乐谱元数据。
- 下载图片和 PDF。
- 校验真实文件存在。
- 维护 SQLite 数据库。

它不再负责展示页面。展示页面由本项目统一维护。

## 关键环境变量

| 变量 | 默认/建议值 | 用途 |
| --- | --- | --- |
| `SCORE_DB_PATH` | `/Users/lisanchuan1/Documents/乐谱爬虫/data/qupu.sqlite3` | 乐谱资料馆 SQLite 数据库 |
| `SCORE_DATA_DIR` | `/Volumes/我的文档/乐谱` | 乐谱资料馆资源根目录 |
| `HARMONICA_LIBRARY_DIR` | `/Volumes/我的文档/ai code/harmonica-music` | 运行时口琴数据和媒体根目录 |
| `HARMONICA_PROJECT_DIR` | `/Volumes/我的文档/ai code/harmonica-music` | 抓取脚本项目根目录覆盖 |
| `PORT` | `3001` | 本机运行端口 |

## 运行方式

开发模式：

```bash
cd '/Volumes/我的文档/ai code/harmonica-music'
npm run dev -- -p 3001
```

生产模式：

```bash
cd '/Volumes/我的文档/ai code/harmonica-music'
npm run build
PORT=3001 npm start
```

验证：

```bash
npm test
npx --no-install tsc --noEmit
npm run lint
```

## 外置盘和缓存策略

外置盘保存真实项目资产：源码、配置、数据 JSON、图片、音频和文档。

可再生的大量小文件不作为资产迁移：

- `node_modules`
- `.next`
- 构建缓存
- 迁移备份

`scripts/build-local-cache.sh` 会把源码同步到 `~/Library/Caches/harmonica-music` 后构建，再让生产启动脚本显式指回外置盘主项目。不要在缓存目录里改代码。

## 后续维护原则

1. 新功能优先加到外置盘主项目。
2. 口琴和尤克里里数据不从网上临时重找，先信任项目内 JSON 和媒体基线。
3. 乐谱资料馆只展示有真实资源的记录。
4. 图片/PDF/音频都通过受控 API 访问，不直接把绝对路径暴露给浏览器。
5. 抓取、清洗、修复脚本运行前，先确认写入目标是外置盘主项目或 Python 爬虫项目的预期目录。
6. 每次大整理后更新 README、AGENTS.md 和本文件。
