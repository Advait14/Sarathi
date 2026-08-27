import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import {
  ClockIcon,
  UserIcon,
  InfoIcon,
  ArrowRightIcon,
  ShieldIcon,
} from "@/components/ui/Icons";
import type { StalledStateData } from "@/data/recoveryStates";

export interface StalledStateCardProps {
  data: StalledStateData;
  onPrimaryAction?: () => void;
  onRefreshStatus?: () => void;
}

export function StalledStateCard({
  data,
  onPrimaryAction,
  onRefreshStatus,
}: StalledStateCardProps) {
  const {
    applicationReference,
    currentStage,
    inactivityDuration,
    lastUpdated,
    reasonsForDelay,
    recoveryOptions,
    stepOwner,
    subtitle,
    title,
    transparencyNotice,
    primaryAction,
  } = data;

  return (
    <Card
      aria-labelledby="stalled-state-heading"
      padding="lg"
      className="bg-[var(--color-surface)] shadow-card border-l-4 border-l-[var(--color-warning)]"
    >
      {/* Top Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center gap-2">
          <Badge tone="warning" icon={<ClockIcon size="sm" />}>
            Status Stalled
          </Badge>
          <StatusIndicator label="Inactivity Detected" status="waiting" size="sm" />
        </div>
        <span className="text-xs font-medium text-[var(--color-muted)]">
          {inactivityDuration}
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="mt-5">
        <Heading as="h2" id="stalled-state-heading" variant="heading">
          {title}
        </Heading>
        <Text className="mt-2 text-base text-[var(--color-text)] leading-relaxed" variant="body">
          {subtitle}
        </Text>
      </div>

      {/* Factual Context Box */}
      <div className="mt-6 space-y-3.5 text-xs">
        {/* Stage & Last Updated */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Current Stage
            </span>
            <p className="mt-1 text-sm font-bold text-[var(--color-ink)]">
              {currentStage}
            </p>
          </div>

          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Last System Update
            </span>
            <p className="mt-1 text-sm font-mono font-bold text-[var(--color-ink)]">
              {lastUpdated}
            </p>
          </div>
        </div>

        {/* Current Step Owner */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block flex items-center gap-1.5">
            <UserIcon size="sm" className="text-[var(--color-muted)]" />
            Who currently owns this step?
          </span>
          <p className="mt-1 text-sm font-bold text-[var(--color-ink)]">
            {stepOwner.name} — {stepOwner.office}
          </p>
          <p className="mt-0.5 text-xs text-[var(--color-muted)]">
            {stepOwner.jurisdiction}
          </p>
        </div>

        {/* Reasons for Inactivity */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block flex items-center gap-1.5">
            <InfoIcon size="sm" className="text-[var(--color-info)] stroke-[2.5]" />
            Why can delays happen?
          </span>
          <p className="mt-1 text-sm text-[var(--color-text)] leading-relaxed">
            {reasonsForDelay}
          </p>
        </div>

        {/* Available Recovery / Help Options */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block pb-2 mb-2 border-b border-[var(--color-border-subtle)]">
            Factual Help & Escalation Channels
          </span>
          <div className="space-y-3 pt-1">
            {recoveryOptions.map((opt, idx) => (
              <div key={idx} className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] p-3">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-bold text-xs text-[var(--color-ink)]">{opt.title}</span>
                  <span className="text-[0.6875rem] text-[var(--color-muted)]">{opt.availability}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--color-text)]">{opt.description}</p>
                <div className="mt-2 font-mono text-[0.6875rem] font-bold text-[var(--color-accent-text)]">
                  {opt.channel}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Realistic Disclaimer Notice */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-info-border)] bg-[var(--color-info-soft)] p-3.5 text-xs text-[var(--color-text)] flex items-start gap-2.5">
          <ShieldIcon size="sm" className="text-[var(--color-info)] shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[var(--color-muted)]">
            <strong className="text-[var(--color-ink)]">Transparent Guidance: </strong>
            {transparencyNotice}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-7 border-t border-[var(--color-border)] pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Button
          variant="primary"
          size="md"
          rightIcon={<ArrowRightIcon size="sm" />}
          onClick={onPrimaryAction}
          className="font-bold shadow-sm"
        >
          {primaryAction.label}
        </Button>

        {onRefreshStatus ? (
          <Button
            variant="secondary"
            size="md"
            onClick={onRefreshStatus}
            className="text-xs"
          >
            Refresh application status
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
