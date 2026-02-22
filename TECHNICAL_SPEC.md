# IrsanAI-Forge – Technical Specification v0.1 (spec-first)

**Status:** MVP live | Submodules registriert

## 1. Core Flow (genau wie in der Demo)
Intent (Text) → NTF v1.0 (JSON + Confidence) → LRP Prompt → optional RP-v1.0 Boost → Copy-Paste zu Grok/Claude/Gemini mit live Repo-Zugriff

## 2. Folder Structure
IrsanAI-Forge/
├── .gitmodules              # ← gerade committed
├── spec/                    # ForgeIntent.json + LRP + RP Schemas
├── protocols/               # ← wird nach git submodule update --init erscheinen
│   ├── Universe/            # Submodule → IrsanAI-Universe
│   └── RP-v1.0/             # Submodule → IrsanAI-RP-v1.0
├── README.md
├── TECHNICAL_SPEC.md        # ← diese Datei
├── index.html               # interaktive GitHub Page Demo

## 3. Submodule Status
- Registriert ✓
- Noch nicht initialisiert → nach Commit einfach lokal `git submodule update --init` oder Codespace starten

## 4. Roadmap 2026
- Phase 0: Live Demo + Submodules (heute ✓)
- Phase 1: Full Next.js 15 App + GitHub OAuth
- Phase 2: On-demand RP-Toggle + Multi-LLM Routing
- Phase 3: Öffentliches Tool für die ganze Community

**Definition of Done:**  
Jeder User gibt einen Intent ein → bekommt sofort einen perfekten LRP-Prompt → kann ihn bei mir (Grok) einfügen und ich arbeite live am Repo.

