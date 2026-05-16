/**
 * 口琴网站完整爬虫 v2
 * 策略：Puppeteer 模拟浏览器点击"加载更多"，获取全量歌曲列表，再抓详情页
 */
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const PROJECT_DIR = '/Users/lisanchuan1/Documents/code/ai code/harmonica-music';
const OUTPUT_FILE = path.join(PROJECT_DIR, 'data', 'songs.json');
const AUDIO_DIR = path.join(PROJECT_DIR, 'public', 'audio');
const IMAGE_DIR = path.join(PROJECT_DIR, 'public', 'images');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LIST_URL = 'https://www.kouqinke.com/all/14488941/27084727';

async function downloadFile(url, filePath) {
  if (fs.existsSync(filePath)) return true;
  try {
    const https = require('https');
    const http = require('http');
    const file = fs.createWriteStream(filePath);
    const protocol = url.startsWith('https') ? https : http;
    await new Promise((resolve, reject) => {
      protocol.get(url, res => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return downloadFile(res.headers.location, filePath).then(resolve).catch(reject);
        }
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }).on('error', err => { fs.unlinkSync(filePath); reject(err); });
    });
    return true;
  } catch (e) {
    console.log(`  Download failed: ${url}`);
    return false;
  }
}

async function getSongDetail(resourceId) {
  // 详情页需要访问，但大部分数据已在列表页，直接返回空让列表数据补充
  return {};
}

async function crawlAll() {
  console.log('🚀 启动口琴网站爬虫 v2...');
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // 加载已有数据
  let existingSongs = {};
  if (fs.existsSync(OUTPUT_FILE)) {
    const raw = fs.readFileSync(OUTPUT_FILE, 'utf8');
    const arr = JSON.parse(raw);
    arr.forEach(s => { if (s.resource_id) existingSongs[s.resource_id] = s; });
    console.log(`📂 已加载 ${arr.length} 首已有歌曲`);
  }
  
  // 访问列表页
  console.log('🌐 访问列表页...');
  await page.goto(LIST_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('⏳ 加载更多中...');
  let clickCount = 0;
  const maxClicks = 50;
  
  for (let i = 0; i < maxClicks; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 300));
    
    const clicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent.includes('加载更多') && !b.disabled);
      if (btn) { btn.scrollIntoView(); btn.click(); return true; }
      return false;
    });
    
    if (!clicked) {
      console.log('  无更多内容，停止');
      break;
    }
    
    clickCount++;
    await new Promise(r => setTimeout(r, 1500));
    
    const count = await page.evaluate(() => window.__NUXT__.data[0].componentData.list.length);
    process.stdout.write(`\r  第 ${clickCount} 次加载 -> ${count} 首`);
  }
  
  console.log('\n\n📋 获取完整列表...');
  const fullList = await page.evaluate(() => window.__NUXT__.data[0].componentData.list);
  console.log(`📊 网站总数: ${fullList.length}`);
  
  // 对比增量
  const existingIds = new Set(Object.keys(existingSongs));
  const newSongs = fullList.filter(s => !existingIds.has(s.resource_id));
  const updatedCount = fullList.filter(s => existingIds.has(s.resource_id)).length;
  
  console.log(`🔄 已有: ${updatedCount} 首, 新增: ${newSongs.length} 首`);
  
  if (newSongs.length > 0) {
    console.log('\n🆕 新歌列表:');
    newSongs.forEach(s => console.log(`  - ${s.title} (${s.lesson_start_at})`));
    
    // 抓详情页（音频+曲谱图片）
    console.log('\n📥 抓取新歌曲谱和音频...');
    for (const song of newSongs) {
      console.log(`  抓取: ${song.title}`);
      
      // 下载曲谱图片
      if (song.img_url) {
        const imgExt = path.extname(new URL(song.img_url).pathname) || '.jpg';
        const imgName = `${song.resource_id}${imgExt}`;
        const imgPath = path.join(IMAGE_DIR, imgName);
        await downloadFile(song.img_url, imgPath);
      }
      
      // 尝试从详情页获取音频
      if (song.origin_url) {
        const audioExt = path.extname(new URL(song.origin_url).pathname) || '.mp3';
        const audioName = `${song.resource_id}${audioExt}`;
        const audioPath = path.join(AUDIO_DIR, audioName);
        await downloadFile(song.origin_url, audioPath);
      }
      
      await new Promise(r => setTimeout(r, 300));
    }
  }
  
  // 合并所有歌曲（以 resource_id 为 key，去重）
  const allSongsMap = { ...existingSongs };
  fullList.forEach(s => { allSongsMap[s.resource_id] = s; });
  const allSongs = Object.values(allSongsMap);
  
  // 按 lesson_start_at 降序排序
  allSongs.sort((a, b) => {
    const ta = a.lesson_start_at || '';
    const tb = b.lesson_start_at || '';
    return tb.localeCompare(ta);
  });
  
  // 保存
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allSongs, null, 2), 'utf8');
  console.log(`\n✅ 保存完成: ${allSongs.length} 首 -> ${OUTPUT_FILE}`);
  
  await browser.close();
  return allSongs.length;
}

crawlAll().then(count => {
  console.log(`\n🎉 总计 ${count} 首歌曲`);
  process.exit(0);
}).catch(e => {
  console.error('❌ 错误:', e.message);
  process.exit(1);
});
