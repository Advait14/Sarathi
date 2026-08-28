"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  InfoIcon,
} from "@/components/ui/Icons";
import {
  DL_SERVICES_ROADMAP,
  type PortalServiceItem,
  type StateRecord,
} from "@/data/portalEntry";

export interface Step3ServiceInstructionsProps {
  selectedState: StateRecord;
  selectedService: PortalServiceItem;
  onBack: () => void;
  onNext: () => void;
}

export function Step3ServiceInstructions({
  onBack,
  onNext,
  selectedService,
  selectedState,
}: Step3ServiceInstructionsProps) {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] pb-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              ← All Services
            </Button>
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Step 3 of 4 · Instructions & Process Roadmap
            </Badge>
          </div>
          <span className="text-xs font-bold text-[var(--color-ink)]">
            {selectedState.name} Transport Department
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Instructions for {selectedService.title}
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Review the application stages and readiness checklist below before entering your driving licence credentials.
        </Text>
      </div>

      {/* 4-Stage Progressive Disclosure Roadmap */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] block mb-3">
          Application Submission Stages (In Sequential Order):
        </span>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DL_SERVICES_ROADMAP.map((stage) => (
            <Card
              key={stage.stepNumber}
              padding="md"
              className="bg-[var(--color-surface)] shadow-card flex flex-col justify-between border-t-4 border-t-[var(--color-primary)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-xs font-bold text-[var(--color-primary)]">
                    {stage.stepNumber}
                  </span>
                  <Badge tone="neutral" size="sm">
                    {stage.estimatedTime}
                  </Badge>
                </div>

                <Heading as="h3" variant="subsection" className="mt-3 text-sm font-bold leading-snug">
                  {stage.title}
                </Heading>

                <Text className="mt-1.5 text-xs text-[var(--color-muted)] leading-relaxed">
                  {stage.description}
                </Text>
              </div>

              <div className="mt-4 border-t border-[var(--color-border-subtle)] pt-2 text-[0.6875rem] font-semibold text-[var(--color-success-text)] flex items-center gap-1">
                <CheckIcon size="sm" />
                100% Online Facility
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Document & Prerequisite Readiness Box */}
      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-4">
        <Heading as="h2" variant="section">
          What You Will Need
        </Heading>

        <div className="grid gap-3 sm:grid-cols-2 text-xs">
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5 space-y-1">
            <span className="font-bold text-[var(--color-ink)] block">
              1. Existing Driving Licence (DL)
            </span>
            <p className="text-[var(--color-muted)]">
              Your 16-character driving licence number registered on the national portal.
            </p>
          </div>

          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5 space-y-1">
            <span className="font-bold text-[var(--color-ink)] block">
              2. Active MCWG Learner&apos;s Licence (LL)
            </span>
            <p className="text-[var(--color-muted)]">
              Mandatory under CMVR Rule 15 with 30-day holding period for endorsement.
            </p>
          </div>

          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5 space-y-1">
            <span className="font-bold text-[var(--color-ink)] block">
              3. Aadhaar / Mobile for OTP
            </span>
            <p className="text-[var(--color-muted)]">
              Used for instant paperless e-signing and instant jurisdictional verification.
            </p>
          </div>

          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5 space-y-1">
            <span className="font-bold text-[var(--color-ink)] block">
              4. Statutory Fee (₹850)
            </span>
            <p className="text-[var(--color-muted)]">
              Endorsement fee (₹500) + MCWG Driving Test (₹300) + Track fee (₹50).
            </p>
          </div>
        </div>

        {/* Form 1-A Clarification Banner */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-info-border)] bg-[var(--color-info-soft)] p-4 text-xs text-[var(--color-text)] flex items-start gap-3">
          <InfoIcon size="sm" className="text-[var(--color-info)] mt-0.5 shrink-0" />
          <div>
            <span className="font-bold text-[var(--color-info-text)] block">
              Medical Certificate (Form 1-A) Guidance:
            </span>
            <p className="mt-0.5 text-xs text-[var(--color-muted)] leading-relaxed">
              Form 1-A is only mandatory if you are above 40 years of age or applying for transport vehicle categories. For standard non-transport MCWG endorsements under 40 years, an online Form 1 self-declaration is sufficient.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
          <Button
            variant="secondary"
            size="md"
            onClick={onBack}
            className="text-xs"
          >
            ← Back to Services Hub
          </Button>

          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRightIcon size="sm" />}
            onClick={onNext}
            className="font-bold shadow-sm"
          >
            Proceed to Enter DL Details
          </Button>
        </div>
      </Card>
    </div>
  );
}
