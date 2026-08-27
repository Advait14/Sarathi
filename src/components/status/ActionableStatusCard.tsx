import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { ArrowRightIcon, InfoIcon } from "@/components/ui/Icons";
import { StatusFiveDimensions } from "./StatusFiveDimensions";
import type { ActionableStatusData } from "@/data/statusStates";

export interface ActionableStatusCardProps {
  statusData: ActionableStatusData;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

export function ActionableStatusCard({
  onPrimaryAction,
  onSecondaryAction,
  statusData,
}: ActionableStatusCardProps) {
  const {
    badgeTone,
    dimensions,
    headline,
    indicatorStatus,
    lastUpdatedDate,
    officialStatusMeaning,
    officialStatusRaw,
    primaryAction,
    secondaryAction,
    stateBadge,
    subheadline,
  } = statusData;

  return (
    <Card padding="lg" className="bg-[var(--color-surface)] shadow-card">
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-4">
        <div className="flex items-center gap-2">
          <Badge tone={badgeTone}>{stateBadge}</Badge>
          <StatusIndicator label="Active Status" status={indicatorStatus} size="sm" />
        </div>
        <span className="text-xs text-[var(--color-muted)] font-medium">
          Updated: {lastUpdatedDate}
        </span>
      </div>

      {/* Main Headline & Body */}
      <div className="mt-5">
        <Heading as="h2" variant="heading">
          {headline}
        </Heading>
        <Text className="mt-2 text-base text-[var(--color-text)] leading-relaxed" variant="body">
          {subheadline}
        </Text>
      </div>

      {/* Official Government Terminology Translation Pill */}
      {officialStatusRaw ? (
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--color-info-border)] bg-[var(--color-info-soft)] p-3.5 text-xs">
          <div className="flex items-start gap-2.5">
            <InfoIcon size="sm" className="mt-0.5 text-[var(--color-info)] shrink-0" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-[var(--color-ink)]">
                  Official Portal Status:
                </span>
                <span className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-[0.6875rem] font-bold text-[var(--color-info-text)] border border-[var(--color-info-border)]">
                  {officialStatusRaw}
                </span>
              </div>
              <p className="mt-1 text-[var(--color-muted)] leading-normal">
                <span className="font-semibold text-[var(--color-ink)]">Plain meaning: </span>
                {officialStatusMeaning}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* The 5 Core Dimensions */}
      <StatusFiveDimensions dimensions={dimensions} />

      {/* Action Buttons */}
      <div className="mt-7 border-t border-[var(--color-border)] pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Button
          variant="primary"
          size="md"
          rightIcon={<ArrowRightIcon size="sm" />}
          onClick={onPrimaryAction}
        >
          {primaryAction.label}
        </Button>

        {secondaryAction ? (
          <Button
            variant="secondary"
            size="md"
            onClick={onSecondaryAction}
            className="text-xs"
          >
            {secondaryAction.label}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
