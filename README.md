# IrsanAI-Forge

**Resonance-Powered GitHub Forge**  
Sync any repo → define crystal-clear Intent (NTF) → generate LRP-structured prompts → optional RP-v1.0 Resonance Boost → copy-paste to live LLM agents (Grok, Claude, Gemini…) with real-time repo access.

**Live Demo** (sobald Pages aktiv): https://irsanai.github.io/IrsanAI-Forge

### Core Features (MVP)
- GitHub OAuth Login + Repo-Sync (dein Account + beliebige andere)
- Intent Studio mit NTF v1.0 Normalisierung + Confidence Score
- One-Click LRP-Prompt Generation
- On-demand **IrsanAI Resonance Protocol** Toggle (0.98+ Semantic Fidelity)
- Direct "Open in Grok" / "Open in Claude" Buttons
- spec-first Architektur (verlinkt mit IrsanAI-Universe)

### Tech Stack
- Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui
- Octokit + Auth.js für GitHub
- Shared lib aus deinem Resonance Stack
- Deploy: Vercel (prod) + GitHub Pages (static preview)

### Verlinkte Repos (Submodules)
- [IrsanAI-Universe](https://github.com/IrsanAI/IrsanAI-Universe)
- [IrsanAI-RP-v1.0](https://github.com/IrsanAI/IrsanAI-RP-v1.0)

## Submodules aktivieren (einmalig)

Nach dem Clone oder im Browser-Codespace einfach ausführen:

```bash
git submodule update --init --recursive
``` 
### Schnellstart
1. `git clone https://github.com/IrsanAI/IrsanAI-Forge.git`
2. `cd IrsanAI-Forge && npm install`
3. `npm run dev`

**Vision**: Das zentrale Werkzeug, mit dem die gesamte IrsanAI-Community (und du selbst) in Sekunden von Idee → live optimiertem Code kommt.


## LOP – Liste offener Punkte (fachlich, nicht technisch blockiert)

Was aus meiner Sicht noch offen ist (aktueller Stand):

- [x] **Spec-First Basis vorhanden**: Kern-Spezifikationen (`TECHNICAL_SPEC.md`, `spec/*.json`) sind angelegt und versioniert.
- [x] **Submodule-Definition vorhanden**: `IrsanAI-Universe` und `IrsanAI-RP-v1.0` sind in `.gitmodules` eingetragen.
- [ ] **Next.js 15 App scaffolden**: App Router + TypeScript + Tailwind + ESLint im bestehenden Repo initialisieren.
- [ ] **GitHub OAuth (Auth.js) anbinden**: Login-Flow + Session-Handling + notwendige GitHub Scopes für Repo-Sync definieren.
- [ ] **Repo-Sync mit Octokit umsetzen**: Repos laden, Branch-/Datei-Metadaten abrufen, UI-Status für Sync darstellen.
- [ ] **Intent Studio (NTF) bauen**: Eingabe → NTF-Normalisierung → Confidence Score in UI/API zeigen.
- [ ] **LRP-Prompt Generator integrieren**: One-Click Prompt-Erzeugung auf Basis der Specs.
- [ ] **RP-v1.0 Toggle integrieren**: Optionaler Resonance-Boost mit nachvollziehbarem Output-Diff.
- [ ] **LLM-Launch Buttons finalisieren**: Direktes Öffnen/Kopieren für Grok, Claude, Gemini mit Kontextübergabe.
- [ ] **Deployment-Setup finalisieren**: Vercel Production + GitHub Pages Preview sauber trennen (Build/Env-Strategie).
- [ ] **Akzeptanzkriterien / DoD pro Feature verankern**: Messbar machen, wann MVP vollständig ist (End-to-End Flow).

👉 Detaillierte Setup-Schritte für Codespaces inkl. Submodule-Fix und Next.js-Bootstrap stehen in `docs/codespaces-bootstrap.md`.

---

**Made with Resonance**  
Part of the [IrsanAI Universe](https://github.com/IrsanAI/IrsanAI-Universe)
