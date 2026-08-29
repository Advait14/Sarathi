"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GlobeIcon } from "@/components/ui/Icons";

type AppShellProps = { children: ReactNode };

export function AppShell({ children }: AppShellProps) {
  const [currentDateTime, setCurrentDateTime] = useState({
    date: "29-08-2026",
    time: "04:17:45 PM",
  });
  const [fontSize, setFontSize] = useState<"normal" | "sm" | "lg">("normal");
  const [language, setLanguage] = useState("en");

  // Real-time ticking clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      const d = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}`;
      let hours = now.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const t = `${pad(hours)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}`;
      setCurrentDateTime({ date: d, time: t });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col bg-[var(--color-canvas)] ${
        fontSize === "lg" ? "text-[1.05rem]" : fontSize === "sm" ? "text-[0.95rem]" : ""
      }`}
    >
      {/* Skip to Main Content Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Top Accent Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#003366] via-[#0B57D0] to-[#003366]" />

      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        {/* Top Utility Bar */}
        <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] px-4 py-1.5 text-xs text-[var(--color-muted)]">
          <Container className="flex flex-wrap items-center justify-between gap-3" size="wide">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.6875rem]">
                <strong className="text-[var(--color-ink)]">DATE:</strong> {currentDateTime.date}
              </span>
              <span className="text-[var(--color-border-strong)]">•</span>
              <span className="font-mono text-[0.6875rem]">
                <strong className="text-[var(--color-ink)]">TIME:</strong> {currentDateTime.time}
              </span>
            </div>

            {/* Accessibility & Language Controls */}
            <div className="flex items-center gap-3 text-xs">
              {/* Language Selector */}
              <div className="flex items-center gap-1.5">
                <GlobeIcon size="sm" className="text-[var(--color-muted)]" />
                <label htmlFor="language-select" className="sr-only">
                  Language
                </label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="select select-bordered select-xs bg-transparent text-xs font-semibold text-[var(--color-ink)] focus:outline-none cursor-pointer h-7"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                  <option value="mr">मराठी</option>
                  <option value="ta">தமிழ்</option>
                  <option value="bn">বাংলা</option>
                  <option value="kn">ಕನ್ನಡ</option>
                </select>
              </div>

              <span className="text-[var(--color-border-strong)]">|</span>

              {/* Text Size Controls with DaisyUI join */}
              <div className="join join-horizontal">
                <button
                  type="button"
                  onClick={() => setFontSize("sm")}
                  title="Decrease text size"
                  className={`btn btn-xs join-item ${fontSize === "sm" ? "btn-active btn-primary text-white" : "btn-ghost"}`}
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize("normal")}
                  title="Default text size"
                  className={`btn btn-xs join-item ${fontSize === "normal" ? "btn-active btn-primary text-white" : "btn-ghost"}`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize("lg")}
                  title="Increase text size"
                  className={`btn btn-xs join-item ${fontSize === "lg" ? "btn-active btn-primary text-white" : "btn-ghost"}`}
                >
                  A+
                </button>
              </div>
            </div>
          </Container>
        </div>

        {/* Main Branding Header */}
        <Container className="flex min-h-20 items-center justify-between gap-4 py-4" size="wide">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#003366] to-[#0B57D0] text-white font-black text-base shadow-sm">
              SJ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-[var(--color-ink)] tracking-tight">
                  Sarathi Journey
                </span>
                <Badge tone="primary" size="sm" className="font-bold">
                  v4.0
                </Badge>
              </div>
              <span className="text-xs text-[var(--color-muted)] font-medium block">
                Digital Driving Licence &amp; Endorsement Assistant
              </span>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 py-8 sm:py-12 focus:outline-none">
        <Container size="wide">{children}</Container>
      </main>

      {/* Clean Client-Facing Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8 text-xs text-[var(--color-muted)]">
        <Container size="wide" className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[var(--color-border-subtle)] pb-6">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#003366] text-white font-black text-xs">
                SJ
              </div>
              <div>
                <span className="font-bold text-sm text-[var(--color-ink)] block">
                  Sarathi Journey
                </span>
                <span className="text-xs text-[var(--color-muted)]">
                  Citizen-First Digital Driving Licence Platform
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p>© {new Date().getFullYear()} Sarathi Journey. All rights reserved.</p>
            <p className="text-[var(--color-muted)]">A streamlined digital citizen driving licence experience.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
