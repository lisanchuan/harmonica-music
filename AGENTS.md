# AGENTS.md

## Project Role

This is the canonical local music project for:

- score archive browsing and reading;
- harmonica score browsing, sheet image display, demo audio and accompaniment playback;
- ukulele / WeChat score browsing;
- harmonica tuner.

The canonical project root is:

`/Volumes/我的文档/ai code/harmonica-music`

Do not treat `/Users/lisanchuan1/Documents/code/ai code/projects/harmonica-music` as the active working copy.

## Current Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Vitest
- SQLite through Node runtime APIs for the score archive
- Puppeteer and Python helper scripts for local data maintenance

## Main Routes

- `/`: score archive home.
- `/scores`: score archive list.
- `/scores/[id]`: score archive detail and reader.
- `/harmonica`: harmonica list.
- `/harmonica/[id]`: harmonica detail.
- `/ukulele`: ukulele list.
- `/ukulele/[id]`: ukulele detail.
- `/tuner`: tuner.

## Data Sources

### In-Project Data

- `data/songs.json`: harmonica baseline data, currently 686 records.
- `data/wechat_songs.json`: WeChat / ukulele data, currently 86 records.
- `data/wechat_songs_clean.json`: cleaned WeChat / ukulele data, currently 70 records.
- `public/images`: sheet images, currently 2339 files.
- `public/audio`: demo and accompaniment audio, currently 1321 files.

For harmonica and ukulele regressions, trust these local JSON and media files first. Do not try to recover missing records from the web before checking the canonical external project data.

### External Score Archive Data

- Default SQLite path: `/Users/lisanchuan1/Documents/乐谱爬虫/data/qupu.sqlite3`
- Default score asset root: `/Volumes/我的文档/乐谱`

The Python project at `/Users/lisanchuan1/Documents/乐谱爬虫` owns crawling, downloading, validation and SQLite maintenance. This Next.js project owns presentation and controlled read-only access.

## Environment Variables

Common values:

```bash
SCORE_DB_PATH=/Users/lisanchuan1/Documents/乐谱爬虫/data/qupu.sqlite3
SCORE_DATA_DIR=/Volumes/我的文档/乐谱
HARMONICA_LIBRARY_DIR=/Volumes/我的文档/ai code/harmonica-music
HARMONICA_PROJECT_DIR=/Volumes/我的文档/ai code/harmonica-music
PORT=3001
```

`scripts/start-standalone.sh` sets `HARMONICA_LIBRARY_DIR` automatically so production runtime reads data and media from the external canonical project.

## Development Commands

```bash
cd '/Volumes/我的文档/ai code/harmonica-music'
npm run dev -- -p 3001
npm test
npx --no-install tsc --noEmit
npm run lint
npm run build
PORT=3001 npm start
```

`npm run build` uses `scripts/build-local-cache.sh`, which builds from a local cache to avoid dependency and `.next` churn on the external drive. Do not edit files in `~/Library/Caches/harmonica-music`.

## Code Ownership Map

- `src/app`: routes and API handlers.
- `src/components`: UI readers, lists, player and tuner components.
- `src/lib/scores.ts`: score archive SQLite queries and asset resolution.
- `src/lib/harmonica-library.ts`: harmonica JSON loading and controlled music asset resolution.
- `src/lib/tuner`: tuner note and harmonica mapping logic.
- `scripts`: crawlers, data cleanup, local-cache build and standalone startup.
- `docs`: project documentation and historical planning artifacts.

## Safety Rules

1. Do not expose raw absolute media paths to the browser.
2. Asset APIs must verify resolved paths remain inside the configured root directory.
3. Score archive pages should only show entries with real, readable local files.
4. Do not overwrite `data/songs.json` or media directories without first confirming counts and creating a backup.
5. Do not delete the old local project or migration backups unless the user explicitly asks.
6. Do not commit `node_modules`, `.next`, local caches or `_migration_backups`.
7. Keep the root page as the score archive home unless the user explicitly changes the product direction.

## Verification Expectations

For data or API changes:

```bash
npm test
npx --no-install tsc --noEmit
```

For UI or route changes:

```bash
npm run build
```

Also manually check representative pages when relevant:

- `/`
- `/scores`
- `/scores/[id]` with image resources
- `/scores/[id]` with PDF resources
- `/harmonica`
- `/harmonica/[id]`
- `/ukulele`
- `/tuner`

## Documentation

Update these files when project structure, data ownership or startup flow changes:

- `README.md`
- `AGENTS.md`
- `docs/PROJECT_OVERVIEW.md`
- `docs/PROJECT_STRUCTURE.md`

## Agent Teams

Historical notes mention harness teams. If a future task explicitly asks for multi-agent coordination, follow the available harness/team instructions in the active environment. For normal maintenance, work directly in this project and keep changes scoped.
