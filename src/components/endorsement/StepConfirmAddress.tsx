"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ArrowRightIcon, CheckIcon, ShieldIcon } from "@/components/ui/Icons";
import type { ApplicantRecord } from "@/data/endorsement";

export interface StepConfirmAddressProps {
  applicant: ApplicantRecord;
  onNext: () => void;
}

export function StepConfirmAddress({ applicant, onNext }: StepConfirmAddressProps) {
  const [isSameAddress, setIsSameAddress] = useState(true);

  const { currentAddress, rtoOffice } = applicant;

  return (
    <div className="mt-8 space-y-6">
      <Card padding="lg" className="bg-[var(--color-surface)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-2">
            <Badge tone="primary">
              RTO Jurisdiction: {rtoOffice.code}
            </Badge>
            <span className="text-xs font-semibold text-[var(--color-ink)]">
              {rtoOffice.name}
            </span>
          </div>
          <span className="text-xs text-[var(--color-muted)]">
            State: {rtoOffice.state}
          </span>
        </div>

        {/* Address Card */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Residential Address on Record
            </span>
            <div className="mt-2 text-sm text-[var(--color-ink)] space-y-1">
              <p className="font-semibold">{currentAddress.street}</p>
              <p>{currentAddress.locality}</p>
              <p>
                {currentAddress.city}, {currentAddress.state} — {currentAddress.pincode}
              </p>
            </div>
          </div>

          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Designated Test Venue
            </span>
            <div className="mt-2 text-sm text-[var(--color-ink)] space-y-1">
              <p className="font-semibold">{rtoOffice.name}</p>
              <p className="text-xs text-[var(--color-muted)]">{rtoOffice.trackAddress}</p>
              <p className="text-xs text-[var(--color-accent-text)] font-semibold mt-2">
                Driving test and biometric verification will take place here.
              </p>
            </div>
          </div>
        </div>

        {/* Address Confirmation Options */}
        <div className="mt-6 border-t border-[var(--color-border)] pt-4 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="radio"
              name="address-confirm"
              checked={isSameAddress}
              onChange={() => setIsSameAddress(true)}
              className="mt-0.5 size-4 text-[var(--color-primary)] focus:ring-[var(--color-focus)]"
            />
            <div>
              <span className="text-xs font-semibold text-[var(--color-ink)] block">
                My current address matches the address on record (No address change required)
              </span>
              <span className="text-xs text-[var(--color-muted)]">
                Your endorsement will be processed under {rtoOffice.name}.
              </span>
            </div>
          </label>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-2">
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRightIcon size="sm" />}
            onClick={onNext}
          >
            Confirm Address & Jurisdiction
          </Button>
        </div>
      </Card>
    </div>
  );
}
