import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Text";
import { ShieldIcon, ArrowRightIcon } from "@/components/ui/Icons";

export interface PrerequisiteGoalProps {
  title: string;
  targetClass: string;
  existingLicence: string;
  existingNumber: string;
}

export function PrerequisiteGoal({
  existingLicence,
  existingNumber,
  targetClass,
  title,
}: PrerequisiteGoalProps) {
  return (
    <div className="border-b border-[var(--color-border)] pb-8 pt-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
          Step 0 · Prerequisite Check
        </Badge>
        <span className="text-xs text-[var(--color-muted)] font-medium">
          Early Requirement Check
        </span>
      </div>

      <Heading as="h1" className="mt-4" variant="display">
        {title}
      </Heading>

      <Text className="mt-2 text-base text-[var(--color-text)]" variant="bodyLarge">
        Confirm prerequisites before entering the endorsement and slot booking workflow.
      </Text>

      {/* Goal Summary Card */}
      <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 shadow-card">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Your Current Licence
            </span>
            <p className="mt-1 text-base font-bold text-[var(--color-ink)]">
              {existingLicence}
            </p>
            <p className="text-xs font-mono text-[var(--color-muted)] mt-0.5">
              {existingNumber}
            </p>
          </div>

          <div className="hidden sm:flex items-center justify-center text-[var(--color-accent)] px-2">
            <ArrowRightIcon size="md" />
          </div>

          <div className="border-t border-[var(--color-border-subtle)] pt-3 sm:border-t-0 sm:pt-0">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]">
              Adding Vehicle Class
            </span>
            <p className="mt-1 text-base font-bold text-[var(--color-accent-text)]">
              {targetClass}
            </p>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">
              Endorsement to existing licence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
