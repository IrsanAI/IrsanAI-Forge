import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocsPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8 md:px-10">
      <h1 className="text-3xl font-bold tracking-tight">IrsanAI Forge Docs</h1>

      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>Die wichtigsten Schritte für lokale Entwicklung und GitHub-Sync.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Starte die App über Docker oder lokal mit pnpm.</p>
          <p>2. Öffne die Forge unter http://localhost:3000.</p>
          <p>3. Hinterlege GITHUB_ID und GITHUB_SECRET in .env.local für OAuth.</p>
          <p>4. Klicke danach auf "Connect GitHub" und synchronisiere dein Repository.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bekannte Stolperfallen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Wenn "Connect GitHub" deaktiviert ist, fehlen OAuth-Variablen in der Umgebung.</p>
          <p>
            Wenn Repo-Sync 401 zeigt, ist noch keine Session aktiv. Verbinde GitHub neu und lade die Seite einmal neu.
          </p>
          <p>Der Theme-Button oben rechts schaltet zwischen Dark und Light Mode und speichert die Wahl lokal.</p>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Zurück zur Startseite: <Link href="/" className="underline">Intent Studio öffnen</Link>
      </p>
    </main>
  );
}
