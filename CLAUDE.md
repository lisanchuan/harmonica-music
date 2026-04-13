# 口琴音乐馆 (Harmonica Music Gallery)

口琴曲谱展示网站，数据来源于 https://www.kouqinke.com

## Agent Teams + Harness Engineering

本项目使用 harness-teams skill 进行 Agent 协作和任务执行控制。
参见 ~/.claude/skills/harness-teams/CLAUDE.md

## 技术栈

- **框架**: Next.js 16.2.2 + React 19.2.4
- **样式**: Tailwind CSS 4
- **爬虫**: Puppeteer (puppeteer-core 24.40.0)
- **路径别名**: `@/*` → `./src/*`

## 关键约定

### 文件命名
```
public/audio/{resource_id}_demo.mp3           # 示范演奏
public/audio/{resource_id}_accompaniment.mp3  # 伴奏
public/images/{resource_id}.jpg               # 曲谱图片
```

### songs.json 字段 (src/types/song.ts)
```typescript
interface Song {
  resource_id: string;
  title: string;
  img_url: string;              // 远程封面图
  localImage?: string;          // 本地曲谱 /images/{id}.jpg
  localAudio?: string;          // 本地示范 /audio/{id}_demo.mp3
  localAccompaniment?: string;  // 本地伴奏 /audio/{id}_accompaniment.mp3
  harmonicaType: 'chromatic_12_hole' | 'diatonic_10_hole' | 'unknown';
  style: string[];
  view_count: string;
  price: number;
  jump_url: string;
}
```

## 组件对应关系

| 组件 | 用途 | 图片优先级 |
|-----|------|-----------|
| SongCard | 列表页封面 | img_url (远程) |
| SheetMusicViewer | 详情页曲谱 | localImage > img_url |

## 爬虫两阶段架构

### 第一阶段：demo + 图片
```bash
node scripts/crawl.js
```

### 第二阶段：伴奏
```bash
node scripts/crawl.js --mode=accompaniment
```
伴奏需要 POST 请求: `https://iframe.xiaoeknow.com/api/richtext/get_audio_data?app_id=appudjxrrsp5317`

## 验证命令

```bash
# 检查本地图片数量
ls public/images/ | wc -l

# 检查伴奏数量
ls public/audio/ | grep accompaniment | wc -l

# 检查 songs.json 字段
grep -c "localImage" data/songs.json
```

## 重要经验

1. **图片必须预加载**: `img.naturalWidth` 对懒加载图片返回0，必须用 `new Image()` 预加载后获取真实尺寸
2. **等待5秒**: 详情页图片需要等待5秒加载完成
3. **Cookie 配置**: 爬虫需要有效的 cookies（见 scripts/crawl.js）

## 数据源

- **列表页**: `https://www.kouqinke.com/all/14488941/27084727`
- **详情页**: `https://www.kouqinke.com/detail/{resource_id}/2`

## Docker 部署

```bash
docker compose up -d
```

爬虫在宿主机运行，数据通过 volume 自动同步到容器。
