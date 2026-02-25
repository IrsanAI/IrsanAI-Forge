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

## Docker Quickstart (empfohlen für 1-Klick-Setup)

```bash
cp .env.example .env.local  # falls vorhanden, sonst .env.local manuell anlegen
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000).

Stoppen:

```bash
docker compose down
```

Für ein Production-Image:

```bash
docker compose --profile prod up --build
```

---

## WHO AM I? (Setup by environment)

Choose your environment and run the matching steps.

### 1) Windows User (PowerShell / CMD)

If `pnpm` is not recognized, follow this **predictive order**:

#### Path A — Corepack works (normal case)

```powershell
node -v
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
pnpm install
pnpm dev
```

#### Path B — Corepack fails with `EPERM` on `C:\Program Files\nodejs\pnpm`

This means your shell cannot write into the Node.js install directory (missing admin rights).

Use **Corepack without global enable** (no Program Files write required):

```powershell
node -v
corepack prepare pnpm@latest --activate
corepack pnpm -v
corepack pnpm install
corepack pnpm dev
```

If `corepack pnpm ...` still fails, use the **no-install fallback**:

```powershell
npx pnpm@latest -v
npx pnpm@latest install
npx pnpm@latest dev
```

#### Path C — Last fallback (npm)

```powershell
npm install
npm run dev
```

> Repo-standard remains pnpm, but npm is valid when corporate/device permissions block pnpm bootstrap.

### 2) PyCharm User (Windows/macOS/Linux)

PyCharm works fine, but its terminal only sees tools that already exist in your OS `PATH`.
A Python `.venv` does **not** install pnpm.

#### Recommended PyCharm flow

1. Open **PyCharm Terminal** in the project root.
2. Check runtime:
   ```bash
   node -v
   ```
3. Try standard pnpm bootstrap:
   ```bash
   corepack enable
   corepack prepare pnpm@latest --activate
   pnpm -v
   ```
4. If you get Windows `EPERM` (Program Files), switch immediately to:
   ```bash
   corepack pnpm -v
   corepack pnpm install
   corepack pnpm dev
   ```
5. If that also fails, use:
   ```bash
   npx pnpm@latest install
   npx pnpm@latest dev
   ```

#### PyCharm terminal settings (important)

- **Settings → Tools → Terminal**
- Shell path should be a real system shell (`powershell.exe`, `cmd.exe`, `bash`) 
- Restart PyCharm after Node/Corepack changes so PATH refreshes in terminal sessions.

### 3) macOS / Linux User

```bash
node -v
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
pnpm install
pnpm dev
```

If your shell has permission constraints, use:

```bash
corepack pnpm install
corepack pnpm dev
```

or

```bash
npx pnpm@latest install
npx pnpm@latest dev
```

### 4) Smartphone / Tablet User

Active local development is **not recommended** on mobile-only environments.
Use one of:
- GitHub Codespaces
- Remote dev server / VPS
- Desktop/laptop with Node.js + pnpm

---

## Fallback if pnpm is blocked

If company policies or environment restrictions block pnpm entirely, you can still run locally with npm:

```bash
npm install
npm run dev
```

---

## Required Versions

- Node.js: **>= 20**
- pnpm: **latest via Corepack or npx fallback**

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
2. **P2 – LRP Generation Pipeline**: ✅ **100%**
   - Generate-Button erstellt jetzt einen strukturierten LRP-Prompt inklusive NTF-Context und RP-Boost-Regeln.
3. **P3 – RP-v1.0 Boost Integration**: 🟡 **70%**
   - Resonance-Toggle aktiviert konkrete RP-v1.0-Regeln in der Prompt-Generierung (MVP ohne Submodule-Import wegen Netzwerkrestriktion).
4. **P4 – One-click Open in Grok/Claude/Gemini**: ✅ **100%**
   - Buttons öffnen jetzt zielgerichtet mit Prompt-Handoff (inkl. Gemini Copy+Open Flow).
