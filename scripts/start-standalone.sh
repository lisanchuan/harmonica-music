#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export HARMONICA_LIBRARY_DIR="${HARMONICA_LIBRARY_DIR:-$PROJECT_ROOT}"
export HOSTNAME="${HARMONICA_HOST:-0.0.0.0}"
export PORT="${PORT:-3000}"

exec node "$PROJECT_ROOT/.next/standalone/server.js"
