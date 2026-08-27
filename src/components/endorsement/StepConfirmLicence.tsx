"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ArrowRightIcon, CheckIcon, ShieldIcon } from "@/components/ui/Icons";
import type { ApplicantRecord } from "@/data/endorsement";

export interface StepConfirmLicenceProps {
  applicant: ApplicantRecord;
  onNext: () => void;
}

export function StepConfirmLicence({ applicant, onNext }: StepConfirmLicenceProps) {
  const [isConfirmed, setIsConfirmed] = useState(true);

  return (
    <div className="mt-8 space-y-6">
      <Card padding="lg" className="bg-[var(--color-surface)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-2">
            <Badge tone="success" icon={<CheckIcon size="sm" />}>
              Verified Record
            </Badge>
            <span className="text-xs font-mono text-[var(--color-muted)]">
              {applicant.dlNumber}
            </span>
          </div>
          <span className="text-xs text-[var(--color-success-text)] font-semibold">
            Status: Active & Valid
          </span>
        </div>

        {/* Licence Details Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Full Name
            </span>
            <p className="mt-1 text-base font-bold text-[var(--color-ink)]">
              {applicant.fullName}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Father / Guardian Name
            </span>
            <p className="mt-1 text-base font-medium text-[var(--color-ink)]">
              {applicant.fatherName}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Date of Birth
            </span>
            <p className="mt-1 text-base font-mono font-medium text-[var(--color-ink)]">
              {applicant.dateOfBirth}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Blood Group
            </span>
            <p className="mt-1 text-base font-medium text-[var(--color-ink)]">
              {applicant.bloodGroup}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Registered Mobile
            </span>
            <p className="mt-1 text-base font-mono font-medium text-[var(--color-ink)]">
              {applicant.mobileNumber}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Issuing Authority
            </span>
            <p className="mt-1 text-base font-medium text-[var(--color-ink)]">
              {applicant.rtoOffice.name}
            </p>
          </div>
        </div>

        {/* Current Vehicle Classes Table */}
        <div className="mt-6 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
            Existing Endorsed Vehicle Classes
          </span>
          <div className="mt-3 divide-y divide-[var(--color-border)]">
            {applicant.existingClasses.map((cov) => (
              <div key={cov.covCode} className="flex items-center justify-between py-2 text-xs">
                <div>
                  <span className="font-bold text-[var(--color-ink)]">{cov.covCode}</span>
                  <span className="ml-2 text-[var(--color-muted)]">— {cov.covDescription}</span>
                </div>
                <div className="text-right text-[var(--color-muted)] font-mono">
                  Valid until {cov.validUntil}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="mt-6 border-t border-[var(--color-border)] pt-4">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="mt-0.5 size-4 rounded border-[var(--color-border-strong)] text-[var(--color-primary)] focus:ring-[var(--color-focus)]"
            />
            <span className="text-xs text-[var(--color-text)] leading-normal font-medium">
              I confirm that the driving licence details above match my official record and are correct.
            </span>
          </label>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-2">
          <Button
            variant="primary"
            size="md"
            disabled={!isConfirmed}
            rightIcon={<ArrowRightIcon size="sm" />}
            onClick={onNext}
          >
            Confirm Licence Details
          </Button>
        </div>
      </Card>
    </div>
  );
}
