"use client";

import { useState } from "react";

import { RepoSyncSection } from "@/components/repo-sync-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const DEFAULT_CONFIDENCE = 92;

export default function Home() {
  const [resonanceBoost, setResonanceBoost] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-background to-muted p-8 md:p-24">
      <div className="z-10 flex w-full max-w-5xl flex-col gap-8 font-mono text-sm">
        <Card className="mx-auto w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">IrsanAI Forge – Intent Studio</CardTitle>
            <CardDescription className="mt-2 text-center">
              Definiere deinen kristallklaren Intent (NTF) und generiere LRP-Prompts mit Resonance-Boost
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <label htmlFor="intent" className="mb-2 block text-sm font-medium">
                Dein Intent / Idee (NTF-Input)
              </label>
              <Textarea
                id="intent"
                placeholder="Beschreibe deine Idee so präzise wie möglich... z.B. 'Erstelle eine React-Komponente für ein Intent-Formular mit Confidence-Score'"
                className="min-h-[150px] resize-y"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Confidence Score (NTF-Normalisierung)</span>
                <Badge variant="outline">0.{DEFAULT_CONFIDENCE}</Badge>
              </div>
              <Progress value={DEFAULT_CONFIDENCE} className="h-3" />
            </div>

            <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Button size="lg" className="bg-primary font-semibold text-primary-foreground hover:bg-primary/80">
                Generate LRP-Prompt
              </Button>

              <div className="flex items-center justify-center gap-3 rounded-md border px-4 py-2">
                <span className="text-sm font-medium">Resonance Boost (RP-v1.0)</span>
                <Switch
                  checked={resonanceBoost}
                  onCheckedChange={setResonanceBoost}
                  aria-label="Toggle Resonance Boost"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-center sm:gap-4">
            <Button variant="secondary" className="w-full sm:w-auto">
              Open in Grok
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto">
              Open in Claude
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto">
              Open in Gemini
            </Button>
          </CardFooter>
        </Card>

        <RepoSyncSection />
      </div>

      <div className="fixed bottom-8 right-8">
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          MVP v0.1 – Made with Resonance
        </Badge>
      </div>
    </main>
  );
}
