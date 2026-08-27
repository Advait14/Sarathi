"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ArrowRightIcon, CheckIcon, ShieldIcon } from "@/components/ui/Icons";
import type { ApplicantRecord } from "@/data/endorsement";

export interface StepSelectClassProps {
  applicant: ApplicantRecord;
  onNext: (selectedClass: string) => void;
}

export function StepSelectClass({ applicant, onNext }: StepSelectClassProps) {
  const [selectedClass, setSelectedClass] = useState("MCWG");

  const { learnerLicence } = applicant;

  return (
    <div className="mt-8 space-y-6">
      <Card padding="lg" className="bg-[var(--color-surface)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-2">
            <Badge tone="primary">
              Service: Endorsement to DL
            </Badge>
          </div>
          <span className="text-xs font-semibold text-[var(--color-accent-text)]">
            Form 2 Application
          </span>
        </div>

        <div className="mt-4">
          <Heading as="h2" variant="section">
            Select Additional Vehicle Class
          </Heading>
          <Text className="mt-1 text-sm text-[var(--color-text)]" variant="body">
            Choose the vehicle category to add to your existing driving licence.
          </Text>
        </div>

        {/* Vehicle Class Cards */}
        <div className="mt-6 space-y-3">
          {/* Option 1: MCWG (Target) */}
          <label
            className={`flex items-start justify-between gap-4 rounded-[var(--radius-sm)] border-2 p-4 cursor-pointer transition-all ${
              selectedClass === "MCWG"
                ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] shadow-sm"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)]"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="vehicle-class-choice"
                value="MCWG"
                checked={selectedClass === "MCWG"}
                onChange={() => setSelectedClass("MCWG")}
                className="mt-1 size-4 text-[var(--color-accent)] focus:ring-[var(--color-focus)]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-[var(--color-ink)]">
                    MCWG — Motorcycle With Gear
                  </span>
                  <Badge tone="success" size="sm" icon={<CheckIcon size="sm" />}>
                    Eligible
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  Non-Transport two-wheeler with manual/geared transmission.
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[0.6875rem] text-[var(--color-success-text)] font-semibold">
                  <span>Linked LL: {learnerLicence.llNumber}</span>
                  <span>·</span>
                  <span>Status: {learnerLicence.status}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]">
                Selected
              </span>
            </div>
          </label>

          {/* Option 2: MCWOG (Covered) */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 opacity-75">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-semibold text-sm text-[var(--color-muted)]">
                  MCWOG — Motorcycle Without Gear (Scooter)
                </span>
                <p className="mt-0.5 text-xs text-[var(--color-subtle)]">
                  Note: MCWG automatically authorizes operation of MCWOG vehicles under Central Motor Vehicles Rules.
                </p>
              </div>
              <Badge tone="neutral" size="sm">
                Covered by MCWG
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 border-t border-[var(--color-border)] pt-4">
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRightIcon size="sm" />}
            onClick={() => onNext(selectedClass)}
          >
            Select MCWG & Proceed to Declaration
          </Button>
        </div>
      </Card>
    </div>
  );
}
