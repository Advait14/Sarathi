import { Badge } from "@/components/ui/Badge";
import { Text } from "@/components/ui/Text";
import {
  CheckIcon,
  ClockIcon,
  UserIcon,
  AlertCircleIcon,
  ArrowRightIcon,
  ShieldIcon,
} from "@/components/ui/Icons";
import type { StatusFiveDimensionsData } from "@/data/statusStates";

export interface StatusFiveDimensionsProps {
  dimensions: StatusFiveDimensionsData;
}

export function StatusFiveDimensions({ dimensions }: StatusFiveDimensionsProps) {
  const { doINeedToDoAnything, whatHappened, whatHappensNext, whatIsHappening, whoNeedsToAct } =
    dimensions;

  const isApplicantOwner = whoNeedsToAct.owner === "applicant";
  const isActionRequired = doINeedToDoAnything.required;

  return (
    <dl className="mt-6 space-y-4 text-xs">
      {/* 1. WHAT HAPPENED */}
      <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
        <dt className="flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)]">
          <CheckIcon size="sm" className="text-[var(--color-success)] stroke-[2.5]" />
          <span>1. What happened</span>
        </dt>
        <dd className="mt-1">
          <Text className="text-sm text-[var(--color-text)] font-medium leading-relaxed" variant="bodySmall">
            {whatHappened}
          </Text>
        </dd>
      </div>

      {/* 2. WHAT IS HAPPENING */}
      <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
        <dt className="flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)]">
          <ClockIcon size="sm" className="text-[var(--color-accent)] stroke-[2.5]" />
          <span>2. What is happening now</span>
        </dt>
        <dd className="mt-1">
          <Text className="text-sm text-[var(--color-text)] font-medium leading-relaxed" variant="bodySmall">
            {whatIsHappening}
          </Text>
        </dd>
      </div>

      {/* 3 & 4: WHO NEEDS TO ACT & DO I NEED TO DO ANYTHING */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* 3. WHO NEEDS TO ACT */}
        <div
          className={`rounded-[var(--radius-sm)] border p-3.5 ${
            isApplicantOwner
              ? "border-[var(--color-warning-border)] bg-[var(--color-warning-soft)]"
              : "border-[var(--color-border)] bg-[var(--color-surface-subtle)]"
          }`}
        >
          <dt className="flex items-center justify-between gap-1 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)]">
            <span className="flex items-center gap-1">
              <UserIcon size="sm" className={isApplicantOwner ? "text-[var(--color-warning)]" : "text-[var(--color-muted)]"} />
              3. Who needs to act
            </span>
            <Badge tone={isApplicantOwner ? "warning" : "info"} size="sm">
              {whoNeedsToAct.owner.toUpperCase()}
            </Badge>
          </dt>
          <dd className="mt-2">
            <p className="text-sm font-bold text-[var(--color-ink)]">
              {whoNeedsToAct.label}
            </p>
            <p className="mt-0.5 text-xs text-[var(--color-muted)]">
              {whoNeedsToAct.detail}
            </p>
          </dd>
        </div>

        {/* 4. DO I NEED TO DO ANYTHING */}
        <div
          className={`rounded-[var(--radius-sm)] border p-3.5 ${
            isActionRequired
              ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
              : "border-[var(--color-border)] bg-[var(--color-surface-subtle)]"
          }`}
        >
          <dt className="flex items-center justify-between gap-1 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)]">
            <span className="flex items-center gap-1">
              {isActionRequired ? (
                <AlertCircleIcon size="sm" className="text-[var(--color-accent)] stroke-[2.5]" />
              ) : (
                <CheckIcon size="sm" className="text-[var(--color-success)] stroke-[2.5]" />
              )}
              4. Do I need to do anything
            </span>
            <Badge tone={isActionRequired ? "warning" : "success"} size="sm">
              {isActionRequired ? "ACTION REQUIRED" : "NO ACTION"}
            </Badge>
          </dt>
          <dd className="mt-2">
            <p
              className={`text-sm font-bold ${
                isActionRequired ? "text-[var(--color-accent-text)]" : "text-[var(--color-success-text)]"
              }`}
            >
              {doINeedToDoAnything.label}
            </p>
            <p className="mt-0.5 text-xs text-[var(--color-muted)]">
              {doINeedToDoAnything.detail}
            </p>
          </dd>
        </div>
      </div>

      {/* 5. WHAT HAPPENS NEXT */}
      <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
        <dt className="flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)]">
          <ArrowRightIcon size="sm" className="text-[var(--color-primary)] stroke-[2.5]" />
          <span>5. What happens next</span>
        </dt>
        <dd className="mt-1">
          <Text className="text-sm text-[var(--color-text)] font-medium leading-relaxed" variant="bodySmall">
            {whatHappensNext}
          </Text>
        </dd>
      </div>
    </dl>
  );
}
