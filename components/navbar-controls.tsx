"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function NavbarControls() {
  const [resonanceBoost, setResonanceBoost] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

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
        onClick={() => setDarkMode((prev) => !prev)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
        ☰
      </Button>
    </div>
  );
}
