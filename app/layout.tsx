import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IrsanAI Forge",
  description: "Resonance-Powered GitHub Forge – Intent → LRP-Prompt → LLM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [resonanceBoost, setResonanceBoost] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default dark

  return (
    <html lang="de" className={darkMode ? "dark" : ""}>
      <body className={cn(
        inter.className,
        "min-h-screen bg-background text-foreground antialiased"
      )}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            {/* Logo + Title */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                F
              </div>
              <span className="font-bold text-xl hidden md:inline-block">
                IrsanAI Forge
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </a>
              <a href="/intent" className="text-sm font-medium transition-colors hover:text-primary">
                Intent Studio
              </a>
              <a href="/docs" className="text-sm font-medium transition-colors hover:text-primary">
                Docs
              </a>
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
              {/* Resonance Boost Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium hidden sm:inline">
                  Resonance Boost
                </span>
                <Switch
                  checked={resonanceBoost}
                  onCheckedChange={setResonanceBoost}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Connect GitHub */}
              <Button variant="default" size="sm" className="hidden sm:flex">
                Connect GitHub
              </Button>

              {/* Mobile Menu Button (später implementieren) */}
              <Button variant="ghost" size="icon" className="md:hidden">
                {/* Hamburger Icon */}
                <span className="sr-only">Menu</span>
                ☰
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Made with Resonance · Part of the IrsanAI Universe
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}