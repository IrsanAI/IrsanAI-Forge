import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";

import { NavbarAuthButton } from "@/components/navbar-auth-button";
import { NavbarControls } from "@/components/navbar-controls";
import "./globals.css";

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
  return (
    <html lang="de" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                F
              </div>
              <span className="hidden text-xl font-bold md:inline-block">IrsanAI Forge</span>
            </div>

            <nav className="hidden items-center gap-6 md:flex">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/intent" className="text-sm font-medium transition-colors hover:text-primary">
                Intent Studio
              </Link>
              <Link href="/docs" className="text-sm font-medium transition-colors hover:text-primary">
                Docs
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <NavbarControls />
              <NavbarAuthButton />
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
