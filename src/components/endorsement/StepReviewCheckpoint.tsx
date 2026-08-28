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
  UserIcon,
} from "@/components/ui/Icons";
import type { ApplicantRecord } from "@/data/endorsement";

export interface StepReviewCheckpointProps {
  applicant: ApplicantRecord;
  selectedClass: string;
  applicationReference: string;
  onBack: () => void;
  onProceedToPayment: () => void;
}

export function StepReviewCheckpoint({
  applicant,
  applicationReference,
  onBack,
  onProceedToPayment,
  selectedClass = "MCWG",
}: StepReviewCheckpointProps) {
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
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
              ← Back to Declarations
            </Button>
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Step 6 of 8 · Application Review Checkpoint
            </Badge>
          </div>
          <span className="text-xs font-mono font-bold text-[var(--color-ink)]">
            Reference: {applicationReference}
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Review Application Before Statutory Payment
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Please verify your Form 2 endorsement details and pre-filled records before proceeding to the government treasury fee payment.
        </Text>
      </div>

      {/* Main Review Summary Card */}
      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
        {/* Top Summary Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-sm)] border-2 border-[var(--color-primary-border)] bg-[var(--color-primary-soft)] p-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] block">
              Application Summary (Form 2)
            </span>
            <span className="text-base font-bold text-[var(--color-ink)]">
              Addition of Vehicle Class: MCWG (Motorcycle With Gear)
            </span>
          </div>
          <Badge tone="success" size="sm" icon={<CheckIcon size="sm" />}>
            Ready for Treasury Submission
          </Badge>
        </div>

        {/* 2-Column Details Grid */}
        <div className="grid gap-6 sm:grid-cols-2 text-xs">
          {/* Left Column: Applicant & Licence Context */}
          <div className="space-y-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
            <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)] pb-2 font-bold text-[var(--color-ink)]">
              <UserIcon size="sm" className="text-[var(--color-primary)]" />
              <span>Applicant & Licence Particulars</span>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Full Name & Relationship
                </span>
                <span className="font-bold text-[var(--color-ink)]">
                  {applicant.fullName} (S/o {applicant.fatherName})
                </span>
              </div>

              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Existing Driving Licence
                </span>
                <span className="font-mono font-bold text-[var(--color-primary)]">
                  {applicant.dlNumber} · Authorized: LMV (Light Motor Vehicle)
                </span>
              </div>

              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Date of Birth & Blood Group
                </span>
                <span className="font-mono text-[var(--color-ink)] font-semibold">
                  {applicant.dateOfBirth} · {applicant.bloodGroup}
                </span>
              </div>

              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Licensing Authority Jurisdiction
                </span>
                <span className="font-semibold text-[var(--color-ink)]">
                  {applicant.rtoOffice.name} ({applicant.rtoOffice.code})
                </span>
              </div>

              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Smart Card Delivery Address
                </span>
                <span className="text-[var(--color-text)]">
                  {applicant.currentAddress.street}, {applicant.currentAddress.locality},{" "}
                  {applicant.currentAddress.city} - {applicant.currentAddress.pincode}
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Pre-requisites & Verification Records */}
          <div className="space-y-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
            <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)] pb-2 font-bold text-[var(--color-ink)]">
              <FileTextIcon size="sm" className="text-[var(--color-success)]" />
              <span>Verified Documents & Declarations</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start justify-between rounded bg-white p-2.5 border border-[var(--color-border-subtle)]">
                <div>
                  <span className="font-bold text-[var(--color-ink)] block">
                    1. Existing DL Verification
                  </span>
                  <span className="text-[0.6875rem] text-[var(--color-muted)]">
                    Active on Sarathi national registry
                  </span>
                </div>
                <Badge tone="success" size="sm">
                  Verified
                </Badge>
              </div>

              <div className="flex items-start justify-between rounded bg-white p-2.5 border border-[var(--color-border-subtle)]">
                <div>
                  <span className="font-bold text-[var(--color-ink)] block">
                    2. Linked MCWG Learner&apos;s Licence
                  </span>
                  <span className="text-[0.6875rem] text-[var(--color-muted)]">
                    LL-0420260089123 · 30-day holding satisfied
                  </span>
                </div>
                <Badge tone="success" size="sm">
                  Verified
                </Badge>
              </div>

              <div className="flex items-start justify-between rounded bg-white p-2.5 border border-[var(--color-border-subtle)]">
                <div>
                  <span className="font-bold text-[var(--color-ink)] block">
                    3. Contactless Identity Auth (e-KYC)
                  </span>
                  <span className="text-[0.6875rem] text-[var(--color-muted)]">
                    Verified via Aadhaar OTP
                  </span>
                </div>
                <Badge tone="success" size="sm">
                  Authenticated
                </Badge>
              </div>

              <div className="flex items-start justify-between rounded bg-white p-2.5 border border-[var(--color-border-subtle)]">
                <div>
                  <span className="font-bold text-[var(--color-ink)] block">
                    4. Medical Declaration (Form 1)
                  </span>
                  <span className="text-[0.6875rem] text-[var(--color-muted)]">
                    CMVR Rule 5 Self-Declaration certified fit
                  </span>
                </div>
                <Badge tone="success" size="sm">
                  Completed
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Notice Box */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-4 text-xs">
          <div>
            <span className="font-bold text-[var(--color-ink)] block">
              Total Statutory Payable: ₹850.00
            </span>
            <span className="text-[0.6875rem] text-[var(--color-muted)]">
              Includes Endorsement Fee (₹500), Automated Test Track Fee (₹300), and Speed Post Smart Card Dispatch (₹50).
            </span>
          </div>

          <span className="text-base font-mono font-bold text-[var(--color-primary)]">
            ₹850.00
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
          <Button variant="secondary" size="md" onClick={onBack}>
            ← Back to Edit
          </Button>

          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRightIcon size="sm" />}
            onClick={onProceedToPayment}
            className="font-bold shadow-md text-xs sm:text-sm"
          >
            Submit &amp; Proceed to Statutory Payment (₹850)
          </Button>
        </div>
      </Card>
    </div>
  );
}
