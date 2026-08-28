"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
  FileTextIcon,
  InfoIcon,
} from "@/components/ui/Icons";
import type { PortalServiceItem, StateRecord } from "@/data/portalEntry";

export interface Step9ApplicationReferenceSlipProps {
  selectedState: StateRecord;
  selectedService: PortalServiceItem;
  dlNumber: string;
  dob: string;
  onProceedToFee: () => void;
  onViewDashboard: () => void;
}

export function Step9ApplicationReferenceSlip({
  dlNumber,
  dob,
  onProceedToFee,
  onViewDashboard,
  selectedService,
  selectedState,
}: Step9ApplicationReferenceSlipProps) {
  const isPriya = dlNumber.includes("99887");
  const holderName = isPriya ? "Priya Verma" : "Advait Sharma";
  const fatherName = isPriya ? "Suresh Verma" : "Rajesh Sharma";
  const bloodGroup = isPriya ? "O+" : "B+";
  const appNumber = "SJ-MCWG-2048";
  const rtoName = isPriya ? "ARTO Reasi, DC Office (JK-20)" : "RTO Janakpuri, West Delhi (DL-04)";

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] pb-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge tone="success" icon={<CheckIcon size="sm" />}>
            Step 9 of 10 · Application Generated
          </Badge>
          <span className="text-xs font-mono font-bold text-[var(--color-ink)]">
            Reference: {appNumber}
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Application Reference Details & Acknowledgement
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Your Form 2 application for MCWG endorsement has been officially registered with the Ministry of Road Transport and Highways.
        </Text>
      </div>

      {/* Main Acknowledgement Slip Card */}
      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
        {/* Top Success Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-sm)] border-2 border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-success-text)] text-white text-base font-bold">
              ✓
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--color-success-text)] block">
                Form 2 Endorsement Application Generated
              </span>
              <span className="text-lg font-mono font-bold text-[var(--color-ink)]">
                Application Number: {appNumber}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge tone="primary" size="sm">
              e-KYC Verified
            </Badge>
            <span className="text-xs font-mono text-[var(--color-muted)]">
              Date: 09-09-2024
            </span>
          </div>
        </div>

        {/* 2-Column Application Particulars Summary */}
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] items-start">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 text-xs rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Applicant Full Name
                </span>
                <span className="text-sm font-bold text-[var(--color-ink)]">{holderName}</span>
              </div>

              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Father / Guardian Name
                </span>
                <span className="text-sm font-semibold text-[var(--color-ink)]">{fatherName}</span>
              </div>

              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Driving Licence Number
                </span>
                <span className="font-mono font-bold text-[var(--color-primary)]">{dlNumber}</span>
              </div>

              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Date of Birth & Blood Group
                </span>
                <span className="font-mono font-bold text-[var(--color-ink)]">{dob} · {bloodGroup}</span>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-[var(--color-border-subtle)]">
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Jurisdictional RTO Authority
                </span>
                <span className="font-bold text-[var(--color-ink)]">{rtoName}</span>
              </div>
            </div>

            {/* Services Requested & Document Proof Box */}
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs space-y-2">
              <span className="font-bold uppercase tracking-wider text-[var(--color-muted)] text-[0.6875rem] block">
                Services Requested & Verification Record:
              </span>

              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2">
                <span>1. Additional Endorsement to DL (MCWG - Two-Wheeler)</span>
                <Badge tone="success" size="sm">
                  Active
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-[var(--color-success-text)] pt-1 text-[0.6875rem] font-semibold">
                <CheckIcon size="sm" />
                <span>Identity and documents verified via contactless Aadhaar e-KYC</span>
              </div>
            </div>
          </div>

          {/* Right Column: QR Code & Print Actions */}
          <div className="flex flex-col items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5 text-center sm:w-48 space-y-3">
            <div className="size-28 bg-white border border-[var(--color-border)] p-1.5 flex items-center justify-center rounded shadow-sm">
              {/* Civic QR Simulation */}
              <div className="size-full bg-[var(--color-ink)]/90 rounded flex items-center justify-center text-white text-[0.625rem] font-mono text-center p-1">
                QR CODE VERIFIED
                <br />
                {appNumber}
              </div>
            </div>
            <span className="text-[0.625rem] font-mono text-[var(--color-muted)]">
              Scan for digital verify
            </span>

            <div className="w-full space-y-1.5 pt-1">
              <button
                type="button"
                className="w-full text-center rounded bg-white px-2 py-1 text-[0.6875rem] font-semibold text-[var(--color-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]"
              >
                Download Form 2 (PDF)
              </button>
              <button
                type="button"
                className="w-full text-center rounded bg-white px-2 py-1 text-[0.6875rem] font-semibold text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]"
              >
                Print Acknowledgement
              </button>
            </div>
          </div>
        </div>

        {/* Clear Action Direction (Replaces contradictory notes) */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-info-border)] bg-[var(--color-info-soft)] p-4 text-xs text-[var(--color-text)] flex items-start gap-3">
          <InfoIcon size="sm" className="text-[var(--color-info)] mt-0.5 shrink-0" />
          <div>
            <span className="font-bold text-[var(--color-info-text)] block">
              What Happens Next:
            </span>
            <p className="mt-0.5 text-xs text-[var(--color-muted)] leading-relaxed">
              To finalize your endorsement, please proceed to pay the statutory ₹850 government fee online. Once paid, you can select your preferred driving test appointment date at the Janakpuri Automated Test Track.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
          <Button variant="ghost" size="md" onClick={onViewDashboard} className="text-xs">
            View Journey Roadmap
          </Button>

          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRightIcon size="sm" />}
            onClick={onProceedToFee}
            className="font-bold shadow-md"
          >
            Proceed to Statutory Fee Payment (₹850)
          </Button>
        </div>
      </Card>
    </div>
  );
}
