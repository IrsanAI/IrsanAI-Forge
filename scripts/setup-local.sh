#!/usr/bin/env sh
set -eu

echo "[setup] IrsanAI Forge local bootstrap"

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

echo "[setup] Generate secret with: pnpm auth:secret"
echo "[setup] Then start with: pnpm dev"
