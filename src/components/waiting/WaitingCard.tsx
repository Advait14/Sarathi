"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Text";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import {
  CheckIcon,
  ClockIcon,
  ShieldIcon,
  UserIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";

export interface WaitingCardProps {
  currentStage: string;
  applicationReference: string;
  lastUpdated: string;
  rtoName: string;
  whatIsHappening: string;
  whatHappensNext: string;
  onRefreshStatus?: () => void;
}

export function WaitingCard({
  applicationReference,
  currentStage,
  lastUpdated,
  onRefreshStatus,
  rtoName,
  whatHappensNext,
  whatIsHappening,
}: WaitingCardProps) {
  return (
    <Card
      aria-labelledby="waiting-state-heading"
      padding="lg"
      className="bg-[var(--color-surface)] shadow-card space-y-5"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center gap-2">
          <Badge tone="info" icon={<ClockIcon size="sm" />}>
            Holding Period Active
          </Badge>
          <StatusIndicator label="Running Automatically" status="waiting" size="sm" />
        </div>
        <span className="text-xs text-[var(--color-muted)] font-medium">
          Ref: <strong className="font-mono text-[var(--color-ink)]">{applicationReference}</strong>
        </span>
      </div>

      {/* Primary Reassuring Headline */}
      <div className="space-y-1.5">
        <Heading as="h2" id="waiting-state-heading" variant="heading" className="text-xl font-bold text-[var(--color-ink)]">
          You&apos;re all set for now
        </Heading>
        <Text className="text-sm text-[var(--color-text)] leading-relaxed" variant="body">
          Your application and MCWG Learner&apos;s Licence are active. Nothing is required from you right now.
        </Text>
      </div>

      {/* Holding Progress Bar (Day 14 of 30) */}
      <div className="rounded-[var(--radius-sm)] border-2 border-[var(--color-primary-border)] bg-[var(--color-primary-soft)] p-4 space-y-2 text-xs">
        <div className="flex items-center justify-between font-bold">
          <span className="text-[var(--color-primary)]">Mandatory Holding Period (CMVR Rule 15)</span>
          <span className="text-[var(--color-ink)]">Day 14 of 30 (16 Days Remaining)</span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-white border border-[var(--color-primary-border)] overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)] rounded-full transition-all"
            style={{ width: "46.6%" }}
          />
        </div>

        <span className="text-[0.6875rem] text-[var(--color-muted)] block">
          Central Motor Vehicles Rules require 30 days of riding practice with an L-board before your automated test track evaluation.
        </span>
      </div>

      {/* Status Clarity Grid */}
      <div className="space-y-3 text-xs">
        {/* Grid: Responsibility & Applicant Action */}
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Who is responsible */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block flex items-center gap-1.5">
              <UserIcon size="sm" className="text-[var(--color-muted)]" />
              Who is responsible
            </span>
            <p className="mt-1 text-xs font-bold text-[var(--color-ink)]">
              {rtoName}
            </p>
            <p className="mt-0.5 text-[0.6875rem] text-[var(--color-muted)]">
              National registry eligibility timer running.
            </p>
          </div>

          {/* Do I need to act */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-3.5">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-success-text)] block flex items-center gap-1.5">
              <CheckIcon size="sm" className="text-[var(--color-success)] stroke-[2.5]" />
              Do I need to do anything?
            </span>
            <p className="mt-1 text-xs font-bold text-[var(--color-success-text)]">
              Nothing required today
            </p>
            <p className="mt-0.5 text-[0.6875rem] text-[var(--color-success-text)] opacity-90">
              Your application is saved. Safe to return later.
            </p>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block flex items-center gap-1.5">
            <ArrowRightIcon size="sm" className="text-[var(--color-primary)] stroke-[2.5]" />
            What happens next
          </span>
          <p className="mt-1 text-xs text-[var(--color-text)] leading-relaxed">
            {whatHappensNext}
          </p>
        </div>
      </div>

      {/* Reassurance Footer */}
      <div className="rounded bg-[var(--color-canvas)] p-3 text-[0.6875rem] text-[var(--color-muted)] border border-[var(--color-border)] flex items-center justify-between">
        <span>✓ Your journey progress is securely saved. You can close this window at any time.</span>
        <span className="font-mono text-[var(--color-ink)] font-semibold">19 Sep 2026 Unlock</span>
      </div>
    </Card>
  );
}
