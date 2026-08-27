import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import {
  AlertTriangleIcon,
  CheckIcon,
  ShieldIcon,
  ArrowRightIcon,
  InfoIcon,
} from "@/components/ui/Icons";
import type { BlockedStateData } from "@/data/recoveryStates";

export interface BlockedStateCardProps {
  data: BlockedStateData;
  onPrimaryRecovery: () => void;
  onSecondaryRecovery?: () => void;
}

export function BlockedStateCard({
  data,
  onPrimaryRecovery,
  onSecondaryRecovery,
}: BlockedStateCardProps) {
  const {
    applicationReference,
    missingCondition,
    primaryRecoveryAction,
    secondaryRecoveryAction,
    subtitle,
    title,
    whatYouCanDo,
    whyItMatters,
  } = data;

  return (
    <Card
      aria-labelledby="blocked-state-heading"
      padding="lg"
      className="bg-[var(--color-surface)] shadow-card border-l-4 border-l-[var(--color-danger)]"
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center gap-2">
          <Badge tone="danger" icon={<AlertTriangleIcon size="sm" />}>
            Prerequisite Blocked
          </Badge>
          <StatusIndicator label="Action Needed" status="current" size="sm" />
        </div>
        <span className="text-xs font-mono font-bold text-[var(--color-muted)]">
          {applicationReference}
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="mt-5">
        <Heading as="h2" id="blocked-state-heading" variant="heading">
          {title}
        </Heading>
        <Text className="mt-2 text-base text-[var(--color-text)] leading-relaxed" variant="body">
          {subtitle}
        </Text>
      </div>

      {/* 4 Core Recovery Sections */}
      <div className="mt-6 space-y-4 text-xs">
        {/* 1. What is missing? */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-danger-border)] bg-[var(--color-danger-soft)] p-4">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-danger-text)] block flex items-center gap-1.5">
            <AlertTriangleIcon size="sm" className="text-[var(--color-danger)] stroke-[2.5]" />
            1. What is missing
          </span>
          <p className="mt-1.5 text-sm font-bold text-[var(--color-danger-text)]">
            {missingCondition.title}
          </p>
          <p className="mt-1 text-xs text-[var(--color-danger-text)] opacity-95 leading-relaxed">
            {missingCondition.description}
          </p>
        </div>

        {/* 2. Why it matters */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block flex items-center gap-1.5">
            <ShieldIcon size="sm" className="text-[var(--color-primary)] stroke-[2.5]" />
            2. Why does it matter?
          </span>
          <p className="mt-1 text-sm text-[var(--color-text)] leading-relaxed">
            {whyItMatters}
          </p>
        </div>

        {/* 3. What you can do */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block flex items-center gap-1.5">
            <InfoIcon size="sm" className="text-[var(--color-accent)] stroke-[2.5]" />
            3. What you can do now
          </span>
          <ul className="mt-2.5 space-y-2 text-sm text-[var(--color-text)]">
            {whatYouCanDo.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed">
                <CheckIcon size="sm" className="text-[var(--color-success)] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Primary Recovery Action (No Dead Ends) */}
      <div className="mt-7 border-t border-[var(--color-border)] pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Button
          variant="primary"
          size="md"
          rightIcon={<ArrowRightIcon size="sm" />}
          onClick={onPrimaryRecovery}
          className="font-bold shadow-sm"
        >
          {primaryRecoveryAction.label}
        </Button>

        {onSecondaryRecovery ? (
          <Button
            variant="secondary"
            size="md"
            onClick={onSecondaryRecovery}
            className="text-xs"
          >
            {secondaryRecoveryAction.label}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
