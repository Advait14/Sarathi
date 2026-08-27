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
      className="bg-[var(--color-surface)] shadow-card"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center gap-2">
          <Badge tone="info">In Review by RTO</Badge>
          <StatusIndicator label="Active Processing" status="waiting" size="sm" />
        </div>
        <span className="text-xs text-[var(--color-muted)] font-medium">
          Last updated: {lastUpdated}
        </span>
      </div>

      {/* Primary Headline & Supporting Copy */}
      <div className="mt-5">
        <Heading as="h2" id="waiting-state-heading" variant="heading">
          You&apos;re all set for now
        </Heading>
        <Text className="mt-2 text-base text-[var(--color-text)] leading-relaxed" variant="body">
          Your application is currently being reviewed. You don&apos;t need to submit anything right now.
        </Text>
      </div>

      {/* Clear Status Details (No fake timers / No indefinite spinners) */}
      <div className="mt-6 space-y-3.5 text-xs">
        {/* Current Stage */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
            Current Stage
          </span>
          <p className="mt-1 text-sm font-bold text-[var(--color-ink)]">
            {currentStage}
          </p>
        </div>

        {/* What Is Happening */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block flex items-center gap-1.5">
            <ClockIcon size="sm" className="text-[var(--color-accent)] stroke-[2.5]" />
            What is happening
          </span>
          <p className="mt-1 text-sm text-[var(--color-text)] leading-relaxed">
            {whatIsHappening}
          </p>
        </div>

        {/* Grid: Responsibility & Applicant Action */}
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Who is responsible */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block flex items-center gap-1.5">
              <UserIcon size="sm" className="text-[var(--color-muted)]" />
              Who is responsible
            </span>
            <p className="mt-1.5 text-sm font-bold text-[var(--color-ink)]">
              {rtoName}
            </p>
            <p className="mt-0.5 text-xs text-[var(--color-muted)]">
              Licensing authority officer scrutinizing records.
            </p>
          </div>

          {/* Do I need to act */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-3.5">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-success-text)] block flex items-center gap-1.5">
              <CheckIcon size="sm" className="text-[var(--color-success)] stroke-[2.5]" />
              Do I need to do anything?
            </span>
            <p className="mt-1.5 text-sm font-bold text-[var(--color-success-text)]">
              Nothing required right now
            </p>
            <p className="mt-0.5 text-xs text-[var(--color-success-text)] opacity-90">
              No additional documents requested.
            </p>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block flex items-center gap-1.5">
            <ArrowRightIcon size="sm" className="text-[var(--color-primary)] stroke-[2.5]" />
            What happens next
          </span>
          <p className="mt-1 text-sm text-[var(--color-text)] leading-relaxed">
            {whatHappensNext}
          </p>
        </div>
      </div>

      {/* Reassurance Context Box: Safe to leave and return */}
      <div className="mt-6 rounded-[var(--radius-sm)] border border-[var(--color-info-border)] bg-[var(--color-info-soft)] p-3.5 text-xs text-[var(--color-text)] flex items-start gap-2.5">
        <ShieldIcon size="sm" className="text-[var(--color-info)] shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[var(--color-muted)]">
          <strong className="text-[var(--color-ink)]">Safe to leave anytime: </strong>
          Your application progress is securely saved under reference{" "}
          <span className="font-mono font-bold text-[var(--color-ink)]">{applicationReference}</span>.
          You can return whenever you like to check for the next step.
        </p>
      </div>
    </Card>
  );
}
