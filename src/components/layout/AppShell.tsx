"use client";

import { useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { UserIcon, ShieldIcon } from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";
import { LoginModal } from "@/components/auth/LoginModal";

type AppShellProps = { children: ReactNode };

export function AppShell({ children }: AppShellProps) {
  const { user, isAuthenticated, logout, switchDemoUser } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-canvas)]">
      {/* Skip to Main Content Link for Screen Readers & Keyboard Users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Top Header Bar */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
        <Container className="flex min-h-16 items-center justify-between gap-4" size="wide">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--color-primary)] text-white font-bold text-sm shadow-sm"
              aria-hidden="true"
            >
              SJ
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-[var(--color-ink)] block leading-none">
                Sarathi Journey
              </span>
              <span className="text-[0.6875rem] font-medium text-[var(--color-muted)]">
                MoRTH Citizen Licence Portal (JSON Backend Prototype)
              </span>
            </div>
          </div>

          {/* Citizen Profile & Auth Controls */}
          <div className="flex items-center gap-2.5">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-[var(--color-ink)]">
                    {user.name}
                  </span>
                  <span className="text-[0.6875rem] font-mono text-[var(--color-muted)]">
                    {user.dlNumber}
                  </span>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<UserIcon size="sm" />}
                  onClick={() => setIsLoginOpen(true)}
                  className="text-xs"
                >
                  <span className="hidden sm:inline">Switch Citizen</span>
                  <span className="sm:hidden">Switch</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-xs text-[var(--color-muted)] hover:text-[var(--color-danger)]"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                leftIcon={<ShieldIcon size="sm" />}
                onClick={() => setIsLoginOpen(true)}
                className="text-xs font-bold shadow-sm"
              >
                Citizen Sign In
              </Button>
            )}
          </div>

        </Container>
      </header>

      {/* Main Page Landmark */}
      <main id="main-content" tabIndex={-1} className="flex-1 py-8 sm:py-12 focus:outline-none">
        <Container size="wide">{children}</Container>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-6">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-muted)]" size="wide">
          <p>© Sarathi Journey — Citizen-first licence prototype with JSON Backend</p>
          <p>Mock JSON Database: <code className="font-mono bg-[var(--color-surface-muted)] px-1 rounded">src/server/data/db.json</code></p>
        </Container>
      </footer>

      {/* Citizen Authentication Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
