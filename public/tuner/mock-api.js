// 简易 API Mock 服务器
// 用法: node mock-api.js
// 监听 3001 端口，返回静态 JSON，模拟 api.ikouqinke.com

const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Iching-Client, X-Iching-Token, X-Iching-Site');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url.includes('/tenholes/opern/attributes')) {
    const fs = require('fs');
    const data = fs.readFileSync(__dirname + '/data/attributes.json');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ code: 2000, message: 'ok', data: {} }));
  }
});

server.listen(3001, '0.0.0.0', () => {
  console.log('Mock API server running on http://0.0.0.0:3001');
  console.log('Add to /etc/hosts: 127.0.0.1 api.ikouqinke.com');
});
