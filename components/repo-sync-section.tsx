"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SyncedRepo = {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  htmlUrl: string;
  defaultBranch: string;
  updatedAt: string;
};

const STORAGE_KEY = "irsanai-forge-synced-repo";

export function RepoSyncSection() {
  const [repos, setRepos] = useState<SyncedRepo[]>([]);
  const [selectedRepoFullName, setSelectedRepoFullName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const savedRepo = window.localStorage.getItem(STORAGE_KEY);

    if (savedRepo) {
      setSelectedRepoFullName(savedRepo);
    }

    async function loadRepos() {
      try {
        const response = await fetch("/api/github/repos", { cache: "no-store" });

        if (!response.ok) {
          if (response.status === 401) {
            setErrorMessage("Bitte verbinde zuerst deinen GitHub-Account.");
          } else {
            const payload = (await response.json()) as { error?: string };
            setErrorMessage(payload.error ?? "Repos konnten nicht geladen werden.");
          }
          setLoading(false);
          return;
        }

        const payload = (await response.json()) as { repos: SyncedRepo[] };
        setRepos(payload.repos);
      } catch {
        setErrorMessage("Netzwerkfehler beim Laden der Repositories.");
      } finally {
        setLoading(false);
      }
    }

    void loadRepos();
  }, []);

  const selectedRepo = useMemo(
    () => repos.find((repo) => repo.fullName === selectedRepoFullName),
    [repos, selectedRepoFullName],
  );

  function handleSync() {
    if (!selectedRepo) {
      setSuccessMessage("");
      setErrorMessage("Bitte wähle zuerst ein Repository aus.");
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, selectedRepo.fullName);
    setErrorMessage("");
    setSuccessMessage("Repo synced – du kannst jetzt Intents darauf anwenden");
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Sync Repository</CardTitle>
        <CardDescription>
          Wähle ein GitHub-Repository und sync es in die Forge für intent-basierte Verarbeitung.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedRepoFullName} onValueChange={setSelectedRepoFullName} disabled={loading || repos.length === 0}>
          <SelectTrigger>
            <SelectValue placeholder={loading ? "Lade Repositories..." : "Repository auswählen"} />
          </SelectTrigger>
          <SelectContent>
            {repos.map((repo) => (
              <SelectItem key={repo.id} value={repo.fullName}>
                {repo.fullName} {repo.private ? "(private)" : "(public)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleSync} disabled={loading || repos.length === 0 || !selectedRepoFullName}>
          Sync this repo to Forge
        </Button>

        {selectedRepo ? (
          <p className="text-sm text-muted-foreground">
            Standard Branch: <strong>{selectedRepo.defaultBranch}</strong> · Zuletzt aktualisiert: {new Date(selectedRepo.updatedAt).toLocaleString("de-DE")}
          </p>
        ) : null}

        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        {successMessage ? <p className="text-sm text-green-500">{successMessage}</p> : null}
      </CardContent>
    </Card>
  );
}
