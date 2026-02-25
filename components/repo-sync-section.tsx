"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForgeContext } from "@/lib/forge-context";

const STORAGE_KEY = "irsanai-forge-synced-repo";

export function RepoSyncSection() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    repos,
    setRepos,
    selectedRepoFullName,
    setSelectedRepoFullName,
  } = useForgeContext();

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
            setIsAuthenticated(false);
            setErrorMessage("Bitte verbinde zuerst deinen GitHub-Account über 'Connect GitHub'.");
          } else {
            const payload = (await response.json()) as { error?: string };
            setErrorMessage(payload.error ?? "Repos konnten nicht geladen werden.");
          }
          setRepos([]);
          return;
        }

        const payload = (await response.json()) as {
          repos: typeof repos;
        };

        setIsAuthenticated(true);
        setRepos(payload.repos);
        setErrorMessage("");
      } catch {
        setErrorMessage("Netzwerkfehler beim Laden der Repositories. Prüfe Internet/Proxy und versuche es erneut.");
      } finally {
        setLoading(false);
      }
    }

    void loadRepos();
  }, [setIsAuthenticated, setRepos, setSelectedRepoFullName]);

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
    setSelectedRepoFullName(selectedRepo.fullName);
    setErrorMessage("");
    setSuccessMessage(`Repo synced: ${selectedRepo.fullName}`);
  }

  return (
    <Card className="mx-auto mt-8 w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Sync Repository</CardTitle>
        <CardDescription>
          Wähle ein GitHub-Repository und sync es in die Forge für intent-basierte Verarbeitung.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          value={selectedRepoFullName}
          onValueChange={setSelectedRepoFullName}
          disabled={loading || !isAuthenticated || repos.length === 0}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                loading
                  ? "Lade Repositories..."
                  : !isAuthenticated
                    ? "Bitte zuerst mit GitHub verbinden"
                    : "Repository auswählen"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {repos.map((repo) => (
              <SelectItem key={repo.id} value={repo.fullName}>
                {repo.fullName} {repo.private ? "(private)" : "(public)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleSync} disabled={loading || !isAuthenticated || repos.length === 0 || !selectedRepoFullName}>
          Sync this repo to Forge
        </Button>

        {selectedRepo ? (
          <p className="text-sm text-muted-foreground">
            Standard Branch: <strong>{selectedRepo.defaultBranch}</strong> · Zuletzt aktualisiert:{" "}
            {new Date(selectedRepo.updatedAt).toLocaleString("de-DE")}
          </p>
        ) : null}

        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        {successMessage ? <p className="text-sm text-green-500">{successMessage}</p> : null}

        {!isAuthenticated && !loading ? (
          <div className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">
            Tipp: Wenn der Repo-Select leer bleibt, prüfe in der README den Abschnitt <strong>OAuth Setup (GitHub)</strong>.
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
