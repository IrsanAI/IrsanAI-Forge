#!/usr/bin/env sh
set -eu

if [ ! -f .gitmodules ]; then
  echo "[submodules] No .gitmodules found. Skipping submodule init."
  exit 0
fi

if [ -d .git ]; then
  echo "[submodules] .git directory found -> git submodule update --init --recursive"
  git submodule update --init --recursive
  exit 0
fi

echo "[submodules] .git directory missing. Falling back to cloning from .gitmodules"

git config -f .gitmodules --get-regexp '^submodule\..*\.path$' | while read -r key path; do
  name="${key#submodule.}"
  name="${name%.path}"
  url=$(git config -f .gitmodules --get "submodule.${name}.url")

  echo "[submodules] cloning ${name} -> ${path}"
  rm -rf "$path"
  git clone --depth 1 "$url" "$path"
done

echo "[submodules] done"
