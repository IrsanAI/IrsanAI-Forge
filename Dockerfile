# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache bash git && corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS dev
ENV NODE_ENV=development
COPY . .
RUN if [ -f .gitmodules ]; then \
      if [ -d .git ]; then \
        git submodule update --init --recursive; \
      else \
        echo "No .git directory found; cloning submodules from .gitmodules"; \
        git config -f .gitmodules --get-regexp '^submodule\..*\.path$' | while read -r key path; do \
          name="${key#submodule.}"; \
          name="${name%.path}"; \
          url=$(git config -f .gitmodules --get "submodule.${name}.url"); \
          rm -rf "$path"; \
          git clone --depth 1 "$url" "$path"; \
        done; \
      fi; \
    fi
EXPOSE 3000
CMD ["pnpm", "dev", "--hostname", "0.0.0.0", "--port", "3000"]

FROM deps AS builder
ENV NODE_ENV=production
COPY . .
RUN if [ -f .gitmodules ]; then \
      if [ -d .git ]; then \
        git submodule update --init --recursive; \
      else \
        echo "No .git directory found; cloning submodules from .gitmodules"; \
        git config -f .gitmodules --get-regexp '^submodule\..*\.path$' | while read -r key path; do \
          name="${key#submodule.}"; \
          name="${name%.path}"; \
          url=$(git config -f .gitmodules --get "submodule.${name}.url"); \
          rm -rf "$path"; \
          git clone --depth 1 "$url" "$path"; \
        done; \
      fi; \
    fi
RUN pnpm build

FROM node:22-alpine AS production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
