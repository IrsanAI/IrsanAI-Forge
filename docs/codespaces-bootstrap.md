# Codespaces Bootstrap Guide (Submodules + Next.js MVP)

Diese Anleitung ist für den aktuellen Stand von **IrsanAI-Forge** gedacht und kann 1:1 in GitHub Codespaces ausgeführt werden.

## 1) Warum die Submodule-Ordner evtl. nicht sichtbar sind

Wenn `git submodule update --init --recursive` ohne Fehler lief, aber du nur Root-Dateien siehst, sind häufig diese Ursachen relevant:

1. **Falscher Erwartungspfad:** Die Submodule liegen unter `protocols/Universe` und `protocols/RP-v1.0`, nicht im Root.
2. **Codespaces File-Explorer Cache:** Der Browser-Explorer hängt gelegentlich hinterher. Terminal zeigt den echten Zustand.
3. **Unvollständiger Submodule-Metadatenstand:** Nach Branch-Wechseln kann ein `sync + deinit + reinit` nötig sein.
4. **Detached oder stale Submodule pointers:** Wenn der Commit-Stand lokal inkonsistent ist, hilft ein harter Re-Init.

## 2) Exakte Fix-Kommandos (in dieser Reihenfolge)

```bash
# 0) In Repo wechseln
cd /workspace/IrsanAI-Forge

# 1) Prüfen, ob Submodule registriert sind
git submodule status
cat .gitmodules

# 2) URLs mit .gitmodules synchronisieren
git submodule sync --recursive

# 3) Hartes Re-Init (nur wenn Ordner fehlen oder leer wirken)
git submodule deinit -f --all
rm -rf .git/modules/protocols/Universe .git/modules/protocols/RP-v1.0
rm -rf protocols/Universe protocols/RP-v1.0

# 4) Neu initialisieren
git submodule update --init --recursive

# 5) Verifizieren
git submodule status --recursive
ls -la protocols
ls -la protocols/Universe
ls -la protocols/RP-v1.0
```

### Fallback: manuell klonen (nur falls Submodule-Flow weiterhin blockiert)

```bash
mkdir -p protocols
[ -d protocols/Universe ] || git clone https://github.com/IrsanAI/IrsanAI-Universe.git protocols/Universe
[ -d protocols/RP-v1.0 ] || git clone https://github.com/IrsanAI/IrsanAI-RP-v1.0.git protocols/RP-v1.0
```

## 3) Nächste Schritte: Next.js Scaffold im bestehenden Repo

> Empfehlung: Erst Commit vom aktuellen Stand machen, dann scaffolden.

```bash
cd /workspace/IrsanAI-Forge

# Optional: Status prüfen
git status

# Next.js 15 App Router Scaffold
npx create-next-app@latest . --typescript --tailwind --eslint --app --yes
```

Wenn `create-next-app` wegen vorhandener Dateien meckert:

```bash
# Option B: in temp-Ordner scaffolden und dann mergen
npx create-next-app@latest __bootstrap --typescript --tailwind --eslint --app --yes
rsync -av __bootstrap/ ./ --exclude .git
rm -rf __bootstrap
```

## 4) Baseline Dependencies installieren

```bash
npm install @octokit/core @octokit/auth-oauth-app next-auth zod clsx tailwind-merge lucide-react
npm install @radix-ui/react-slot class-variance-authority
```

Optional (später für API-Absicherung/State/Parsing):

```bash
npm install @octokit/rest jose zustand
```

## 5) shadcn/ui initialisieren

```bash
npx shadcn@latest init -d
npx shadcn@latest add button card input textarea switch badge
```

## 6) Beispiel-Startcode

### Beispiel `package.json` (MVP-orientiert)

```json
{
  "name": "irsanai-forge",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@octokit/auth-oauth-app": "^7.0.0",
    "@octokit/core": "^6.1.0",
    "@octokit/rest": "^21.0.0",
    "@radix-ui/react-slot": "^1.1.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "jose": "^5.9.6",
    "lucide-react": "^0.469.0",
    "next": "15.1.4",
    "next-auth": "^5.0.0-beta.25",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "tailwind-merge": "^2.6.0",
    "zod": "^3.24.1",
    "zustand": "^5.0.2"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.1.4",
    "tailwindcss": "^3.4.17",
    "typescript": "^5"
  }
}
```

### Beispiel `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IrsanAI-Forge",
  description: "Resonance-Powered GitHub Forge"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10">
          <header className="mb-8 border-b border-zinc-800 pb-5">
            <h1 className="text-2xl font-semibold">IrsanAI-Forge</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Sync Repo → Normalize Intent (NTF) → Generate LRP Prompt → Optional RP Boost.
            </p>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
```

## 7) Minimal-Checkliste nach Setup

```bash
npm install
npm run lint
npm run dev
```

## 8) Vorschlag für Commit-Text

```bash
git add .
git commit -m "docs: add Codespaces bootstrap guide for submodule recovery and Next.js MVP setup"
```
