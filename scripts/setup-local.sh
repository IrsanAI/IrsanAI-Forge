#!/usr/bin/env sh
set -eu

echo "[setup] IrsanAI Forge bootstrap (MetaFlow Guard mode)"

if command -v corepack >/dev/null 2>&1; then
  corepack enable || true
  corepack prepare pnpm@latest --activate || true
fi

if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "[setup] .env.local created from .env.example"
else
  echo "[setup] .env.local already exists"
fi

pnpm install

if [ -f .gitmodules ]; then
  ./scripts/init-submodules.sh || true
fi

warn_placeholder() {
  key="$1"
  if grep -q "^${key}=replace" .env.local 2>/dev/null || grep -q "^${key}=your_" .env.local 2>/dev/null; then
    echo "[setup][warn] ${key} still has a placeholder value"
  fi
}

warn_placeholder "NEXTAUTH_SECRET"
warn_placeholder "AUTH_SECRET"
warn_placeholder "GITHUB_ID"
warn_placeholder "GITHUB_SECRET"

echo "[setup] Generate secret with: pnpm auth:secret"
echo "[setup] Next actions:"
echo "  1) Configure OAuth values in .env.local (README -> OAuth Setup)"
echo "  2) Start app: pnpm dev"
