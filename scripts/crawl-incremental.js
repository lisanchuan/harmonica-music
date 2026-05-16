const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const PROJECT_DIR = '/Users/lisanchuan1/Documents/code/ai code/harmonica-music';

const CONFIG = {
  listUrl: 'https://www.kouqinke.com/all/14488941/27084727',
  cookie: process.env.KOUQINKE_COOKIE || ''
};

// 下载文件
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url) { resolve(null); return; }
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

// 抓取详情页音频和图片
async function crawlDetail(page, song) {
  const detailUrl = `https://www.kouqinke.com/detail/${song.resource_id}/2`;
  
  try {
    await page.goto(detailUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await new Promise(r => setTimeout(r, 4000));
    
    // 获取 demo 音频
    const demoAudio = await page.evaluate(() => {
      const audios = document.querySelectorAll('audio');
      for (const audio of audios) {
        const src = audio.querySelector('source')?.src || audio.src;
        if (src && !src.includes('blank') && !src.includes('null')) {
          const parent = audio.closest('[class]') || audio.parentElement;
          const parentText = parent?.innerText || '';
          if (!parentText.includes('伴奏')) {
            return src;
          }
        }
      }
      return null;
    });
    
    // 下载音频
    let localAudio = null;
    if (demoAudio) {
      const audioPath = path.join(PROJECT_DIR, 'public/audio', `${song.resource_id}_demo.mp3`);
      try {
        await downloadFile(demoAudio, audioPath);
        localAudio = `/audio/${song.resource_id}_demo.mp3`;
        console.log(`  ✅ 音频下载完成`);
      } catch(e) {
        console.log(`  ⚠️ 音频下载失败: ${e.message}`);
      }
    }
    
    // 获取曲谱图片
    const imgUrl = await page.evaluate(async () => {
      const allImgs = document.querySelectorAll('img[data-src]');
      let bestImg = null;
      
      for (const img of allImgs) {
        const dataSrc = img.getAttribute('data-src');
        const alt = (img.alt || '').toLowerCase();
        
        const dims = await new Promise((resolve) => {
          const testImg = new Image();
          testImg.onload = () => resolve({ w: testImg.naturalWidth, h: testImg.naturalHeight });
          testImg.onerror = () => resolve({ w: 0, h: 0 });
          testImg.src = dataSrc;
        });
        
        let score = 0;
        if (alt.includes('曲谱') || alt.includes('乐谱') || alt.includes('五线谱') || alt.includes('简谱')) score += 100;
        if (alt.includes('歌谱') || alt.includes('曲')) score += 50;
        if (dims.w >= 800 && dims.h >= 600) score += 20;
        
        if (score > 0 && (!bestImg || score > (bestImg.score || 0))) {
          bestImg = { src: dataSrc, score };
        }
      }
      return bestImg?.src || null;
    });
    
    // 下载图片
    let localImage = null;
    if (imgUrl) {
      const imgPath = path.join(PROJECT_DIR, 'public/images', `${song.resource_id}.jpg`);
      try {
        await downloadFile(imgUrl, imgPath);
        localImage = `/images/${song.resource_id}.jpg`;
        console.log(`  ✅ 曲谱图片下载完成`);
      } catch(e) {
        console.log(`  ⚠️ 图片下载失败: ${e.message}`);
      }
    }
    
    return { localAudio, localImage };
  } catch(e) {
    console.log(`  ⚠️ 详情页抓取失败: ${e.message}`);
    return { localAudio: null, localImage: null };
  }
}

async function main() {
  console.log('=== 增量抓取开始 ===\n');
  
  // 读取本地 songs.json
  const songsPath = path.join(PROJECT_DIR, 'data/songs.json');
  const songs = JSON.parse(fs.readFileSync(songsPath, 'utf8'));
  const localIds = new Set(songs.map(s => s.resource_id));
  
  // 找本地最新歌曲时间
  const sortedSongs = [...songs].sort((a,b) => (b.lesson_start_at||'').localeCompare(a.lesson_start_at||''));
  const latestLocalDate = sortedSongs[0]?.lesson_start_at || '0';
  console.log('📋 本地最新歌曲:', sortedSongs[0]?.title, '|', latestLocalDate);
  console.log('📋 本地歌曲总数:', songs.length, '\n');
  
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox','--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', req => {
    if (req.resourceType() === 'image' || req.resourceType() === 'media') req.abort();
    else req.continue();
  });

  // 不需要 cookie（测试确认无需 cookie 也能访问）
  await page.goto(CONFIG.listUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 6000));
  
  // 提取 NUXT 中的歌曲列表（正确路径）
  const nuxtSongs = await page.evaluate(() => {
    const nuxt = window.__NUXT__;
    if (!nuxt || !nuxt.data?.[0]?.componentData?.list) return [];
    return nuxt.data[0].componentData.list.map(item => ({
      resource_id: item.resource_id,
      title: item.title,
      img_url: item.img_url,
      jump_url: item.jump_url,
      src_type: item.src_type,
      price: item.price,
      view_count: item.view_count,
      lesson_start_at: item.lesson_start_at
    }));
  });
  
  console.log('🌐 网站最新歌曲数:', nuxtSongs.length);
  if (nuxtSongs.length > 0) {
    console.log('🌐 网站最新歌曲:', nuxtSongs[0].title, '|', nuxtSongs[0].lesson_start_at, '\n');
  }
  
  // 找出新增的歌曲
  const newSongs = nuxtSongs.filter(s => {
    if (localIds.has(s.resource_id)) return false;
    const sDate = s.lesson_start_at || '0';
    return sDate > latestLocalDate;
  });
  
  console.log('✨ 发现新增歌曲:', newSongs.length, '首\n');
  
  if (newSongs.length === 0) {
    console.log('✅ 没有新增歌曲，数据已是最新！');
    await browser.close();
    return;
  }
  
  newSongs.forEach(s => {
    console.log(`  ➕ ${s.title} | ${s.resource_id} | ${s.lesson_start_at}`);
  });
  console.log('');
  
  // 抓取新增歌曲的详情
  for (const song of newSongs) {
    console.log(`\n🎸 抓取详情: ${song.title}`);
    const { localAudio, localImage } = await crawlDetail(page, song);
    
    // 添加到 songs 数组
    songs.push({
      resource_id: song.resource_id,
      title: song.title,
      img_url: song.img_url,
      localImage: localImage,
      localAudio: localAudio,
      jump_url: song.jump_url,
      src_type: song.src_type,
      price: song.price,
      view_count: song.view_count,
      lesson_start_at: song.lesson_start_at
    });
    
    // 立即保存
    fs.writeFileSync(songsPath, JSON.stringify(songs, null, 2), 'utf8');
    console.log(`  💾 已保存到 songs.json`);
  }
  
  await browser.close();
  
  console.log('\n=== 增量抓取完成 ===');
  console.log('新增:', newSongs.length, '首');
  console.log('本地总数:', songs.length, '首');
}

main().catch(console.error);
