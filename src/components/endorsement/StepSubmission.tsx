"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ArrowRightIcon, CheckIcon, FileTextIcon, ShieldIcon } from "@/components/ui/Icons";
import type { ApplicantRecord } from "@/data/endorsement";

export interface StepSubmissionProps {
  applicant: ApplicantRecord;
  selectedClass: string;
  onNext: (applicationReference: string) => void;
}

export function StepSubmission({ applicant, onNext, selectedClass }: StepSubmissionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const applicationReference = "SJ-MCWG-2048";

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="mt-8 space-y-6">
      {!isSubmitted ? (
        /* Pre-Submission Review Card */
        <Card padding="lg" className="bg-[var(--color-surface)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
            <div className="flex items-center gap-2">
              <Badge tone="primary" icon={<FileTextIcon size="sm" />}>
                Form 2 Summary
              </Badge>
              <span className="text-xs font-semibold text-[var(--color-ink)]">
                Pre-Submission Review
              </span>
            </div>
            <span className="text-xs text-[var(--color-muted)]">
              Addition of Class of Vehicle
            </span>
          </div>

          <div className="mt-4">
            <Heading as="h2" variant="section">
              Review Endorsement Application Details
            </Heading>
            <Text className="mt-1 text-sm text-[var(--color-text)]" variant="body">
              Confirm your application details before formal submission to generate your application reference.
            </Text>
          </div>

          {/* Application Summary Grid */}
          <div className="mt-6 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5">
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Applicant Name
                </dt>
                <dd className="mt-1 text-sm font-bold text-[var(--color-ink)]">
                  {applicant.fullName}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Existing DL Number
                </dt>
                <dd className="mt-1 text-sm font-mono font-medium text-[var(--color-ink)]">
                  {applicant.dlNumber} (LMV)
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]">
                  Class to be Added
                </dt>
                <dd className="mt-1 text-sm font-bold text-[var(--color-accent-text)]">
                  {selectedClass} (Motorcycle With Gear)
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Linked Learner Licence
                </dt>
                <dd className="mt-1 text-sm font-mono text-[var(--color-ink)]">
                  {applicant.learnerLicence.llNumber}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Processing RTO
                </dt>
                <dd className="mt-1 text-sm text-[var(--color-ink)]">
                  {applicant.rtoOffice.name}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Declarations Status
                </dt>
                <dd className="mt-1 text-sm text-[var(--color-success-text)] font-semibold flex items-center gap-1">
                  <CheckIcon size="sm" />
                  Form 1 Fitness Completed
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3.5 text-xs text-[var(--color-muted)] flex items-start gap-2.5">
            <ShieldIcon size="sm" className="shrink-0 text-[var(--color-muted)] mt-0.5" />
            <p>
              By submitting this form, you certify that all information supplied is complete and true. Upon submission, an application reference number is assigned to track payment, slot booking, and test progress.
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-6 border-t border-[var(--color-border)] pt-4">
            <Button
              variant="primary"
              size="md"
              loading={isSubmitting}
              rightIcon={<ArrowRightIcon size="sm" />}
              onClick={handleSubmit}
            >
              Submit Endorsement Application
            </Button>
          </div>
        </Card>
      ) : (
        /* Post-Submission Confirmation Slip */
        <Card
          padding="lg"
          className="border-2 border-[var(--color-success)] bg-[var(--color-surface)] shadow-card"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
            <Badge tone="success" icon={<CheckIcon size="sm" />}>
              Application Submitted Successfully
            </Badge>
            <span className="text-xs text-[var(--color-muted)]">
              Synthetic Reference Generated
            </span>
          </div>

          <div className="mt-5 text-center sm:text-left">
            <Heading as="h2" variant="heading">
              Application Reference Assigned
            </Heading>
            <Text className="mt-1 text-sm text-[var(--color-text)]" variant="body">
              Your MCWG endorsement application has been registered.
            </Text>
          </div>

          {/* Reference Card */}
          <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-success-text)]">
                  Application Reference Number
                </span>
                <p className="mt-1 text-2xl font-mono font-bold text-[var(--color-ink)]">
                  {applicationReference}
                </p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">
                  Save this reference for all future inquiries.
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-success-text)]">
                  Current Stage
                </span>
                <p className="mt-1 text-base font-bold text-[var(--color-ink)]">
                  Payment Pending
                </p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">
                  Step 7 of 9 in Endorsement Flow
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 border-t border-[var(--color-border)] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Text as="span" variant="caption" className="text-[var(--color-muted)]">
              Next step: Complete government fee payment to unlock test slot booking.
            </Text>
            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRightIcon size="sm" />}
              onClick={() => onNext(applicationReference)}
            >
              Proceed to Fee Payment
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
