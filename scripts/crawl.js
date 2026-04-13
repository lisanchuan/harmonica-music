const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 配置
const CONFIG = {
  baseUrl: 'https://www.kouqinke.com',
  listUrl: 'https://www.kouqinke.com/all/14488941/27084727',
  outputDir: path.join(__dirname, '..', 'data'),
  audioDir: path.join(__dirname, '..', 'public', 'audio'),
  imageDir: path.join(__dirname, '..', 'public', 'images'),
  cookies: [
    { name: 'pc_user_key', value: '66948fe2adc145b0c2ffc2db1571b4b8', domain: 'www.kouqinke.com' },
    { name: 'anonymous_user_key', value: 'dV9hbm9ueW1vdXNfNjgyY2E1NzJlZGYyOV9QMEE1dEZsM1dl', domain: 'www.kouqinke.com' },
    { name: 'userInfo', value: '%7B%22app_id%22%3A%22appudjxrrsp5317%22%2C%22user_id%22%3A%22u_648d3ada2c34d_lRrZBbs7D4%22%2C%22phone%22%3A%2217705810363%22%2C%22pc_user_key%22%3A%2266948fe2adc145b0c2ffc2db1571b4b8%22%7D', domain: 'www.kouqinke.com' }
  ]
};

// 解析命令行参数
const args = process.argv.slice(2);
const mode = args.find(arg => arg.startsWith('--mode='))?.split('=')[1] || 'default';

// 确保目录存在
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 下载文件
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve(null);
      return;
    }

    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// 从__NUXT__中提取数据
function extractNuxtData(page) {
  return page.evaluate(() => {
    const nuxtData = window.__NUXT__;
    if (!nuxtData) return null;

    let songs = [];

    if (nuxtData.layout) {
      songs = nuxtData.layout.$refs?.resources || [];
    }

    if (!songs.length && nuxtData.page && nuxtData.page.$refs?.resources) {
      songs = nuxtData.page.$refs.resources;
    }

    if (!songs.length) {
      const searchObj = (obj) => {
        if (!obj || typeof obj !== 'object') return;
        if (Array.isArray(obj) && obj.length > 0 && obj[0]?.title) {
          songs = obj;
          return;
        }
        for (const key in obj) {
          if (Array.isArray(obj[key]) && obj[key].length > 0 && obj[key][0]?.title) {
            songs = obj[key];
            return;
          }
          if (typeof obj[key] === 'object') {
            searchObj(obj[key]);
          }
        }
      };
      searchObj(nuxtData);
    }

    return songs;
  });
}

// 点击"加载更多"按钮
async function clickLoadMore(page) {
  return await page.evaluate(() => {
    let loadMoreBtn = null;

    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      const text = btn.textContent?.trim() || '';
      if (text.includes('加载更多') || text.includes('more')) {
        loadMoreBtn = btn;
        break;
      }
    }

    if (!loadMoreBtn) {
      const allElements = document.querySelectorAll('[class]');
      for (const el of allElements) {
        const className = el.className || '';
        if (typeof className === 'string' && className.includes('more')) {
          loadMoreBtn = el;
          break;
        }
      }
    }

    if (loadMoreBtn && !loadMoreBtn.disabled) {
      loadMoreBtn.click();
      return true;
    }
    return false;
  });
}

