import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import {
  BellIcon,
  CheckIcon,
  ClockIcon,
  ArrowRightIcon,
  AlertCircleIcon,
  ShieldIcon,
} from "@/components/ui/Icons";

export interface ContextualActionNotificationProps {
  applicationReference: string;
  vehicleClass: string;
  rtoName: string;
  onContinue: () => void;
  onViewJourney?: () => void;
}

export function ContextualActionNotification({
  applicationReference,
  onContinue,
  onViewJourney,
  rtoName,
  vehicleClass,
}: ContextualActionNotificationProps) {
  return (
    <Card
      aria-labelledby="action-available-heading"
      padding="lg"
      className="bg-[var(--color-surface)] shadow-card border-l-4 border-l-[var(--color-accent)]"
    >
      {/* Contextual Notification Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center gap-2">
          <Badge tone="warning" icon={<BellIcon size="sm" />}>
            Action Required
          </Badge>
          <StatusIndicator label="Ready to Proceed" status="current" size="sm" />
        </div>
        <span className="text-xs font-mono font-bold text-[var(--color-muted)]">
          {applicationReference}
        </span>
      </div>

      {/* Primary Notification Title & Body */}
      <div className="mt-5">
        <Heading as="h2" id="action-available-heading" variant="heading">
          Your next step is ready
        </Heading>
        <Text className="mt-2 text-base text-[var(--color-text)] leading-relaxed" variant="body">
          Your application has moved forward. You can now continue to the next stage.
        </Text>
      </div>

      {/* 3 Core Questions Answered in Context */}
      <div className="mt-6 space-y-3.5 text-xs">
        {/* 1. What changed? */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block flex items-center gap-1.5">
            <CheckIcon size="sm" className="text-[var(--color-success)] stroke-[2.5]" />
            1. What changed?
          </span>
          <p className="mt-1 text-sm font-medium text-[var(--color-text)] leading-relaxed">
            The Licensing Authority at <strong className="text-[var(--color-ink)]">{rtoName}</strong> has completed scrutiny and verified your active MCWG Learner&apos;s Licence and declarations.
          </p>
        </div>

        {/* 2. Why does it matter? */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block flex items-center gap-1.5">
            <ShieldIcon size="sm" className="text-[var(--color-accent)] stroke-[2.5]" />
            2. Why does it matter?
          </span>
          <p className="mt-1 text-sm font-medium text-[var(--color-text)] leading-relaxed">
            Your application is no longer in a waiting or review state. Your <strong className="text-[var(--color-ink)]">{vehicleClass}</strong> endorsement filing and driving test slot booking are now fully unlocked.
          </p>
        </div>

        {/* 3. What can I do now? */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-accent)] bg-[var(--color-accent-soft)] p-3.5">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-accent-text)] block flex items-center gap-1.5">
            <AlertCircleIcon size="sm" className="text-[var(--color-accent)] stroke-[2.5]" />
            3. What can I do now?
          </span>
          <p className="mt-1 text-sm font-bold text-[var(--color-accent-text)] leading-relaxed">
            Confirm your endorsement details, pay the statutory fee of ₹850, and choose your preferred driving test appointment date and track slot.
          </p>
        </div>
      </div>

      {/* Direct CTA taking user to the relevant stage */}
      <div className="mt-7 border-t border-[var(--color-border)] pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Button
          variant="primary"
          size="md"
          rightIcon={<ArrowRightIcon size="sm" />}
          onClick={onContinue}
          className="font-bold shadow-sm"
        >
          Continue to next stage
        </Button>

        {onViewJourney ? (
          <Button
            variant="secondary"
            size="md"
            onClick={onViewJourney}
            className="text-xs"
          >
            View journey timeline
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
