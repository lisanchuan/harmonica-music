const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 配置
const CONFIG = {
  baseUrl: 'https://www.kouqinke.com',
  audioDir: path.join(__dirname, '..', 'public', 'audio'),
  imageDir: path.join(__dirname, '..', 'public', 'images'),
  cookies: [
    { name: 'pc_user_key', value: '66948fe2adc145b0c2ffc2db1571b4b8', domain: 'www.kouqinke.com' },
    { name: 'anonymous_user_key', value: 'dV9hbm9ueW1vdXNfNjgyY2E1NzJlZGYyOV9QMEE1dEZsM1dl', domain: 'www.kouqinke.com' },
    { name: 'userInfo', value: '%7B%22app_id%22%3A%22appudjxrrsp5317%22%2C%22user_id%22%3A%22u_648d3ada2c34d_lRrZBbs7D4%22%2C%22phone%22%3A%2217705810363%22%2C%22pc_user_key%22%3A%2266948fe2adc145b0c2ffc2db1571b4b8%22%7D', domain: 'www.kouqinke.com' }
  ]
};

// 下载文件
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve(null);
      return;
    }
    console.log(`  📥 下载: ${url.substring(0, 80)}...`);
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
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

async function testSingleSong() {
  console.log('🧪 开始测试单首歌爬取...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // 设置cookie
    console.log('🍪 设置Cookie...');
    for (const cookie of CONFIG.cookies) {
      await page.setCookie({
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain
      });
    }

    const detailUrl = 'https://www.kouqinke.com/detail/a_69d0173ce4b0694c5ba85511/2';
    console.log(`📄 访问详情页: ${detailUrl}`);

    await page.goto(detailUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    console.log('✅ 页面加载完成\n');

    // 获取歌曲标题
    const songTitle = await page.evaluate(() => {
      const h1 = document.querySelector('h1') || document.querySelector('h2') || document.querySelector('h3');
      return h1 ? h1.textContent.trim() : null;
    });
    console.log(`🎵 歌曲标题: ${songTitle}`);

    // 等待图片加载
    console.log('⏳ 等待图片加载...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 1. 查找所有图片 - 检查是否是乐谱
    console.log('🖼️ 查找图片...');
    const imgResult = await page.evaluate(() => {
      const allImgs = document.querySelectorAll('img[data-src]');
      const results = [];

      allImgs.forEach((img, idx) => {
        const dataSrc = img.getAttribute('data-src');
        const alt = img.alt || '';
        const title = img.title || '';
        const width = img.getAttribute('width') || '';
        const naturalWidth = img.naturalWidth || 0;
        const naturalHeight = img.naturalHeight || 0;

        results.push({
          idx,
          src: img.src ? img.src.substring(0, 80) : null,
          dataSrc: dataSrc ? dataSrc.substring(0, 80) : null,
          alt,
          title,
          width,
          naturalSize: `${naturalWidth}x${naturalHeight}`
        });
      });

      return results;
    });

    console.log(`找到 ${imgResult.length} 个带data-src的图片`);
    imgResult.forEach((img, idx) => {
      console.log(`\n  [${idx}] alt: "${img.alt}"`);
      console.log(`      title: "${img.title}"`);
      console.log(`      data-src: ${img.dataSrc}`);
      console.log(`      naturalSize: ${img.naturalSize}`);
    });

    // 2. 分析哪个是乐谱图片
    console.log('\n🔍 分析乐谱图片...');
    const sheetResult = await page.evaluate((title) => {
      const allImgs = document.querySelectorAll('img[data-src]');
      let bestSheet = null;
      let bestScore = 0;

      allImgs.forEach((img, idx) => {
        const dataSrc = img.getAttribute('data-src');
        const alt = (img.alt || '').toLowerCase();
        const titleLower = (title || '').toLowerCase();

        let score = 0;

        // 检查是否是曲谱/乐谱相关
        if (alt.includes('曲谱') || alt.includes('乐谱') || alt.includes('五线谱') || alt.includes('简谱')) {
          score += 10;
        }

        // 检查是否包含歌曲名
        if (titleLower && alt.includes(titleLower.split('')[0])) {
          score += 5;
        }

        // 检查图片尺寸（曲谱通常比较大）
        const naturalWidth = img.naturalWidth || 0;
        const naturalHeight = img.naturalHeight || 0;
        if (naturalWidth > 500 && naturalHeight > 500) {
          score += 3;
        }

        // 检查是否是wechatapppro CDN
        if (dataSrc && dataSrc.includes('wechatapppro')) {
          score += 2;
        }

        // 排除头像等小图
        if (naturalWidth < 200 || naturalHeight < 200) {
          score = 0;
        }

        console.log(`  [${idx}] score=${score}, alt="${img.alt}", size=${naturalWidth}x${naturalHeight}`);

        if (score > bestScore) {
          bestScore = score;
          bestSheet = dataSrc;
        }
      });

      return { bestSheet, bestScore };
    }, songTitle);

    console.log(`\n✅ 最佳乐谱图片 (score=${sheetResult.bestScore}):`);
    console.log(`   ${sheetResult.bestSheet}`);

    // 下载正确的乐谱图片
    if (sheetResult.bestSheet) {
      console.log('\n📥 下载正确的乐谱图片...');
      const imgPath = path.join(CONFIG.imageDir, 'test_sheet.jpg');
      try {
        await downloadFile(sheetResult.bestSheet, imgPath);
        const stat = fs.statSync(imgPath);
        console.log(`  ✅ 乐谱图片下载成功！文件大小: ${(stat.size / 1024).toFixed(2)} KB`);
      } catch (e) {
        console.log(`  ❌ 下载失败: ${e.message}`);
      }
    }

    console.log('\n✅ 测试完成');

  } catch (error) {
    console.error('❌ 测试失败:', error);
  } finally {
    await browser.close();
  }
}

testSingleSong().catch(console.error);
