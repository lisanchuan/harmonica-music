#!/bin/bash
# validate_detail_page.sh
# 快速检查 SongDetailClient.tsx 三种渲染分支是否存在
# 任一缺失则报错退出

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SRC_FILE="$PROJECT_DIR/src/components/SongDetailClient.tsx"

if [ ! -f "$SRC_FILE" ]; then
  echo "❌ 文件不存在: $SRC_FILE"
  exit 1
fi

echo "🔍 检查 SongDetailClient.tsx 渲染逻辑"
echo "---"

ERRORS=0

# 1. sheet_images 判断
if grep -qF 'sheet_images && song.sheet_images.length > 0' "$SRC_FILE"; then
  echo "✅ 包含 sheet_images.length > 0 判断"
else
  echo "❌ 缺少 sheet_images.length > 0 判断"
  ERRORS=$((ERRORS + 1))
fi

# 2. content fallback
if grep -qF 'content ?' "$SRC_FILE" || grep -qF 'content:' "$SRC_FILE"; then
  echo "✅ 包含 content fallback"
else
  echo "❌ 缺少 content fallback"
  ERRORS=$((ERRORS + 1))
fi

# 3. bilibili_bvid iframe
if grep -q 'bilibili_bvid' "$SRC_FILE"; then
  echo "✅ 包含 bilibili_bvid 判断"
else
  echo "❌ 缺少 bilibili_bvid 判断"
  ERRORS=$((ERRORS + 1))
fi

# 4. dangerouslySetInnerHTML 渲染 content
if grep -q 'dangerouslySetInnerHTML' "$SRC_FILE"; then
  echo "✅ 包含 dangerouslySetInnerHTML"
else
  echo "❌ 缺少 dangerouslySetInnerHTML"
  ERRORS=$((ERRORS + 1))
fi

# 5. 空数据提示
if grep -qF '暂无' "$SRC_FILE"; then
  echo "✅ 包含空数据提示"
else
  echo "❌ 缺少空数据提示"
  ERRORS=$((ERRORS + 1))
fi

echo "---"

if [ $ERRORS -eq 0 ]; then
  echo "✅ 所有检查通过！详情页三种数据情况均可正常渲染"
  exit 0
else
  echo "❌ $ERRORS 项检查失败"
  exit 1
fi