// 处理单首歌：下载 demo + 图片
async function processSong(page, song) {
  try {
    const localDemoPath = path.join(CONFIG.audioDir, `${song.resource_id}_demo.mp3`);
    const localImagePath = path.join(CONFIG.imageDir, `${song.resource_id}.jpg`);

    // 检查是否已存在
    const demoExists = fs.existsSync(localDemoPath) ||
      (song.localAudio && fs.existsSync(path.join(process.cwd(), 'public', song.localAudio.replace(/^\//, ''))));
    const imageExists = fs.existsSync(localImagePath) ||
      (song.localImage && fs.existsSync(path.join(process.cwd(), 'public', song.localImage.replace(/^\//, ''))));

    let localAudio = song.localAudio || null;
    let localImage = song.localImage || null;

    // 访问详情页
    const detailUrl = song.jump_url || `${CONFIG.baseUrl}/detail/${song.resource_id}/2`;
    await page.goto(detailUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 获取 demo 音频
    if (!demoExists) {
      const demoAudio = await page.evaluate(() => {
        const audios = document.querySelectorAll('audio');
        for (const audio of audios) {
          const src = audio.querySelector('source')?.src || audio.src;
          if (src && !src.includes('blank') && !src.includes('null') && !src.includes('javascript')) {
            const parent = audio.closest('[class]') || audio.parentElement;
            const parentText = parent?.innerText || '';
            const isAccompaniment = parentText.includes('伴奏') || audio.closest('.accompaniment') || audio.closest('[class*="accom"]');
            if (!isAccompaniment) {
              return src;
            }
          }
        }
        return null;
      });

      if (demoAudio) {
        try {
          await downloadFile(demoAudio, localDemoPath);
          localAudio = `/audio/${song.resource_id}_demo.mp3`;
          console.log(`  ✅ demo下载完成`);
        } catch (e) {
          console.log(`  ⚠️ demo下载失败: ${e.message}`);
        }
      }
    } else {
      console.log(`  ⏭️ demo已存在，跳过`);
      localAudio = song.localAudio || `/audio/${song.resource_id}_demo.mp3`;
    }

    // 下载图片
    if (!imageExists) {
      const correctImgUrl = await page.evaluate(async () => {
        const allImgs = document.querySelectorAll('img[data-src]');
        let bestImg = null;
        let bestScore = 0;

        for (const img of allImgs) {
          const dataSrc = img.getAttribute('data-src');
          const alt = (img.alt || '').toLowerCase();

          const dims = await new Promise((resolve) => {
            const testImg = new Image();
            testImg.onload = () => resolve({ w: testImg.naturalWidth, h: testImg.naturalHeight });
            testImg.onerror = () => resolve({ w: 0, h: 0 });
            testImg.src = dataSrc;
          });

          const naturalWidth = dims.w;
          const naturalHeight = dims.h;

          let score = 0;

          if (alt.includes('曲谱') || alt.includes('乐谱') || alt.includes('五线谱') || alt.includes('简谱')) {
            score += 10;
          }
          if (naturalWidth > 500 && naturalHeight > 500) {
            score += 3;
          }
          if (dataSrc && dataSrc.includes('wechatapppro')) {
            score += 2;
          }
          if (naturalWidth < 200 || naturalHeight < 200) {
            score = 0;
          }

          if (score > bestScore) {
            bestScore = score;
            bestImg = dataSrc;
          }
        }

        return bestImg;
      });

      if (correctImgUrl) {
        try {
          await downloadFile(correctImgUrl, localImagePath);
          localImage = `/images/${song.resource_id}.jpg`;
          console.log(`  ✅ 图片下载完成`);
        } catch (e) {
          console.log(`  ⚠️ 图片下载失败: ${e.message}`);
        }
      }
    } else {
      console.log(`  ⏭️ 图片已存在，跳过`);
      localImage = song.localImage || `/images/${song.resource_id}.jpg`;
    }

    return {
      localAudio,
      localImage
    };
  } catch (e) {
    console.log(`  ⚠️ 处理失败: ${e.message}`);
    return null;
  }
}

// 处理单首歌的伴奏下载
async function processSongAccompaniment(page, song) {
  try {
    const localAccompanimentPath = path.join(CONFIG.audioDir, `${song.resource_id}_accompaniment.mp3`);

    // 检查本地文件是否已存在
    if (fs.existsSync(localAccompanimentPath)) {
      console.log(`  ⏭️ 伴奏已存在，跳过`);
      return { localAccompaniment: `/audio/${song.resource_id}_accompaniment.mp3`, skipped: true };
    }

    // 检查 songs.json 中的记录
    if (song.localAccompaniment) {
      const fullPath = path.join(process.cwd(), 'public', song.localAccompaniment.replace(/^\//, ''));
      if (fs.existsSync(fullPath)) {
        console.log(`  ⏭️ 伴奏已存在(songs.json记录)，跳过`);
        return { localAccompaniment: song.localAccompaniment, skipped: true };
      }
    }

    // 访问详情页
    const detailUrl = song.jump_url || `${CONFIG.baseUrl}/detail/${song.resource_id}/2`;
    console.log(`  访问: ${detailUrl}`);
    await page.goto(detailUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 5000)); // 等待 iframe 加载

    // 获取页面信息用于调试
    const pageInfo = await page.evaluate(() => {
      const iframe = document.querySelector('iframe.xiaoe-iframe-audio');
      const allIframes = document.querySelectorAll('iframe');
      const iframeCount = allIframes.length;

      let iframeInfo = 'none';
      if (iframe) {
        iframeInfo = iframe.src || 'no src';
      }

      return {
        iframeCount,
        iframeClassName: iframe?.className,
        iframeSrc: iframeInfo,
        pageUrl: window.location.href
      };
    });

    console.log(`  [DEBUG] 页面URL: ${pageInfo.pageUrl}`);
    console.log(`  [DEBUG] iframe数量: ${pageInfo.iframeCount}`);
    console.log(`  [DEBUG] iframe class: ${pageInfo.iframeClassName}`);
    console.log(`  [DEBUG] iframe src: ${pageInfo.iframeSrc}`);

    // 获取 iframe 中的伴奏 URL
    const audioInfo = await page.evaluate(() => {
      const iframe = document.querySelector('iframe.xiaoe-iframe-audio');
      if (!iframe) return { error: 'no iframe' };

      const iframeSrc = iframe.src;
      const idMatch = iframeSrc.match(/[?&]id=([A-Za-z0-9_-]+)/);
      if (!idMatch) return { error: 'no id match', iframeSrc };

      return {
        resourceId: idMatch[1],
        iframeSrc: iframeSrc
      };
    });

    console.log(`  [DEBUG] audioInfo:`, JSON.stringify(audioInfo));

    if (audioInfo.error) {
      console.log(`  ⚠️ ${audioInfo.error}`);
      if (audioInfo.iframeSrc) console.log(`  [DEBUG] iframeSrc: ${audioInfo.iframeSrc}`);
      return { localAccompaniment: null, skipped: false };
    }

    // 在主进程调用API
    const apiUrl = 'https://iframe.xiaoeknow.com/api/richtext/get_audio_data?app_id=appudjxrrsp5317';
    console.log(`  [DEBUG] 调用API: ${apiUrl}`);
    console.log(`  [DEBUG] resourceId: ${audioInfo.resourceId}`);

    let apiResponse;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: [audioInfo.resourceId] })
      });
      apiResponse = await response.json();
      console.log(`  [DEBUG] API响应:`, JSON.stringify(apiResponse).substring(0, 300));
    } catch (e) {
      console.log(`  ⚠️ API调用失败: ${e.message}`);
      return { localAccompaniment: null, skipped: false };
    }

    const idKey = Object.keys(apiResponse.data || {})[0];
    if (!idKey) {
      console.log(`  ⚠️ API响应中没有idKey`);
      return { localAccompaniment: null, skipped: false };
    }

    const audioData = apiResponse.data[idKey];
    console.log(`  [DEBUG] audioData:`, JSON.stringify(audioData).substring(0, 200));

    if (!audioData) {
      console.log(`  ⚠️ 无法获取音频数据`);
      return { localAccompaniment: null, skipped: false };
    }

    // 验证是伴奏
    if (!audioData.audio_title?.includes('伴奏')) {
      console.log(`  ⚠️ 不是伴奏: ${audioData.audio_title}`);
      return { localAccompaniment: null, skipped: false };
    }

    const audioUrl = audioData.file_url;
    if (!audioUrl) {
      console.log(`  ⚠️ 没有file_url`);
      return { localAccompaniment: null, skipped: false };
    }

    console.log(`  [DEBUG] 伴奏URL: ${audioUrl}`);

    // 下载伴奏
    try {
      console.log(`  下载: ${audioUrl}`);
      await downloadFile(audioUrl, localAccompanimentPath);
      const localAccompaniment = `/audio/${song.resource_id}_accompaniment.mp3`;
      console.log(`  ✅ 伴奏下载完成`);
      return { localAccompaniment, skipped: false };
    } catch (e) {
      console.log(`  ⚠️ 伴奏下载失败: ${e.message}`);
      return { localAccompaniment: null, skipped: false };
    }
  } catch (e) {
    console.log(`  ⚠️ 处理失败: ${e.message}`);
    return { localAccompaniment: null, skipped: false };
  }
}

// 主爬取函数（demo + 图片）
async function crawl() {
  console.log('🚀 开始爬取数据（demo + 图片）...');

  ensureDir(CONFIG.outputDir);
  ensureDir(CONFIG.audioDir);
  ensureDir(CONFIG.imageDir);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    if (CONFIG.cookies.length > 0) {
      await page.setCookie(...CONFIG.cookies);
      console.log('✅ Cookie已设置');
    }

    console.log('📄 访问列表页...');
    await page.goto(CONFIG.listUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 3000));

    let allSongs = [];
    let processedIds = new Set();
    let pageNum = 1;
    let totalProcessed = 0;
    const maxPages = 100;

    // 加载已有数据
    const songsFile = path.join(CONFIG.outputDir, 'songs.json');
    if (fs.existsSync(songsFile)) {
      try {
        const existingData = JSON.parse(fs.readFileSync(songsFile, 'utf8'));
        existingData.forEach(s => {
          if (!allSongs.find(existing => existing.resource_id === s.resource_id)) {
            allSongs.push(s);
            processedIds.add(s.resource_id);
          }
        });
        console.log(`📂 已加载 ${existingData.length} 首已有歌曲数据`);
      } catch (e) {
        console.log('⚠️ 读取已有数据失败');
      }
    }

    while (true) {
      console.log(`\n📄 第 ${pageNum} 页数据加载中...`);
      const songs = await extractNuxtData(page);

      if (!songs || songs.length === 0) {
        console.log('  ⚠️ 本页没有数据');
        break;
      }

      const newSongs = songs.filter(s => !processedIds.has(s.resource_id));
      console.log(`  ✅ 本页共有 ${songs.length} 首歌曲，其中 ${newSongs.length} 首待处理`);

      if (newSongs.length === 0) {
        console.log('  ⚠️ 本页没有新歌曲可处理');
      }

      // 处理新歌曲
      for (let i = 0; i < newSongs.length; i++) {
        const song = newSongs[i];
        totalProcessed++;
        console.log(`\n📥 [${totalProcessed}] 处理: ${song.title}`);

        const result = await processSong(page, song);

        // 更新 songs.json
        const existingIndex = allSongs.findIndex(s => s.resource_id === song.resource_id);
        const songData = existingIndex >= 0 ? allSongs[existingIndex] : { ...song };

        if (result) {
          if (result.localAudio) songData.localAudio = result.localAudio;
          if (result.localImage) songData.localImage = result.localImage;
        }

        if (existingIndex >= 0) {
          allSongs[existingIndex] = songData;
        } else {
          allSongs.push(songData);
        }
        processedIds.add(song.resource_id);

        // 每处理完一首保存一次
        fs.writeFileSync(songsFile, JSON.stringify(allSongs, null, 2));
      }

      // 尝试加载更多（持续尝试直到按钮不可用）
      console.log('\n🔄 尝试加载更多...');
      let loadMoreSuccess = false;
      let consecutiveNoNewData = 0;

      while (pageNum < maxPages) {
        const canLoadMore = await clickLoadMore(page);

        if (!canLoadMore) {
          console.log('  ⚠️ 未找到"加载更多"按钮，停止');
          break;
        }

        // 等待新数据加载
        await new Promise(resolve => setTimeout(resolve, 3000));

        const nextSongs = await extractNuxtData(page);
        const nextNewIds = nextSongs?.filter(s => !processedIds.has(s.resource_id)).map(s => s.resource_id) || [];

        if (nextNewIds.length > 0) {
          console.log(`  ✅ 第 ${pageNum} 页加载成功，新增 ${nextNewIds.length} 首歌曲`);
          pageNum++;
          loadMoreSuccess = true;
          consecutiveNoNewData = 0;
        } else {
          consecutiveNoNewData++;
          if (consecutiveNoNewData >= 3) {
            console.log('  ⚠️ 连续3次没有新数据，停止加载');
            break;
          }
          console.log(`  ⚠️ 本次加载没有新数据 (${consecutiveNoNewData}/3)，重试...`);
        }
      }

      if (pageNum >= maxPages) {
        console.log('  ⚠️ 已达到最大页数限制');
      }

      if (!loadMoreSuccess) {
        console.log('  ⚠️ 无法加载更多数据');
      }
    }

    console.log(`\n🎉 完成！共处理 ${totalProcessed} 首新歌曲，总计 ${allSongs.length} 首`);

    fs.writeFileSync(songsFile, JSON.stringify(allSongs, null, 2));
    console.log(`💾 数据已保存到 ${songsFile}`);

  } catch (error) {
    console.error('❌ 爬取失败:', error);
  } finally {
    await browser.close();
  }
}

// 伴奏下载函数
async function crawlAccompaniment() {
  console.log('🚀 开始下载伴奏...');

  ensureDir(CONFIG.outputDir);
  ensureDir(CONFIG.audioDir);

  const songsFile = path.join(CONFIG.outputDir, 'songs.json');
  if (!fs.existsSync(songsFile)) {
    console.error('❌ songs.json 不存在，请先运行 demo+图片下载');
    return;
  }

  const songs = JSON.parse(fs.readFileSync(songsFile, 'utf8'));

  // 第一步：扫描本地音频目录，查找已有的伴奏文件
  console.log('📂 扫描本地伴奏文件...');
  const existingAccompaniments = new Set();
  const audioFiles = fs.readdirSync(CONFIG.audioDir);
  for (const file of audioFiles) {
    if (file.endsWith('_accompaniment.mp3')) {
      const resourceId = file.replace('_accompaniment.mp3', '');
      existingAccompaniments.add(resourceId);
    }
  }
  console.log(`   发现 ${existingAccompaniments.size} 个本地伴奏文件`);

  // 更新 songs.json 中的 localAccompaniment 字段
  let updatedCount = 0;
  songs.forEach(song => {
    if (!song.localAccompaniment && existingAccompaniments.has(song.resource_id)) {
      song.localAccompaniment = `/audio/${song.resource_id}_accompaniment.mp3`;
      updatedCount++;
    }
  });
  if (updatedCount > 0) {
    fs.writeFileSync(songsFile, JSON.stringify(songs, null, 2));
    console.log(`   更新了 ${updatedCount} 首歌曲的 localAccompaniment 字段`);
  }

  // 第二步：筛选出没有伴奏的歌曲
  const songsWithoutAccompaniment = songs.filter(song => {
    if (!song.localAccompaniment) return true;
    const fullPath = path.join(process.cwd(), 'public', song.localAccompaniment.replace(/^\//, ''));
    return !fs.existsSync(fullPath);
  });

  console.log(`📂 总共 ${songs.length} 首歌曲，其中 ${songsWithoutAccompaniment.length} 首缺少伴奏`);

  if (songsWithoutAccompaniment.length === 0) {
    console.log('✅ 所有歌曲都已下载伴奏');
    return;
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let totalProcessed = 0;
  let totalSuccess = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    if (CONFIG.cookies.length > 0) {
      await page.setCookie(...CONFIG.cookies);
      console.log('✅ Cookie已设置');
    }

    for (const song of songsWithoutAccompaniment) {
      totalProcessed++;
      console.log(`\n📥 [${totalProcessed}/${songsWithoutAccompaniment.length}] 处理: ${song.title}`);

      const result = await processSongAccompaniment(page, song);

      // 更新 songs.json
      if (result.localAccompaniment && !result.skipped) {
        const songIndex = songs.findIndex(s => s.resource_id === song.resource_id);
        if (songIndex >= 0) {
          songs[songIndex].localAccompaniment = result.localAccompaniment;
        }
        fs.writeFileSync(songsFile, JSON.stringify(songs, null, 2));
        totalSuccess++;
      } else if (result.skipped) {
        totalSkipped++;
      } else {
        totalFailed++;
      }

      // 避免请求过快
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`\n🎉 完成！`);
    console.log(`  ✅ 成功: ${totalSuccess}`);
    console.log(`  ⏭️ 跳过: ${totalSkipped}`);
    console.log(`  ❌ 失败: ${totalFailed}`);
    console.log(`💾 数据已保存到 ${songsFile}`);

  } catch (error) {
    console.error('❌ 伴奏下载失败:', error);
  } finally {
    await browser.close();
  }
}

// 根据模式运行
if (mode === 'accompaniment') {
  crawlAccompaniment().catch(console.error);
} else {
  crawl().catch(console.error);
}