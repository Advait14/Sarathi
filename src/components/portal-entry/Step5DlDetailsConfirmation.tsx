"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
  UserIcon,
  AlertTriangleIcon,
} from "@/components/ui/Icons";
import type { PortalServiceItem, StateRecord } from "@/data/portalEntry";

export interface Step5DlDetailsConfirmationProps {
  selectedState: StateRecord;
  selectedService: PortalServiceItem;
  dlNumber: string;
  dob: string;
  onBack: () => void;
  onNext: () => void;
}

export function Step5DlDetailsConfirmation({
  dlNumber,
  dob,
  onBack,
  onNext,
  selectedService,
  selectedState,
}: Step5DlDetailsConfirmationProps) {
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [pincode, setPincode] = useState("110058");
  const [holderCategory, setHolderCategory] = useState("general");
  const [error, setError] = useState<string | null>(null);

  const isPriya = dlNumber.includes("99887");
  const holderName = isPriya ? "Priya Verma" : "Advait Sharma";
  const fatherName = isPriya ? "Suresh Verma" : "Rajesh Sharma";
  const bloodGroup = isPriya ? "O+" : "B+";
  const rtoName = isPriya ? "ARTO Reasi (JK-20)" : "RTO Janakpuri, West Delhi (DL-04)";
  const issueDate = isPriya ? "29-06-2018" : "14-03-2011";
  const validityDate = isPriya ? "28-06-2038" : "13-03-2035";

  const handleProceed = () => {
    if (!isConfirmed) {
      setError("Please confirm that these driving licence particulars belong to you.");
      return;
    }
    setError(null);
    onNext();
  };

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
              ← DL Lookup
            </Button>
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Step 5 of 7 · Particulars & Jurisdiction
            </Badge>
          </div>
          <span className="text-xs font-bold text-[var(--color-ink)]">
            National Register Match
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Confirm Licence Details & RTO Jurisdiction
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Verify your driving licence record, active vehicle classes, and confirm the jurisdictional RTO office for your application.
        </Text>
      </div>

      {/* Main Details Card */}
      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
        {/* Top Licence Summary Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-sm)] border border-[var(--color-primary-border)] bg-[var(--color-primary-soft)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded bg-[var(--color-primary)] text-white">
              <UserIcon size="md" />
            </div>
            <div>
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                Driving Licence Number
              </span>
              <span className="text-base font-mono font-bold text-[var(--color-ink)]">
                {dlNumber}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge tone="success" size="sm" icon={<CheckIcon size="sm" />}>
              Active Non-Transport
            </Badge>
            <span className="text-xs font-mono text-[var(--color-muted)]">
              Issued: {issueDate} · Valid till {validityDate}
            </span>
          </div>
        </div>

        {/* 2-Column Particulars Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Left Column: Personal Particulars */}
          <div className="space-y-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-muted)] text-[0.6875rem] block pb-2 border-b border-[var(--color-border-subtle)]">
              Personal Particulars of DL Holder
            </span>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Full Name:</span>
                <span className="font-bold text-[var(--color-ink)] text-sm">{holderName}</span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Father / Guardian:</span>
                <span className="font-semibold text-[var(--color-ink)]">{fatherName}</span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Date of Birth:</span>
                <span className="font-mono font-semibold text-[var(--color-ink)]">{dob}</span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Blood Group:</span>
                <span className="font-mono font-bold text-[var(--color-primary)]">{bloodGroup}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Existing Vehicle Classes */}
          <div className="space-y-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-muted)] text-[0.6875rem] block pb-2 border-b border-[var(--color-border-subtle)]">
              Existing Authorized Vehicle Classes (COV)
            </span>

            <div className="space-y-2">
              <div className="flex items-center justify-between rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5">
                <div>
                  <span className="font-mono font-bold text-sm text-[var(--color-primary)] block">
                    LMV
                  </span>
                  <span className="text-[0.6875rem] text-[var(--color-muted)]">
                    Light Motor Vehicle (Motor Car / Jeep)
                  </span>
                </div>
                <Badge tone="neutral" size="sm">
                  Issued: {issueDate}
                </Badge>
              </div>

              <div className="rounded border border-dashed border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] p-2 text-[0.6875rem] text-[var(--color-accent-text)] flex items-center justify-between">
                <span>Requested Endorsement: <strong>MCWG (Two-Wheeler With Gear)</strong></span>
                <span className="font-bold">Pending Application</span>
              </div>
            </div>
          </div>
        </div>

        {/* RTO Jurisdiction & Category Confirmation Form */}
        <div className="border-t border-[var(--color-border)] pt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div>
              <label
                htmlFor="pincode-jurisdiction"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
              >
                Current Residential Pincode (Auto-matches RTO)
              </label>
              <input
                id="pincode-jurisdiction"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2 text-sm font-mono text-[var(--color-ink)] focus-visible:border-[var(--color-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
              />
              <span className="mt-1 block text-[0.6875rem] text-[var(--color-muted)]">
                Assigned Jurisdiction: <strong className="text-[var(--color-ink)]">{rtoName}</strong>
              </span>
            </div>

            <div>
              <label
                htmlFor="holder-category"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
              >
                Applicant Category
              </label>
              <select
                id="holder-category"
                value={holderCategory}
                onChange={(e) => setHolderCategory(e.target.value)}
                className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus-visible:border-[var(--color-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
              >
                <option value="general">General Public</option>
                <option value="ex_servicemen">Ex-Servicemen</option>
                <option value="physically_challenged">Physically Challenged (Adapted Vehicle)</option>
                <option value="diplomat">Diplomat / Foreign National</option>
              </select>
              <span className="mt-1 block text-[0.6875rem] text-[var(--color-muted)]">
                Statutory concessions apply automatically based on category.
              </span>
            </div>
          </div>

          {/* Simple Clean Confirmation Checkbox (replaces clunky YES/NO dropdown) */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="mt-0.5 size-4 rounded border-[var(--color-border-strong)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <div className="text-xs">
                <span className="font-bold text-[var(--color-ink)] block">
                  I confirm that the above Driving Licence details are mine and accurate.
                </span>
                <span className="text-[var(--color-muted)] text-[0.6875rem] block mt-0.5">
                  Your application will be mapped to {rtoName} for automated driving track evaluation.
                </span>
              </div>
            </label>
          </div>

          {error ? (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-[var(--radius-xs)] bg-[var(--color-danger-soft)] p-3 text-xs font-semibold text-[var(--color-danger-text)] border border-[var(--color-danger-border)]"
            >
              {error}
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
            <Button variant="secondary" size="md" onClick={onBack}>
              ← Back to DL Entry
            </Button>

            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRightIcon size="sm" />}
              onClick={handleProceed}
              className="font-bold shadow-sm"
            >
              Confirm Particulars & Verify Address
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
