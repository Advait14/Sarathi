"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ArrowRightIcon, CheckIcon, ShieldIcon } from "@/components/ui/Icons";
import type { ApplicantRecord } from "@/data/endorsement";

export interface StepVerifyDlProps {
  applicant: ApplicantRecord;
  onNext: (dlNumber: string, dob: string) => void;
}

export function StepVerifyDl({ applicant, onNext }: StepVerifyDlProps) {
  const [dlNumber, setDlNumber] = useState(applicant.dlNumber);
  const [dob, setDob] = useState(applicant.dateOfBirth);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dlNumber.trim() || !dob.trim()) {
      setError("Please provide both Driving Licence Number and Date of Birth.");
      return;
    }
    setError("");
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      onNext(dlNumber, dob);
    }, 400);
  };

  const handleFillDemo = () => {
    setDlNumber(applicant.dlNumber);
    setDob(applicant.dateOfBirth);
    setError("");
  };

  return (
    <div className="mt-8 space-y-6">
      <Card padding="lg" className="bg-[var(--color-surface)]">
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
            <Heading as="h2" variant="section">
              Enter Existing Licence Credentials
            </Heading>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-semibold text-[var(--color-accent-text)] hover:underline"
            >
              Fill synthetic demo credentials
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="dl-number-input"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
              >
                Driving Licence (DL) Number
              </label>
              <input
                id="dl-number-input"
                type="text"
                value={dlNumber}
                onChange={(e) => setDlNumber(e.target.value)}
                placeholder="e.g. DL-0420110023456"
                aria-describedby="dl-number-hint"
                aria-invalid={!!error}
                className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm font-mono text-[var(--color-ink)] focus-visible:border-[var(--color-focus)]"
                required
              />
              <span id="dl-number-hint" className="mt-1 block text-xs text-[var(--color-muted)]">
                Format: State code (2) - RTO code (2) Year (4) Number (7)
              </span>
            </div>

            <div>
              <label
                htmlFor="dob-input"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
              >
                Date of Birth (DD/MM/YYYY)
              </label>
              <input
                id="dob-input"
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="DD/MM/YYYY"
                aria-describedby="dob-hint"
                aria-invalid={!!error}
                className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm font-mono text-[var(--color-ink)] focus-visible:border-[var(--color-focus)]"
                required
              />
              <span id="dob-hint" className="mt-1 block text-xs text-[var(--color-muted)]">
                As recorded in your original driving licence
              </span>
            </div>
          </div>

          {error ? (
            <p
              role="alert"
              aria-live="assertive"
              className="rounded-[var(--radius-xs)] bg-[var(--color-danger-soft)] p-3 text-xs font-semibold text-[var(--color-danger-text)] border border-[var(--color-danger-border)]"
            >
              {error}
            </p>
          ) : null}


          <div className="rounded-[var(--radius-sm)] border border-[var(--color-info-border)] bg-[var(--color-info-soft)] p-4 text-xs text-[var(--color-text)] flex items-start gap-3">
            <ShieldIcon size="sm" className="mt-0.5 text-[var(--color-info)] shrink-0" />
            <div>
              <span className="font-bold text-[var(--color-ink)] block">
                Synthetic verification in prototype mode:
              </span>
              <p className="mt-0.5 leading-relaxed text-[var(--color-muted)]">
                This verification retrieves simulated national register records for demonstration. No live government servers are contacted.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isValidating}
              rightIcon={<ArrowRightIcon size="sm" />}
            >
              Verify Driving Licence
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
