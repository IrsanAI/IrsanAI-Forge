"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type ForgeRepo = {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  htmlUrl: string;
  defaultBranch: string;
  updatedAt: string;
};

type ForgeContextValue = {
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
  repos: ForgeRepo[];
  setRepos: (repos: ForgeRepo[]) => void;
  selectedRepoFullName: string;
  setSelectedRepoFullName: (fullName: string) => void;
};

const ForgeContext = createContext<ForgeContextValue | null>(null);

export function ForgeProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [repos, setRepos] = useState<ForgeRepo[]>([]);
  const [selectedRepoFullName, setSelectedRepoFullName] = useState("");

  const value = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      repos,
      setRepos,
      selectedRepoFullName,
      setSelectedRepoFullName,
    }),
    [isAuthenticated, repos, selectedRepoFullName],
  );

  return <ForgeContext.Provider value={value}>{children}</ForgeContext.Provider>;
}

export function useForgeContext() {
  const context = useContext(ForgeContext);

  if (!context) {
    throw new Error("useForgeContext must be used within ForgeProvider");
  }

  return context;
}
