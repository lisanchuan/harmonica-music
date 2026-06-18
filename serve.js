// 本地调试服务器 - 同时处理 localhost + ikouqinke.com 域名
// 前置条件: echo "127.0.0.1 www.ikouqinke.com api.ikouqinke.com" >> /etc/hosts
// 用法: sudo node serve.js  (需要 sudo 以监听 443)
//       或: node serve.js    (仅 HTTP 8080，需浏览器忽略 HTTPS 重定向)
// 访问: http://localhost:8080/tuner/

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.png': 'image/png',
};

function getFile(reqPath) {
  // /tuner/api-mock/* -> mock
  if (reqPath.startsWith('/tuner/api-mock/')) return null;

  // Map URL to public/ directory
  let filePath = ROOT + '/public' + reqPath.split('?')[0];
  if (filePath.endsWith('/')) filePath += 'index.html';
  return filePath;
}

function handleRequest(req, res) {
  const reqPath = req.url.split('?')[0];

  // API Mock endpoint
  if (reqPath.startsWith('/tuner/api-mock/')) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    });
    if (reqPath.includes('/tenholes/opern/attributes')) {
      res.end(fs.readFileSync(ROOT + '/public/tuner/data/attributes.json'));
    } else {
      res.end('{"code":2000,"message":"ok","data":{}}');
    }
    return;
  }

  const filePath = getFile(reqPath);
  if (!filePath) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Access-Control-Allow-Origin': '*' });
      res.end('Not Found');
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    }
  });
}

// HTTP server on 8080
const httpServer = http.createServer(handleRequest);
httpServer.listen(8080, '0.0.0.0', () => {
  console.log('HTTP:  http://localhost:8080/tuner/');
  console.log('API mock 内置在 /tuner/api-mock/*');
  console.log('');
  console.log('⚠️  页面 JS 会尝试跳转到 https://www.ikouqinke.com/tuner/');
  console.log('   加 hosts 可避免跳转: sudo sh -c "echo \"127.0.0.1 www.ikouqinke.com api.ikouqinke.com\" >> /etc/hosts"');
  console.log('   然后: sudo node serve.js --https');
  console.log('');
  console.log('   或者直接在浏览器中打开后，手动修改地址栏回到 localhost');
});

// HTTPS mode (run with --https flag)
if (process.argv.includes('--https')) {
  // Generate self-signed cert if needed
  const certDir = ROOT + '/certs';
  if (!fs.existsSync(certDir + '/server.key')) {
    const { execSync } = require('child_process');
    fs.mkdirSync(certDir, { recursive: true });
    execSync(`openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
      -keyout "${certDir}/server.key" \
      -out "${certDir}/server.crt" \
      -subj "/CN=localhost" \
      -addext "subjectAltName=DNS:localhost,DNS:www.ikouqinke.com,DNS:api.ikouqinke.com"`,
      { stdio: 'inherit' });
    console.log('证书已生成:', certDir);
  }

  const httpsOptions = {
    key: fs.readFileSync(certDir + '/server.key'),
    cert: fs.readFileSync(certDir + '/server.crt')
  };

  const httpsServer = https.createServer(httpsOptions, handleRequest);
  httpsServer.listen(443, '0.0.0.0', () => {
    console.log('HTTPS: https://www.ikouqinke.com/tuner/');
    console.log('HTTPS: https://api.ikouqinke.com/tenholes/opern/attributes');
    console.log('');
    console.log('⚠️  浏览器会提示证书不受信任，点击"高级→继续访问"即可');
  });
}
