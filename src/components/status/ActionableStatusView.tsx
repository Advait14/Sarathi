"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Heading, Text } from "@/components/ui/Text";
import { ShieldIcon, FileTextIcon } from "@/components/ui/Icons";
import { ActionableStatusCard } from "./ActionableStatusCard";
import {
  actionableStatusStates,
  type ActionableStatusKey,
} from "@/data/statusStates";

export interface ActionableStatusViewProps {
  initialStateKey?: ActionableStatusKey;
  onNavigateJourney?: () => void;
}

const statusOptions: { key: ActionableStatusKey; label: string; badge: string }[] = [
  { key: "submitted", label: "1. Submitted", badge: "Intake" },
  { key: "under_review", label: "2. Under Review", badge: "Officer Scrutiny" },
  { key: "waiting", label: "3. Waiting", badge: "Holding Period" },
  { key: "action_available", label: "4. Action Available", badge: "Slot Ready" },
  { key: "processing", label: "5. Processing", badge: "Test Passed" },
  { key: "completed", label: "6. Completed", badge: "MCWG Added" },
];

export function ActionableStatusView({
  initialStateKey = "under_review",
  onNavigateJourney,
}: ActionableStatusViewProps) {
  const [selectedStateKey, setSelectedStateKey] = useState<ActionableStatusKey>(initialStateKey);
  const currentStatusData = actionableStatusStates[selectedStateKey];

  return (
    <div className="w-full">
      {/* Page Header */}
      <header className="border-b border-[var(--color-border)] pb-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Actionable Application Status
            </Badge>
            <Badge tone="neutral">Reference: {currentStatusData.applicationReference}</Badge>
          </div>
          <span className="text-xs text-[var(--color-muted)] font-medium">
            Synthetic Status State Model
          </span>
        </div>

        <Heading as="h1" className="mt-4" variant="display">
          Application Status & Next Steps
        </Heading>

        <Text className="mt-2 text-sm text-[var(--color-text)]" variant="bodyLarge">
          Clear, plain-language status interpretation answering what happened, what is happening, who needs to act, and what comes next.
        </Text>
      </header>

      {/* 6-State Interactive Demo Switcher */}
      <section
        aria-label="Status state selector"
        className="mt-6 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-sm"
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
          <span>Test the 6 Documented Application Status States:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => {
            const isSelected = selectedStateKey === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelectedStateKey(option.key)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-1.5 rounded-[var(--radius-xs)] px-3 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-[var(--color-primary)] text-white shadow-sm ring-2 ring-[var(--color-primary-soft)]"
                    : "bg-[var(--color-surface-subtle)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[0.625rem] font-bold uppercase ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[var(--color-surface-muted)] text-[var(--color-muted)]"
                  }`}
                >
                  {option.badge}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Responsive Layout: Status Card + Metadata Column */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:items-start">
        {/* Left Column: Actionable Status Card with 5 Dimensions */}
        <div>
          <ActionableStatusCard
            statusData={currentStatusData}
            onPrimaryAction={onNavigateJourney}
          />
        </div>

        {/* Right Column: Application Context Metadata */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <Card padding="md" className="bg-[var(--color-surface)]">
            <Heading as="h2" variant="section" className="border-b border-[var(--color-border)] pb-3">
              Application Metadata
            </Heading>

            <dl className="mt-4 divide-y divide-[var(--color-border-subtle)] text-xs">
              <div className="py-2.5">
                <dt className="text-xs font-bold text-[var(--color-muted)]">Application Number</dt>
                <dd className="mt-0.5 font-mono font-bold text-sm text-[var(--color-ink)]">
                  {currentStatusData.applicationReference}
                </dd>
              </div>

              <div className="py-2.5">
                <dt className="text-xs font-bold text-[var(--color-muted)]">Service</dt>
                <dd className="mt-0.5 font-medium text-sm text-[var(--color-ink)]">
                  {currentStatusData.serviceName}
                </dd>
              </div>

              <div className="py-2.5">
                <dt className="text-xs font-bold text-[var(--color-muted)]">Target Vehicle Class</dt>
                <dd className="mt-0.5 font-bold text-sm text-[var(--color-accent-text)]">
                  {currentStatusData.vehicleClass}
                </dd>
              </div>

              <div className="py-2.5">
                <dt className="text-xs font-bold text-[var(--color-muted)]">Assigned RTO</dt>
                <dd className="mt-0.5 text-sm text-[var(--color-ink)] font-medium">
                  {currentStatusData.rtoName}
                </dd>
              </div>

              <div className="py-2.5">
                <dt className="text-xs font-bold text-[var(--color-muted)]">Submission Date</dt>
                <dd className="mt-0.5 text-sm font-mono text-[var(--color-ink)]">
                  {currentStatusData.submissionDate}
                </dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}
