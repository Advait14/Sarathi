import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Text";
import { ShieldIcon, FileTextIcon } from "@/components/ui/Icons";

export interface JourneyHeaderProps {
  applicationReference: string;
  serviceType: string;
  vehicleClass: string;
  existingLicence: string;
  completedCount: number;
  totalSteps: number;
}

export function JourneyHeader({
  applicationReference,
  completedCount,
  existingLicence,
  serviceType,
  totalSteps,
  vehicleClass,
}: JourneyHeaderProps) {
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <header className="border-b border-[var(--color-border)] pb-8 pt-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
            Citizen Journey
          </Badge>
          <Badge tone="neutral">Reference: {applicationReference}</Badge>
        </div>
        <span className="text-xs text-[var(--color-muted)] font-medium">
          Synthetic Prototype Demo
        </span>
      </div>

      <Heading as="h1" className="mt-4" variant="display">
        Your MCWG licence journey
      </Heading>

      <Text className="mt-2 max-w-2xl text-[var(--color-text)]" variant="bodyLarge">
        Adding <span className="font-semibold text-[var(--color-ink)]">{vehicleClass}</span> to your{" "}
        <span className="font-semibold text-[var(--color-ink)]">{existingLicence}</span>.
      </Text>

      {/* Progress Bar & Summary */}
      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--color-ink)]">
              {completedCount} of {totalSteps} stages complete
            </span>
            <span className="text-xs text-[var(--color-muted)]">({progressPercent}%)</span>
          </div>
          <span className="text-xs font-medium text-[var(--color-muted)]">
            Service: {serviceType}
          </span>
        </div>

        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Overall journey progress"
          className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-muted)] border border-[var(--color-border)]"
        >
          <div
            className="h-full bg-[var(--color-accent)] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
}
