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
cp .env.example .env.local
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

## IrsanAI Prädiktiv Vorbeugend (Branding-Prinzip)

Dieses Repo folgt dem Leitprinzip **„IrsanAI Prädiktiv Vorbeugend“**:

- Wir dokumentieren Stolpersteine **bevor** sie auftreten.
- Setup-Schritte sind für Anfänger und Fortgeschrittene getrennt beschrieben.
- Typische Fehler (OAuth, Env, Docker, Proxy/Registry) sind mit klaren Fixes erklärt.
- UX-Hinweise im UI helfen beim nächsten sinnvollen Schritt (z. B. GitHub-Connect vor Repo-Sync).

Ziel: weniger Frust, schneller zum ersten Erfolg.

---

## Meta-kognitive Naming-Optionen (statt „Prädiktiv Vorbeugend")

Falls wir den Namen freshen wollen, aber die Botschaft behalten möchten:

1. **IrsanAI Predictive Cognition Layer** (international, tech)
2. **IrsanAI MetaFlow Guard** (kurz, merkbar, creator-tech Vibe)
3. **IrsanAI Anticipatory Intelligence** (klarer Forschungs-Charakter)
4. **IrsanAI Preemptive Creator Engine** (starker „Builder“-Fokus)

Aktuelle Empfehlung für v0.1 Branding-Bridge: **„IrsanAI MetaFlow Guard (Prädiktiv Vorbeugend)“**.

---

## OAuth Setup (GitHub) – Schritt für Schritt

> Ohne diesen Abschnitt bleiben viele Nutzer beim Login/Repo-Sync hängen. Bitte vollständig ausführen.

### 1) GitHub OAuth App erstellen

1. Öffne: <https://github.com/settings/developers>
2. Klicke **OAuth Apps** → **New OAuth App**.
3. Trage ein:
   - **Application name**: `IrsanAI Forge (local)`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Speichern und **Client ID** sowie **Client Secret** kopieren.

### 2) `.env.local` anlegen

```bash
cp .env.example .env.local
```

Dann Werte in `.env.local` eintragen:

- `GITHUB_ID` = Client ID
- `GITHUB_SECRET` = Client Secret
- `NEXTAUTH_URL=http://localhost:3000`
- `NEXTAUTH_SECRET` + `AUTH_SECRET`

### 3) Secret generieren (empfohlen)

Option A (OpenSSL):

```bash
openssl rand -base64 32
```

Option B (Node.js):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Option C (package script):

```bash
pnpm auth:secret
```

Den erzeugten Wert in `NEXTAUTH_SECRET` und `AUTH_SECRET` eintragen.

### 4) App neu starten

```bash
pnpm dev
```

oder mit Docker:

```bash
docker compose up --build
```

### 5) Funktion prüfen

1. Im Header auf **Connect GitHub** klicken.
2. In **Sync Repository** sollten echte Repos erscheinen.
3. Repo auswählen und **Sync this repo to Forge** klicken.

---

## Setup in 60 Sekunden (Automation)

```bash
pnpm setup:local
```

Das Script übernimmt:
- `.env.local` aus `.env.example` anlegen (falls fehlend)
- `pnpm install`
- Submodule-Init (mit Fallback)
- Hinweis zur Secret-Generierung (`pnpm auth:secret`)

---

## Live Demo

- Vercel (coming soon): `https://irsanai-forge.vercel.app`
- Sobald Deployment live ist, hier den finalen Produktiv-Link eintragen.

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

### Deploy Steps

1. Click the Vercel button above.
2. Import repository, Framework preset: **Next.js**.
3. Add env vars from `.env.example`.
4. Deploy und `/api/auth/*` sowie `/api/github/repos` prüfen.

### Vercel Troubleshooting

- **GitHub Login loop** → `NEXTAUTH_URL` passt nicht zur echten Domain.
- **500 bei `/api/github/repos`** → OAuth-Scopes prüfen (`repo`), Secrets erneut setzen.
- **Keine Repos sichtbar** → einmal ausloggen/einloggen, dann Repo-Sync neu laden.

---

## Docker + Submodules (prädiktiv abgesichert)

Der Docker-Build initialisiert Submodules automatisch – auch bei frischen Clones ohne `.git` im Build-Kontext:

- Wenn `.git` vorhanden ist → `git submodule update --init --recursive`
- Wenn `.git` fehlt → Fallback: Clone via `.gitmodules`

Das ist in `scripts/init-submodules.sh` und dem `Dockerfile` integriert.

---

## Known Limitations

- In einigen Corporate-/CI-Umgebungen kann `pnpm add @octokit/core` durch Registry/Proxy-Policies mit `403` fehlschlagen.
- `next build` kann in restriktiven Netzwerken bei Google-Font-Fetch (`Inter`) fehlschlagen; lokal wird dann meist eine Fallback-Font genutzt.
- Für GitHub-Repo-Sync ist ein valider OAuth-Login mit `repo`-Scope erforderlich.

---

## Release & Marketplace Readiness (GitHub Marketplace)

Vor dem Marketplace-Listing empfehlen wir:

1. Vercel-Live-Link aktiv setzen
2. Kurzvideo/GIF „idea → prompt → llm handoff“ (10–20s)
3. Mindestens 1 Bug-Template + 1 Feature-Template
4. Changelog/Tag `v0.1.0`

---

## Contribution

Wir freuen uns über Contributions aus der Community.

### So kannst du beitragen

1. Fork erstellen und Branch anlegen (`feature/...`, `fix/...`).
2. Änderungen lokal testen (`pnpm exec tsc --noEmit`, `pnpm lint`).
3. Klare PR-Beschreibung verfassen (Problem, Lösung, Tests, Screenshot bei UI-Änderungen).
4. Für größere Änderungen vorher ein Issue mit Vorschlag öffnen.

---

## Current MVP Features

- GitHub OAuth via NextAuth (resilient runtime fallback).
- Intent Studio UI mit NTF-Textarea, Confidence-Score, LRP-Modal.
- Repository Sync mit echter GitHub-Repo-Liste nach Login.
- One-click Handoff zu Grok, Claude und Gemini.

## Repo Sync Flow (MVP)

1. Login with GitHub.
2. Open **Sync Repository**.
3. Select repository.
4. Click **Sync this repo to Forge**.
5. Forge speichert Auswahl lokal für Prompt-Targeting.

## LOP (Endnote – priorisiert)

1. **P1 – Repo Sync + Intent Binding**: ✅ **100%**
   - Repositories werden nach GitHub-Login geladen und sind in Forge nutzbar.
2. **P2 – LRP Generation Pipeline**: ✅ **100%**
   - Generate-Button erzeugt strukturierten LRP-Prompt inkl. Kontextdaten.
3. **P3 – RP-v1.0 Boost Integration**: ✅ **100%**
   - RP-Metadaten (`sourceRepo`, `rpVersion`, `fidelityTarget`) sind in Prompt-Ausgabe integriert.
4. **P4 – One-click Open in Grok/Claude/Gemini**: ✅ **100%**
   - Prompt-Handoff funktioniert inkl. Gemini Copy+Open Flow.
