#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CACHE_ROOT="${HARMONICA_BUILD_CACHE:-$HOME/Library/Caches/harmonica-music}"
LOCAL_MODULES="${HARMONICA_NODE_MODULES:-$(readlink "$PROJECT_ROOT/node_modules" 2>/dev/null || true)}"

if [[ -z "$LOCAL_MODULES" || ! -x "$LOCAL_MODULES/.bin/next" ]]; then
  echo "Missing local dependency cache. Set HARMONICA_NODE_MODULES to a complete node_modules directory." >&2
  exit 1
fi

mkdir -p "$CACHE_ROOT"
rsync -a --delete \
  --exclude='.git' --exclude='.next' --exclude='node_modules' \
  --exclude='_migration_backups' --exclude='public/audio' --exclude='public/images' \
  "$PROJECT_ROOT/" "$CACHE_ROOT/"

if [[ -L "$CACHE_ROOT/node_modules" || ! -x "$CACHE_ROOT/node_modules/.bin/next" ]]; then
  rm -rf "$CACHE_ROOT/node_modules"
  cp -cR "$LOCAL_MODULES" "$CACHE_ROOT/node_modules"
fi
rm -rf "$CACHE_ROOT/public/audio" "$CACHE_ROOT/public/images"
mkdir -p "$CACHE_ROOT/public"
ln -s "$PROJECT_ROOT/public/audio" "$CACHE_ROOT/public/audio"
ln -s "$PROJECT_ROOT/public/images" "$CACHE_ROOT/public/images"

cd "$CACHE_ROOT"
rm -rf "$CACHE_ROOT/.next"
HARMONICA_LIBRARY_DIR="$PROJECT_ROOT" node_modules/.bin/next build --webpack

rm -rf "$CACHE_ROOT/.next/standalone/public" "$CACHE_ROOT/.next/standalone/.next/static"
ln -s "$PROJECT_ROOT/public" "$CACHE_ROOT/.next/standalone/public"
mkdir -p "$CACHE_ROOT/.next/standalone/.next"
ln -s "$CACHE_ROOT/.next/static" "$CACHE_ROOT/.next/standalone/.next/static"
