"use client";

import { useMemo, useState } from "react";

import { RepoSyncSection } from "@/components/repo-sync-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { buildLrpPrompt } from "@/lib/lrp-generator";

const DEFAULT_INTENT = "";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Home() {
  const [intent, setIntent] = useState(DEFAULT_INTENT);
  const [resonanceBoost, setResonanceBoost] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const confidence = useMemo(() => {
    if (!intent.trim()) {
      return 0;
    }

    const baseFromLength = clamp(55 + intent.trim().length / 4, 0, 92);
    const resonanceBonus = resonanceBoost ? 6 : 0;

    return clamp(Math.round(baseFromLength + resonanceBonus), 0, 99);
  }, [intent, resonanceBoost]);

  const confidenceDecimal = (confidence / 100).toFixed(2);

  const handleGeneratePrompt = () => {
    const cleanIntent = intent.trim();
    if (!cleanIntent) {
      return;
    }

    const prompt = buildLrpPrompt({
      intent: cleanIntent,
      resonanceBoost,
      ntfConfidence: confidence / 100,
    });

    setGeneratedPrompt(prompt);
    setCopied(false);
    setIsPromptModalOpen(true);
  };

  const copyPromptToClipboard = async () => {
    if (!generatedPrompt) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const openClaude = async () => {
    if (!generatedPrompt) {
      return;
    }

    const url = `https://claude.ai/new?q=${encodeURIComponent(generatedPrompt)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openGrok = async () => {
    if (!generatedPrompt) {
      return;
    }

    const url = `https://grok.x.ai/?prompt=${encodeURIComponent(generatedPrompt)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openGemini = async () => {
    if (!generatedPrompt) {
      return;
    }

    await copyPromptToClipboard();
    window.open("https://gemini.google.com/app", "_blank", "noopener,noreferrer");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-background to-muted p-6 md:p-24">
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
                value={intent}
                onChange={(event) => setIntent(event.target.value)}
                placeholder="Beschreibe deine Idee so präzise wie möglich... z.B. 'Erstelle eine React-Komponente für ein Intent-Formular mit Confidence-Score'"
                className="min-h-[150px] resize-y"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Confidence Score (NTF-Normalisierung)</span>
                <Badge variant="outline">{confidenceDecimal}</Badge>
              </div>
              <Progress value={confidence} className="h-3" />
            </div>

            <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="bg-primary font-semibold text-primary-foreground hover:bg-primary/80"
                onClick={handleGeneratePrompt}
                disabled={!intent.trim()}
              >
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
            <Button variant="secondary" className="w-full sm:w-auto" onClick={openGrok} disabled={!generatedPrompt}>
              Open in Grok
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto" onClick={openClaude} disabled={!generatedPrompt}>
              Open in Claude
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto" onClick={openGemini} disabled={!generatedPrompt}>
              Open in Gemini
            </Button>
          </CardFooter>
        </Card>

        <RepoSyncSection />
      </div>

      <Dialog open={isPromptModalOpen} onOpenChange={setIsPromptModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generated LRP Prompt</DialogTitle>
            <DialogDescription>
              Copy den Prompt oder öffne ihn direkt in Grok, Claude oder Gemini.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[52vh] overflow-auto rounded-md border bg-muted/40 p-4">
            <pre className="text-xs whitespace-pre-wrap break-words">{generatedPrompt}</pre>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPromptModalOpen(false)}>
              Close
            </Button>
            <Button onClick={copyPromptToClipboard}>{copied ? "Copied" : "Copy Prompt"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-8 right-8">
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          MVP v0.1 – Made with Resonance
        </Badge>
      </div>
    </main>
  );
}
