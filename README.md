# IrsanAI Forge

Resonance-Powered GitHub Forge – Sync Repo → NTF-Intent → LRP-Prompt → optional RP-v1.0 Boost → Open in Grok/Claude/Gemini.

## MetaFlow Guard (Branding & Arbeitsmodus)

Ab sofort ist der offizielle Name für die Denkweise:

**IrsanAI MetaFlow Guard**

MetaFlow Guard bedeutet: Hindernisse früh erkennen, nächste Schritte glasklar machen und User-Frustration aktiv verhindern.

---

## Quickstart (recommended)

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Setup in 60 Sekunden (Automation)

```bash
pnpm setup:local
```

Das Script übernimmt:
- `.env.local` aus `.env.example` anlegen (falls fehlend)
- `pnpm install`
- Submodule-Init (mit Fallback)
- Placeholder-Check für OAuth/Secrets
- Next Actions für Start + OAuth

---

## Docker Quickstart (empfohlen für 1-Klick-Setup)

```bash
cp .env.example .env.local
# optional fallback for older setups: cp .env.example .env
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

## OAuth Setup (GitHub) – Schritt für Schritt

> Ohne OAuth bleiben Login und Repo-Sync unvollständig.

### 1) GitHub OAuth App erstellen

1. Öffne: <https://github.com/settings/developers>
2. Klicke **OAuth Apps** → **New OAuth App**.
3. Trage ein:
   - **Application name**: `IrsanAI Forge`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Speichern und **Client ID** + **Client Secret** kopieren.

### 2) `.env.local` anlegen

```bash
cp .env.example .env.local
```

Eintragen:
- `GITHUB_ID`
- `GITHUB_SECRET`
- `NEXTAUTH_URL=http://localhost:3000`
- `NEXTAUTH_SECRET`
- `AUTH_SECRET`

### 3) Secret generieren

Option A (OpenSSL):

```bash
openssl rand -base64 32
```

Option B (Node.js):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Option C (script):

```bash
pnpm auth:secret
```

### 4) Neustart

```bash
pnpm dev
```

oder:

```bash
docker compose up --build
```

### 5) Check

1. **Connect GitHub** klicken.
2. In **Sync Repository** sollten echte Repos laden.
3. Repo auswählen und **Sync this repo to Forge**.

---

## API Error Recovery (präventive Matrix)

- **401 Not authenticated**
  - Ursache: Nicht eingeloggt.
  - Fix: GitHub verbinden, Seite neu laden.
- **403 access token missing**
  - Ursache: Session/OAuth nicht sauber.
  - Fix: Ausloggen, neu einloggen, Callback URL prüfen.
- **500 @octokit/core missing**
  - Ursache: Dependency konnte nicht installiert werden.
  - Fix: `pnpm add @octokit/core` und bei Proxy-Umgebung README „Known Limitations“ beachten.

---

## Docker Error FAQ (Windows/PyCharm)

### Fehler: `env file .../.env not found`

Ursache: In älteren Compose-Konfigurationen wurde `.env` als Pflichtdatei erwartet.

Fix (copy/paste):

```bash
cp .env.example .env.local
# optional compatibility fallback
cp .env.example .env
docker compose up --build
```

### Fehler: `No such file or directory 'sh` bei `init-submodules`

Ursache: Script wurde mit Windows-CRLF ausgecheckt.

Status im Repo: Dockerfile normalisiert nun Zeilenenden automatisch vor Ausführung.

---

## Vercel Deploy (One-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/IrsanAI/IrsanAI-Forge)

### Required Vercel Environment Variables

- `NEXTAUTH_URL` (z. B. `https://your-project.vercel.app`)
- `NEXTAUTH_SECRET`
- `AUTH_SECRET`
- `GITHUB_ID`
- `GITHUB_SECRET`
- `NEXT_TELEMETRY_DISABLED=1` (optional)

### Deploy Troubleshooting

- **Login loop** → `NEXTAUTH_URL` auf echte Domain setzen.
- **500 bei `/api/github/repos`** → OAuth-Scopes (`read:user repo`) prüfen.
- **Keine Repos sichtbar** → einmal sign out/in.

---

## Live Demo

- Vercel (coming soon): `https://irsanai-forge.vercel.app`
- Sobald Deployment live ist, hier finalen Link eintragen.

---

## Docker + Submodules (MetaFlow Guard abgesichert)

Der Docker-Build initialisiert Submodules automatisch – auch bei frischen Clones ohne `.git` im Build-Kontext:

- Mit `.git`: `git submodule update --init --recursive`
- Ohne `.git`: Fallback-Clone via `.gitmodules`

Siehe: `scripts/init-submodules.sh` + `Dockerfile`.

---

## Release & Marketplace Readiness (GitHub Marketplace)

Vor Marketplace-Listing:

1. Vercel Live-Link aktiv setzen
2. Kurzvideo/GIF „idea → prompt → handoff“ (10–20s)
3. Issue Templates (Bug + Feature) aktiv
4. Tag + Changelog `v0.1.0`

---

## Contribution

1. Fork + Branch (`feature/...`, `fix/...`)
2. Lokal testen:
   ```bash
   pnpm exec tsc --noEmit
   pnpm lint
   ```
3. PR mit Problem, Lösung, Tests, Screenshot (bei UI-Änderung)

---

## Known Limitations

- In manchen Corporate-/CI-Umgebungen schlägt `pnpm add @octokit/core` mit `403` fehl (Registry/Proxy).
- `next build` kann bei gesperrtem Google Fonts Zugriff (`Inter`) scheitern.
- Wenn Docker auf Windows/PyCharm mit `.env not found` stoppt: `cp .env.example .env.local` (optional zusätzlich `.env`) und erneut `docker compose up --build`.

---

## Current MVP Features

- GitHub OAuth via NextAuth
- Intent Studio UI mit Confidence Score + LRP Modal
- Repo Sync mit echter GitHub Repo-Liste
- One-click Handoff: Grok, Claude, Gemini

## LOP (Endnote – priorisiert)

1. **P1 – Repo Sync + Intent Binding**: ✅ **100%**
2. **P2 – LRP Generation Pipeline**: ✅ **100%**
3. **P3 – RP-v1.0 Boost Integration**: ✅ **100%**
4. **P4 – One-click Open in Grok/Claude/Gemini**: ✅ **100%**
