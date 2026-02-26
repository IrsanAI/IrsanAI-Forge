"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useForgeContext } from "@/lib/forge-context";

const THEME_STORAGE_KEY = "irsanai-forge-theme";

export function NavbarControls() {
  const { resonanceBoost, setResonanceBoost } = useForgeContext();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const shouldUseDark = savedTheme ? savedTheme === "dark" : true;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setDarkMode(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    setDarkMode((previous) => {
      const next = !previous;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
      return next;
    });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="hidden items-center gap-2 sm:flex">
        <span className="text-sm font-medium">Resonance Boost</span>
        <Switch
          checked={resonanceBoost}
          onCheckedChange={setResonanceBoost}
          aria-label="Toggle resonance boost"
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </div>
  );
}
