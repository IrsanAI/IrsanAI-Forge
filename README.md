# IrsanAI Forge

Resonance-Powered GitHub Forge – Sync Repo → NTF-Intent → LRP-Prompt → optional RP-v1.0 Boost → Open in Grok/Claude/Gemini.

## Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

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
