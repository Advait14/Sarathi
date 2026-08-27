import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import {
  CheckIcon,
  ShieldIcon,
  FileTextIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";
import type { UpdatedLicenceData } from "@/data/completed";

export interface CompletedStateCardProps {
  licenceData: UpdatedLicenceData;
  onViewUpdatedLicence: () => void;
  onViewJourney: () => void;
}

export function CompletedStateCard({
  licenceData,
  onViewJourney,
  onViewUpdatedLicence,
}: CompletedStateCardProps) {
  const {
    authorizedClasses,
    endorsementDate,
    issuingAuthority,
    licenceNumber,
  } = licenceData;

  return (
    <Card
      aria-labelledby="completed-state-heading"
      padding="lg"
      className="bg-[var(--color-surface)] shadow-card border-l-4 border-l-[var(--color-success)]"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center gap-2">
          <Badge tone="success" icon={<CheckIcon size="sm" />}>
            Journey Complete
          </Badge>
          <StatusIndicator label="Licence Updated" status="complete" size="sm" />
        </div>
        <span className="text-xs font-mono font-bold text-[var(--color-muted)]">
          {licenceNumber}
        </span>
      </div>

      {/* Primary Headline & Supporting Copy */}
      <div className="mt-5">
        <Heading as="h2" id="completed-state-heading" variant="heading">
          MCWG has been added to your licence
        </Heading>
        <Text className="mt-2 text-base text-[var(--color-text)] leading-relaxed" variant="body">
          Your licence journey is complete. You are now legally authorized to operate Motorcycles With Gear (MCWG) and Light Motor Vehicles (LMV).
        </Text>
      </div>

      {/* Completion Confirmation Summary */}
      <div className="mt-6 space-y-3.5 text-xs">
        {/* Entitlement Status Box */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-4">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-success-text)] block flex items-center gap-1.5">
            <CheckIcon size="sm" className="text-[var(--color-success)] stroke-[2.5]" />
            Updated Licence Entitlement
          </span>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--color-ink)]">
                Existing Entitlement:
              </span>
              <span className="font-bold text-[var(--color-ink)]">
                LMV (Light Motor Vehicle)
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--color-success-text)]">
                Newly Added Entitlement:
              </span>
              <span className="font-bold text-[var(--color-success-text)]">
                MCWG (Motorcycle With Gear)
              </span>
            </div>
          </div>
        </div>

        {/* Record & Dispatch Details */}
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Digital Record */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Digital Record
            </span>
            <p className="mt-1 text-sm font-bold text-[var(--color-ink)]">
              Active in Central Database
            </p>
            <p className="mt-0.5 text-xs text-[var(--color-muted)]">
              Available on mParivahan and DigiLocker.
            </p>
          </div>

          {/* Smart Card Delivery */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Smart Card Dispatch
            </span>
            <p className="mt-1 text-sm font-mono font-bold text-[var(--color-ink)]">
              Speed Post #ED881290345IN
            </p>
            <p className="mt-0.5 text-xs text-[var(--color-muted)]">
              Dispatched to your registered Delhi address.
            </p>
          </div>
        </div>

        {/* Issuing Authority Summary */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5 text-xs">
          <div className="flex items-center justify-between text-[0.6875rem] text-[var(--color-muted)]">
            <span>{issuingAuthority}</span>
            <span>Date: {endorsementDate}</span>
          </div>
        </div>
      </div>

      {/* Primary & Secondary Actions */}
      <div className="mt-7 border-t border-[var(--color-border)] pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Button
          variant="primary"
          size="md"
          leftIcon={<FileTextIcon size="sm" />}
          onClick={onViewUpdatedLicence}
          className="font-bold shadow-sm"
        >
          View updated licence
        </Button>

        <Button
          variant="secondary"
          size="md"
          rightIcon={<ArrowRightIcon size="sm" />}
          onClick={onViewJourney}
          className="text-xs"
        >
          View journey
        </Button>
      </div>
    </Card>
  );
}
