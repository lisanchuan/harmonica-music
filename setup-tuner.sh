#!/bin/bash
# Tuner 部署脚本
# 用法: bash setup-tuner.sh
set -e

cd "$(dirname "$0")"

echo "=== 部署口琴学习机（抓取版）==="

echo ""
echo "=== 1. 重新构建并启动 Docker ==="
docker compose down
docker compose build
docker compose up -d

echo ""
echo "=== 完成 ==="
echo ""
echo "访问地址: http://$(hostname -I 2>/dev/null | awk '{print $1}' || echo 'localhost')/tuner/"
echo ""
echo "文件清单:"
echo "  入口:     public/tuner/index.html"
echo "  核心库:   public/tuner/js/aubio.min.js (音高检测)"
echo "  音色库:   public/tuner/soundfonts/ (Tone.js 口琴音色)"
echo "  应用:     public/tuner/static/js/ (15 个 bundle)"
echo "  API Mock: nginx 直接返回 /tuner/api-mock/*"
echo ""
echo "架构: 浏览器 → nginx:80 → Next.js:3000"
echo "      API 调用被 HTML 内拦截器重定向到 nginx mock"
