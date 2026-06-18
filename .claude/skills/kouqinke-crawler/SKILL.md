---
name: kouqinke-crawler
description: 从口琴教学网站(kouqinke.com)下载曲谱数据，包括乐谱图片、示范演奏音频、伴奏音频
disable-model-invocation: true
allowed-tools: Bash Read Grep Edit Write
---

# 口琴网站数据下载 Skill

## 网站结构

- **列表页**: `https://www.kouqinke.com/all/14488941/27084727`
- **详情页**: `https://www.kouqinke.com/detail/{resource_id}/2`

## 架构设计（两阶段分离）

### 第一阶段：爬取 demo + 图片
```bash
node scripts/crawl.js
```
- 只下载示范音频和曲谱图片
- 支持"加载更多"分页
- 处理完当前页所有歌曲后再加载下一页

### 第二阶段：下载伴奏
```bash
node scripts/crawl.js --mode=accompaniment
```
- 读取 songs.json 中已有的歌曲
- 筛选出缺少伴奏的歌曲
- 逐个访问详情页获取伴奏并更新 songs.json
- 失败的可以重复运行重试

## Cookie配置

从浏览器开发者工具获取，至少需要：
```javascript
cookies: [
  { name: 'pc_user_key', value: 'xxx', domain: 'www.kouqinke.com' },
  { name: 'anonymous_user_key', value: 'xxx', domain: 'www.kouqinke.com' },
  { name: 'userInfo', value: 'xxx', domain: 'www.kouqinke.com' }
]
```

## 文件命名

```
public/audio/{resource_id}_demo.mp3           # 示范
public/audio/{resource_id}_accompaniment.mp3  # 伴奏
public/images/{resource_id}.jpg               # 图片
```

## 图片选择逻辑（完整代码）

详情页有多个 `img[data-src]`，通过预加载获取真实尺寸进行评分：

```javascript
// 预加载获取真实尺寸
const dims = await new Promise((resolve) => {
  const testImg = new Image();
  testImg.onload = () => resolve({ w: testImg.naturalWidth, h: testImg.naturalHeight });
  testImg.onerror = () => resolve({ w: 0, h: 0 });
  testImg.src = dataSrc;
});

// 评分规则：
let score = 0;
if (alt.includes('曲谱') || alt.includes('乐谱')) score += 10;  // 关键词
if (dims.w > 500 && dims.h > 500) score += 3;                   // 大图
if (dataSrc.includes('wechatapppro')) score += 2;              // CDN
if (dims.w < 200 || dims.h < 200) score = 0;                   // 排除小图
```

**重要**: 必须等待5秒让图片加载完成，否则 `naturalWidth/naturalHeight` 为0。

## 伴奏获取方式

1. 访问详情页
2. 找到 `iframe.xiaoe-iframe-audio`
3. 从 iframe src 提取 id 参数
4. 调用 API: `POST https://iframe.xiaoeknow.com/api/richtext/get_audio_data?app_id=appudjxrrsp5317`
5. 请求体: `{"id": ["资源ID"]}`
6. 验证 `audio_title` 包含"伴奏"
7. 从响应 `data.data[资源ID].file_url` 获取真实URL

## OCR 分类脚本 (scripts/classify.ts)

两阶段分类：
1. **Phase 1**: 百度 OCR 识别乐谱图片，判断口琴类型（半音阶/十孔）
2. **Phase 2**: MusicBrainz API 查询歌曲风格标签

```bash
npx tsx scripts/classify.ts
```

结果缓存于:
- `scripts/ocr-cache.json`
- `scripts/musicbrainz-cache.json`

## 常见错误处理

### Chrome 启动超时
Puppeteer 启动 Chrome 需要5-10秒，在 `--mode=accompaniment` 中逐个处理避免超时。

### 图片尺寸为0
懒加载图片的 `naturalWidth` 初始为0，必须用 `new Image()` 预加载后读取。

### 伴奏重复
示范和伴奏文件大小相同时删除伴奏（可能是同一文件）。

## 验证命令

```bash
# 检查本地图片
ls public/images/ | wc -l

# 检查伴奏文件
ls public/audio/ | grep accompaniment | wc -l

# 检查 songs.json 字段
grep -c "localImage" data/songs.json
```

## next.config.ts 图片域名配置

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**.xiaoeknow.com' },
    { protocol: 'https', hostname: '**.myqcloud.com' },
  ],
},
```

## 组件对应关系

| 组件 | 用途 | 图片优先级 |
|-----|------|-----------|
| SongCard | 列表页封面 | img_url (远程) |
| SheetMusicViewer | 详情页曲谱 | localImage > img_url (本地优先) |
