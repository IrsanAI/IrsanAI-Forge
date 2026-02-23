import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 bg-gradient-to-b from-background to-muted">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">IrsanAI Forge – Intent Studio</CardTitle>
            <CardDescription className="text-center mt-2">
              Definiere deinen kristallklaren Intent (NTF) und generiere LRP-Prompts mit Resonance-Boost
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="intent" className="block text-sm font-medium mb-2">
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
                <Badge variant="outline">0.92</Badge>
              </div>
              <Progress value={92} className="h-3" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold">
                Generate LRP-Prompt
              </Button>
              <Button variant="outline" size="lg">
                Resonance Boost (RP-v1.0)
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4 pt-6 border-t">
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
      </div>

      <div className="fixed bottom-8 right-8">
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          MVP v0.1 – Made with Resonance
        </Badge>
      </div>
    </main>
  );
}