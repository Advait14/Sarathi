"use client";

import { useState } from "react";
import { JourneyHeader, JourneyProgress } from "@/components/journey";
import { BlockedStateCard } from "./BlockedStateCard";
import { StalledStateCard } from "./StalledStateCard";
import {
  syntheticBlockedData,
  syntheticStalledData,
} from "@/data/recoveryStates";
import { syntheticJourneyData } from "@/data/journey";

export type RecoveryMode = "blocked" | "stalled";

export interface RecoveryViewProps {
  initialMode?: RecoveryMode;
  onApplyForLL: () => void;
  onSearchRecords?: () => void;
  onViewRtoDetails?: () => void;
}

export function RecoveryView({
  initialMode = "blocked",
  onApplyForLL,
  onSearchRecords,
  onViewRtoDetails,
}: RecoveryViewProps) {
  const [activeMode, setActiveMode] = useState<RecoveryMode>(initialMode);

  const {
    applicationReference,
    existingLicence,
    serviceType,
    steps,
    vehicleClass,
  } = syntheticJourneyData;

  const completedCount = steps.filter((s) => s.state === "completed").length;

  return (
    <div className="w-full">
      {/* Journey Header */}
      <JourneyHeader
        applicationReference={applicationReference}
        completedCount={completedCount}
        existingLicence={existingLicence}
        serviceType={serviceType}
        totalSteps={steps.length}
        vehicleClass={vehicleClass}
      />

      {/* 2-Column Responsive Layout */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
        {/* Left Column: Persistent Journey Progress */}
        <div className="space-y-6">
          <JourneyProgress steps={steps} />
        </div>

        {/* Right Column: Active Recovery Experience */}
        <div className="space-y-6 lg:sticky lg:top-6">
          {/* Recovery Scenario Sub-Switcher */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 shadow-sm flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider">
              Recovery Scenario:
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setActiveMode("blocked")}
                aria-pressed={activeMode === "blocked"}
                className={`rounded px-2.5 py-1 text-xs font-semibold transition-all ${
                  activeMode === "blocked"
                    ? "bg-[var(--color-danger)] text-white shadow-sm"
                    : "bg-[var(--color-surface-subtle)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
                }`}
              >
                1. Blocked (Missing LL)
              </button>
              <button
                type="button"
                onClick={() => setActiveMode("stalled")}
                aria-pressed={activeMode === "stalled"}
                className={`rounded px-2.5 py-1 text-xs font-semibold transition-all ${
                  activeMode === "stalled"
                    ? "bg-[var(--color-warning)] text-[var(--color-ink)] shadow-sm"
                    : "bg-[var(--color-surface-subtle)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
                }`}
              >
                2. Stalled (Inactivity)
              </button>
            </div>
          </div>

          {/* Active Recovery Card */}
          {activeMode === "blocked" ? (
            <BlockedStateCard
              data={syntheticBlockedData}
              onPrimaryRecovery={onApplyForLL}
              onSecondaryRecovery={onSearchRecords}
            />
          ) : (
            <StalledStateCard
              data={syntheticStalledData}
              onPrimaryAction={onViewRtoDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
}
