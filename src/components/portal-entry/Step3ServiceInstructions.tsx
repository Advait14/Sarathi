"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading, Text } from "@/components/ui/Text";
import { Alert } from "@/components/ui/Alert";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
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
  const requirements = [
    {
      step: 1,
      title: "Existing Driving Licence (DL)",
      description:
        "Your 16-character driving licence number registered on the national portal with valid records.",
    },
    {
      step: 2,
      title: "Active MCWG Learner's Licence (LL)",
      description:
        "Mandatory under CMVR Rule 15 with a 30-day statutory holding period completed for endorsement.",
    },
    {
      step: 3,
      title: "Aadhaar / Mobile for OTP Verification",
      description:
        "Used for instant paperless e-signing, instant jurisdictional routing, and identity authentication.",
    },
    {
      step: 4,
      title: "Statutory Government Fee (₹850)",
      description:
        "Endorsement fee (₹500) + MCWG Driving Test (₹300) + Track facility fee (₹50), payable securely online.",
    },
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
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
              Process Roadmap &amp; Instructions
            </Badge>
          </div>
          <span className="badge badge-outline badge-md font-bold text-[var(--color-ink)]">
            {selectedState.name} Transport Department
          </span>
        </div>

        <Heading as="h1" className="mt-3 text-2xl sm:text-3xl font-black text-[var(--color-ink)] tracking-tight">
          Instructions for {selectedService.title}
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl">
          Review the sequential stages diagram and prerequisite checklist before entering your licence credentials.
        </Text>
      </div>

      {/* 1. Sequential Stages Diagram */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] block">
            Application Stages (Left-to-Right Sequential Flow):
          </span>
          <span className="badge badge-primary badge-sm font-semibold">
            Total Estimated Time: ~9 Mins
          </span>
        </div>

        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {DL_SERVICES_ROADMAP.map((stage) => (
              <div key={stage.stepNumber} className="flex flex-col relative">
                {/* Stage Card */}
                <div className="flex-1 rounded-[var(--radius-sm)] border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 flex flex-col justify-between shadow-xs hover:border-blue-300 transition-all">
                  <div>
                    {/* Top Row: Number, Stage Tag, Time Badge */}
                    <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-full bg-[#003366] text-white font-black text-xs shadow-xs">
                          {stage.stepNumber}
                        </span>
                        <span className="text-[0.6875rem] font-black uppercase tracking-wider text-[var(--color-primary)]">
                          Stage {stage.stepNumber}
                        </span>
                      </div>
                      <span className="badge badge-ghost badge-xs font-mono font-bold text-[var(--color-primary)]">
                        {stage.estimatedTime}
                      </span>
                    </div>

                    {/* Stage Title */}
                    <h3 className="text-sm font-bold text-[var(--color-ink)] leading-snug">
                      {stage.title}
                    </h3>

                    {/* Stage Description */}
                    <p className="mt-1.5 text-xs text-[var(--color-muted)] leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {/* Stage Delivery Pill */}
                  <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[0.625rem] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                      Mode:
                    </span>
                    <span className="badge badge-ghost badge-xs font-semibold text-[var(--color-ink)]">
                      {stage.isOnline ? "100% Online" : "ADTT Track"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Mandatory Pre-requisites Checklist */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] block">
          Mandatory Pre-requisites &amp; Documents Required:
        </span>

        <div className="grid gap-4 sm:grid-cols-2">
          {requirements.map((req) => (
            <Card
              key={req.step}
              padding="md"
              className="bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2"
            >
              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon size="sm" className="stroke-[2.5]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-[var(--color-ink)]">
                    {req.title}
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    {req.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. Advisory Alert Banner */}
      <Alert type="info" title="Pre-Flight Verification Note">
        The system will automatically perform a non-invasive check against your DL record to verify that an active MCWG Learner&apos;s Licence with the required statutory holding period exists.
      </Alert>

      {/* 4. Action Button Footer */}
      <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button
          variant="secondary"
          size="md"
          onClick={onBack}
          className="w-full sm:w-auto text-xs"
        >
          ← Back to Services
        </Button>

        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRightIcon size="md" />}
          onClick={onNext}
          className="w-full sm:w-auto font-black shadow-md bg-[var(--color-primary)] text-sm sm:text-base py-3 px-8"
        >
          Proceed to Enter DL Details
        </Button>
      </div>
    </div>
  );
}
