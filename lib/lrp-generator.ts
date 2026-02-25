import rpIntegration from "@/spec/RP-Integration.json";

const RP_BASE_RULES = [
  "Halte den Ton klar, respektvoll und umsetzungsorientiert.",
  "Nutze konkrete Acceptance Criteria und messbare Erfolgsindikatoren.",
  "Priorisiere robuste, wartbare Lösungen vor schnellen Hacks.",
];

const RP_BOOST_RULES = [
  "Erhöhe semantische Präzision durch explizite Constraints und Edge-Cases.",
  "Stärke Resonanz mit der IrsanAI-Vision: user-friendly, inklusiv, zukunftssicher.",
  "Füge einen kurzen Validierungsplan für lokale QA hinzu.",
];

type RpIntegrationSpec = {
  rpVersion: string;
  activation: string;
  fidelityTarget: number;
  sourceRepo: string;
};

const RP_SPEC = rpIntegration as RpIntegrationSpec;

export type LrpPromptInput = {
  intent: string;
  resonanceBoost: boolean;
  ntfConfidence: number;
  targetRepo: string;
};

export function buildLrpPrompt({ intent, resonanceBoost, ntfConfidence, targetRepo }: LrpPromptInput) {
  const timestamp = new Date().toISOString();
  const [targetOwner = "IrsanAI", repoName = targetRepo] = targetRepo.split("/");
  const resonanceRules = resonanceBoost ? [...RP_BASE_RULES, ...RP_BOOST_RULES] : RP_BASE_RULES;

  const sections = [
    "# LRP Prompt (IrsanAI Forge)",
    "",
    "## System Role",
    "Du bist der Lead-Entwickler von IrsanAI-Forge. Liefere sauberen, produktionsnahen TypeScript-Code mit Fokus auf UX, Stabilität und Dark-Mode-Kompatibilität.",
    "",
    "## User Context",
    `- Timestamp: ${timestamp}`,
    `- NTF Confidence: ${ntfConfidence.toFixed(2)}`,
    `- Resonance Boost: ${resonanceBoost ? "enabled" : "disabled"}`,
    `- Target Repository: ${targetRepo}`,
    "",
    "## RP-v1.0 Integration",
    `- Source Repo (Submodule): ${RP_SPEC.sourceRepo}`,
    `- RP Version: ${RP_SPEC.rpVersion}`,
    `- Activation: ${RP_SPEC.activation}`,
    `- Fidelity Target: ${RP_SPEC.fidelityTarget}`,
    "",
    "## Intent JSON",
    "```json",
    JSON.stringify(
      {
        userIntent: intent,
        targetRepo: repoName,
        targetOwner,
        desiredOutcome: "Strukturierte und umsetzbare Prompt-basierte Entwicklungsanweisung",
        ntfConfidence,
        rpMode: resonanceBoost,
        rpVersion: RP_SPEC.rpVersion,
        timestamp,
      },
      null,
      2,
    ),
    "```",
    "",
    "## Resonance Rules",
    ...resonanceRules.map((rule, index) => `${index + 1}. ${rule}`),
    "",
    "## Requested Output",
    "1. Liefere eine kurze Architektur-Zusammenfassung.",
    "2. Gib vollständigen, copy-paste-fähigen Code.",
    "3. Ergänze klare Test-/Check-Schritte.",
  ];

  return sections.join("\n");
}
