import type { JourneyStepData } from "@/data/journey";
import { StatusIndicator, type StatusType } from "@/components/ui/StatusIndicator";
import { Text } from "@/components/ui/Text";
import { CheckIcon } from "@/components/ui/Icons";

export interface JourneyStepProps extends JourneyStepData {
  stepIndex: number;
  isLast: boolean;
}

const statusConfig: Record<
  JourneyStepData["state"],
  { label: string; indicatorStatus: StatusType }
> = {
  completed: {
    label: "Complete",
    indicatorStatus: "complete",
  },
  current: {
    label: "Current stage",
    indicatorStatus: "current",
  },
  upcoming: {
    label: "Upcoming",
    indicatorStatus: "upcoming",
  },
};

export function JourneyStep({
  completedDate,
  isLast,
  shortDescription,
  state,
  stepIndex,
  title,
}: JourneyStepProps) {
  const { indicatorStatus, label } = statusConfig[state];
  const isCurrent = state === "current";
  const isCompleted = state === "completed";

  return (
    <li
      aria-current={isCurrent ? "step" : undefined}
      className="relative grid grid-cols-[2rem_1fr] gap-4 pb-8 last:pb-2"
    >
      {/* Connecting Timeline Line */}

      {!isLast ? (
        <span
          aria-hidden="true"
          className={`absolute left-[0.9375rem] top-8 h-[calc(100%-1.25rem)] w-0.5 ${
            isCompleted ? "bg-[var(--color-success)]" : "bg-[var(--color-border)]"
          }`}
        />
      ) : null}

      {/* Step Icon / Dot */}
      <div className="relative z-10 flex items-start justify-center pt-0.5">
        {isCompleted ? (
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-full bg-[var(--color-success)] text-white shadow-sm ring-4 ring-[var(--color-success-soft)]"
          >
            <CheckIcon size="sm" className="stroke-[2.5]" />
          </span>
        ) : isCurrent ? (
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-surface)] text-[var(--color-accent)] shadow-sm ring-4 ring-[var(--color-accent-soft)]"
          >
            <span className="size-2.5 rounded-full bg-[var(--color-accent)]" />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-subtle)] text-xs font-semibold text-[var(--color-muted)]"
          >
            {stepIndex}
          </span>
        )}
      </div>

      {/* Step Content */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <h3
            className={`text-base font-semibold leading-snug ${
              isCurrent
                ? "text-[var(--color-accent-text)] font-bold"
                : isCompleted
                ? "text-[var(--color-ink)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            {title}
          </h3>
          <StatusIndicator
            label={completedDate ? `${label} (${completedDate})` : label}
            status={indicatorStatus}
            size="sm"
          />
        </div>

        <Text
          className={`mt-1 text-sm ${
            isCurrent
              ? "text-[var(--color-text)] font-normal"
              : isCompleted
              ? "text-[var(--color-muted)]"
              : "text-[var(--color-subtle)]"
          }`}
          variant="bodySmall"
        >
          {shortDescription}
        </Text>
      </div>
    </li>
  );
}
