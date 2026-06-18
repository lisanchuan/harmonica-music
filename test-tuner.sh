#!/bin/bash
# 本地测试 tuner - 使用 Chrome host-rules 重定向域名，无需改 /etc/hosts
set -e
cd "$(dirname "$0")"

echo "=== 启动本地 tuner 测试 ==="

# 1. 启动 Node.js 服务器（后台运行）
echo ""
echo "[1/3] 启动测试服务器..."
node serve.js &
SERVER_PID=$!
sleep 1

# 2. 检查服务器是否启动
if ! curl -s -o /dev/null http://localhost:8080/tuner/; then
  echo "服务器启动失败"
  kill $SERVER_PID 2>/dev/null
  exit 1
fi
echo "      服务器已启动: http://localhost:8080/tuner/"

# 3. 启动 Chrome
echo ""
echo "[2/3] 启动 Chrome（使用 host-rules 重定向域名）..."
echo "      规则: www.ikouqinke.com → localhost:8080"
echo "            api.ikouqinke.com → localhost:8080"
echo ""

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -f "$CHROME" ]; then
  CHROME="google-chrome"
fi

"$CHROME" \
  --user-data-dir="/tmp/chrome-tuner-test" \
  --host-rules="MAP www.ikouqinke.com 127.0.0.1:8080, MAP api.ikouqinke.com 127.0.0.1:8080" \
  --ignore-certificate-errors \
  --allow-insecure-localhost \
  "http://localhost:8080/tuner/" &
CHROME_PID=$!

echo "[3/3] Chrome 已启动，PID: $CHROME_PID"
echo ""
echo "=== 测试地址 ==="
echo "  直接访问: http://localhost:8080/tuner/"
echo "  (JS 会自动跳转到 www.ikouqinke.com，host-rules 会将其重定向到本地)"
echo ""
echo "停止测试: kill $SERVER_PID $CHROME_PID"
echo "         按 Ctrl+C 停止服务器"

# 等待 Chrome 退出
wait $CHROME_PID 2>/dev/null
echo "Chrome 已关闭，停止服务器..."
kill $SERVER_PID 2>/dev/null
