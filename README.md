# IrsanAI Forge

Resonance-Powered GitHub Forge – Sync Repo → NTF-Intent → LRP-Prompt → optional RP-v1.0 Boost → Open in Grok/Claude/Gemini.

## Quickstart (recommended)

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## WHO AM I? (Setup by environment)

Choose your environment and run the matching steps.

### 1) Windows User (PowerShell / CMD)

If `pnpm` is not recognized (like your PyCharm log), enable it via **Corepack** first:

```powershell
node -v
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
pnpm install
pnpm dev
```

If `corepack` is not available, install a newer Node.js LTS (>= 20) and retry.

### 2) PyCharm User (Windows/macOS/Linux)

PyCharm works fine, but its terminal only uses tools already available in your OS PATH.
A Python `.venv` does **not** install pnpm automatically.

Recommended PyCharm flow:

1. Open PyCharm Terminal.
2. Verify Node and Corepack:
   ```bash
   node -v
   corepack enable
   corepack prepare pnpm@latest --activate
   pnpm -v
   ```
3. Then run:
   ```bash
   pnpm install
   pnpm dev
   ```

PyCharm settings tip:
- **Settings → Tools → Terminal**
- Use your normal shell (`powershell.exe`, `cmd.exe`, or `bash`) and make sure Node install path is accessible.

### 3) macOS / Linux User

```bash
node -v
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
pnpm install
pnpm dev
```

### 4) Smartphone / Tablet User

Active local development is **not recommended** on mobile-only environments.
Use one of:
- GitHub Codespaces
- Remote dev server / VPS
- Desktop/laptop with Node.js + pnpm

---

## Fallback if pnpm is blocked

If company policies or environment restrictions block pnpm, you can still run locally with npm:

```bash
npm install
npm run dev
```

> Note: the project standard remains **pnpm** for lockfile consistency.

---

## Required Versions

- Node.js: **>= 20**
- pnpm: **latest via Corepack recommended**

---

## Current MVP Features

- GitHub OAuth via NextAuth (resilient runtime fallback).
- Intent Studio UI with NTF textarea, confidence progress, LRP/RP buttons.
- Repository Sync section (after login) with selectable GitHub repos and local sync state.

## Repo Sync Flow (MVP)

1. Login with GitHub.
2. Open **Sync Repository** section.
3. Select one of your repositories.
4. Click **Sync this repo to Forge**.
5. Forge stores the selection in localStorage and confirms sync success.

## LOP (Endnote – priorisiert)

1. **P1 – Repo Sync + Intent Binding**: ✅ **100%**
   - Repositories can be loaded after GitHub login.
   - Selected repository can be synced and persisted locally (MVP).
2. **P2 – LRP Generation Pipeline**: 🟡 **35%**
   - UI is in place; backend orchestration still pending.
3. **P3 – RP-v1.0 Boost Integration**: 🟡 **20%**
   - UX entry points exist; integration logic is pending.
4. **P4 – One-click Open in Grok/Claude/Gemini**: 🟡 **30%**
   - Buttons exist in UI; dynamic prompt handoff is pending.
