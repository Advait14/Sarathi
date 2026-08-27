import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Text";
import { UserIcon, ClockIcon } from "@/components/ui/Icons";

export interface StatusSummaryProps {
  whatHappened: string;
  whatIsHappening: string;
  whoNeedsToAct: {
    owner: "applicant" | "rto" | "system";
    label: string;
    detail: string;
  };
}

export function StatusSummary({
  whatHappened,
  whatIsHappening,
  whoNeedsToAct,
}: StatusSummaryProps) {
  const isApplicant = whoNeedsToAct.owner === "applicant";

  return (
    <Card aria-labelledby="status-summary-heading" padding="md" className="bg-[var(--color-surface)]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <Heading as="h2" id="status-summary-heading" variant="section">
          Status interpretation
        </Heading>
        <Badge tone={isApplicant ? "warning" : "info"} size="sm">
          {whoNeedsToAct.label}
        </Badge>
      </div>

      <dl className="mt-4 space-y-4">
        {/* 1. What Happened */}
        <div>
          <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            What has happened
          </dt>
          <dd className="mt-1">
            <Text className="text-sm text-[var(--color-text)]" variant="bodySmall">
              {whatHappened}
            </Text>
          </dd>
        </div>

        {/* 2. What Is Happening */}
        <div className="border-t border-[var(--color-border-subtle)] pt-3">
          <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            What is happening now
          </dt>
          <dd className="mt-1">
            <Text className="text-sm text-[var(--color-text)]" variant="bodySmall">
              {whatIsHappening}
            </Text>
          </dd>
        </div>

        {/* 3. Who Needs to Act */}
        <div className="border-t border-[var(--color-border-subtle)] pt-3">
          <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Who needs to act
          </dt>
          <dd className="mt-1 flex items-start gap-2">
            <span
              aria-hidden="true"
              className={`mt-0.5 shrink-0 rounded p-1 ${
                isApplicant
                  ? "bg-[var(--color-warning-soft)] text-[var(--color-warning)]"
                  : "bg-[var(--color-info-soft)] text-[var(--color-info)]"
              }`}
            >
              {isApplicant ? <UserIcon size="sm" /> : <ClockIcon size="sm" />}
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                {whoNeedsToAct.label}
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">
                {whoNeedsToAct.detail}
              </p>
            </div>
          </dd>
        </div>
      </dl>
    </Card>
  );
}
