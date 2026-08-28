"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  AlertTriangleIcon,
  InfoIcon,
} from "@/components/ui/Icons";
import { JourneyHeader } from "./JourneyHeader";
import { JourneyProgress } from "./JourneyProgress";
import { CurrentStage } from "./CurrentStage";
import { NextAction } from "./NextAction";
import { StatusSummary } from "./StatusSummary";
import type { UnifiedJourneyState } from "@/data/unifiedJourney";

export interface MasterJourneyViewProps {
  journeyState: UnifiedJourneyState;
  onPrimaryAction: (actionKey?: string) => void;
  onSecondaryAction?: (actionKey?: string) => void;
}

export function MasterJourneyView({
  journeyState,
  onPrimaryAction,
  onSecondaryAction,
}: MasterJourneyViewProps) {
  const {
    applicant,
    applicationReference,
    existingClass,
    milestones,
    recoveryMode,
    serviceType,
    status,
    targetClass,
  } = journeyState;

  const completedCount = milestones.filter((m) => m.state === "completed").length;

  // Convert milestones to format expected by JourneyProgress
  const formattedSteps = milestones.map((m) => ({
    id: m.id,
    title: m.title,
    shortDescription: m.shortDescription,
    state: (m.state === "completed"
      ? "completed"
      : m.state === "current" || m.state === "waiting" || m.state === "action_required"
      ? "current"
      : "upcoming") as "completed" | "current" | "upcoming",
    completedDate: m.completedDate,
  }));

  return (
    <div className="w-full space-y-6">
      {/* 1. Master Journey Persistent Header */}
      <JourneyHeader
        applicationReference={applicationReference}
        completedCount={completedCount}
        existingLicence={`${applicant.dlNumber} (${applicant.name}) · ${existingClass}`}
        serviceType={serviceType}
        totalSteps={milestones.length}
        vehicleClass={targetClass}
      />

      {/* Recovery / Alert Banners if in Exception State */}
      {recoveryMode === "blocked" ? (
        <div className="rounded-[var(--radius-sm)] border-2 border-[var(--color-danger-border)] bg-[var(--color-danger-soft)] p-4 flex items-start gap-3 shadow-sm">
          <AlertTriangleIcon size="md" className="text-[var(--color-danger)] mt-0.5 shrink-0" />
          <div className="space-y-1 text-xs">
            <span className="font-bold text-[var(--color-danger-text)] block text-sm">
              Application Blocked — Prerequisite Required
            </span>
            <p className="text-[var(--color-danger-text)] leading-relaxed">
              No active Motorcycle With Gear (MCWG) Learner&apos;s Licence was found in the national registry. Under Central Motor Vehicles Rules, an active LL is mandatory before scheduling your driving test.
            </p>
          </div>
        </div>
      ) : recoveryMode === "stalled" ? (
        <div className="rounded-[var(--radius-sm)] border-2 border-[var(--color-warning-border)] bg-[var(--color-warning-soft)] p-4 flex items-start gap-3 shadow-sm">
          <ClockIcon size="md" className="text-[var(--color-warning)] mt-0.5 shrink-0" />
          <div className="space-y-1 text-xs">
            <span className="font-bold text-[var(--color-warning-text)] block text-sm">
              Review Delayed Beyond Standard SLA (6 Business Days)
            </span>
            <p className="text-[var(--color-warning-text)] leading-relaxed">
              Your application is currently queued at RTO Janakpuri. An automated escalation ticket has been logged with the Assistant Licensing Officer.
            </p>
          </div>
        </div>
      ) : null}

      {/* 2. Responsive 2-Column Master Layout */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
        {/* Left Column: Vertical 6-Stage Timeline */}
        <div className="space-y-6">
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-card">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3 mb-4">
              <div>
                <Heading as="h2" variant="section" className="text-sm font-bold text-[var(--color-ink)]">
                  Master Journey Timeline
                </Heading>
                <span className="text-[0.6875rem] text-[var(--color-muted)]">
                  Single continuous timeline for adding MCWG to your licence
                </span>
              </div>
              <Badge
                tone={
                  completedCount === milestones.length
                    ? "success"
                    : recoveryMode
                    ? "danger"
                    : "primary"
                }
                size="sm"
              >
                {completedCount} of {milestones.length} Milestones
              </Badge>
            </div>

            <JourneyProgress steps={formattedSteps} />
          </div>

          {/* RTO Jurisdiction & Applicant Quick Info Card */}
          <Card padding="md" className="bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs space-y-2.5">
            <span className="font-bold uppercase tracking-wider text-[var(--color-muted)] text-[0.6875rem] block">
              Official Application Authority Record:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Licensing Authority:</span>
                <span className="font-bold text-[var(--color-ink)]">{applicant.rtoName}</span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Registered State:</span>
                <span className="font-bold text-[var(--color-ink)]">Delhi (DL-04)</span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Holder Name:</span>
                <span className="font-semibold text-[var(--color-ink)]">{applicant.name}</span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Existing Licence:</span>
                <span className="font-mono font-bold text-[var(--color-primary)]">{applicant.dlNumber}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: 5-Dimension Actionable Status & Guidance */}
        <div className="space-y-6 lg:sticky lg:top-6">
          {/* Dimension 1: Where am I */}
          <CurrentStage
            stageNumber={status.whereAmI.stageNumber}
            totalStages={status.whereAmI.totalStages}
            title={status.whereAmI.title}
            description={status.whereAmI.description}
          />

          {/* Dimension 2 & 5: What I need to do & What happens next */}
          <NextAction
            actionTitle={status.whatINeedToDo.actionTitle}
            instructions={status.whatINeedToDo.instructions}
            primaryCtaText={status.whatINeedToDo.primaryCtaText}
            whatHappensNext={status.whatHappensNext}
            onActionClick={() => onPrimaryAction(status.whatINeedToDo.actionKey)}
          />

          {/* Dimension 3 & 4: What happened, What is happening, Who needs to act */}
          <StatusSummary
            whatHappened={status.whatHappened}
            whatIsHappening={status.whatIsHappening}
            whoNeedsToAct={status.whoNeedsToAct}
          />
        </div>
      </div>
    </div>
  );
}
