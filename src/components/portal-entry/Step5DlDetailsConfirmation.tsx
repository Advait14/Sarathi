"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { Alert } from "@/components/ui/Alert";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
  UserIcon,
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
    <div className="w-full space-y-6 animate-in fade-in duration-300">
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
              Details &amp; Confirmation
            </Badge>
          </div>
          <span className="badge badge-outline badge-md font-bold text-[var(--color-ink)]">
            National Register Match
          </span>
        </div>

        <Heading as="h1" className="mt-3 text-2xl sm:text-3xl font-black text-[var(--color-ink)] tracking-tight">
          Confirm Licence Details &amp; RTO Jurisdiction
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl">
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
                <span className="font-semibold text-[var(--color-ink)]">{dob || "15/08/1995"}</span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Blood Group:</span>
                <span className="font-semibold text-[var(--color-ink)]">{bloodGroup}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Registered Address:</span>
                <span className="font-semibold text-[var(--color-ink)] leading-tight block mt-0.5">
                  B-4/122, Janakpuri, West Delhi, New Delhi - 110058
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Vehicle Class & Jurisdiction */}
          <div className="space-y-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-muted)] text-[0.6875rem] block pb-2 border-b border-[var(--color-border-subtle)]">
              Authorised Vehicle Classes &amp; RTO Jurisdiction
            </span>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2 rounded bg-white border border-[var(--color-border-subtle)]">
                <span className="font-bold text-[var(--color-ink)]">LMV (Light Motor Vehicle - 4 Wheeler)</span>
                <Badge tone="success" size="sm">Active</Badge>
              </div>

              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Issuing Authority:</span>
                <span className="font-bold text-[var(--color-ink)] text-sm">{rtoName}</span>
              </div>

              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Service Requested:</span>
                <span className="font-bold text-[var(--color-primary)]">
                  Addition of Class of Vehicle — MCWG (Motorcycle With Gear)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="p-4 rounded-[var(--radius-sm)] bg-slate-50 border border-slate-200">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => {
                setIsConfirmed(e.target.checked);
                if (e.target.checked) setError(null);
              }}
              className="checkbox checkbox-primary checkbox-sm mt-0.5"
            />
            <span className="text-xs text-[var(--color-text)] font-medium leading-relaxed">
              I confirm that the above driving licence details belong to me and I am applying for an additional class endorsement (MCWG) under the jurisdiction of <strong>{rtoName}</strong>.
            </span>
          </label>
        </div>

        {error && <Alert type="error">{error}</Alert>}

        {/* Action Footer */}
        <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="secondary"
            size="md"
            onClick={onBack}
            className="w-full sm:w-auto text-xs"
          >
            ← Back to DL Lookup
          </Button>

          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRightIcon size="md" />}
            onClick={handleProceed}
            className="w-full sm:w-auto font-black shadow-md bg-[var(--color-primary)] text-sm sm:text-base py-3 px-8"
          >
            Confirm Details &amp; Proceed to Address
          </Button>
        </div>
      </Card>
    </div>
  );
}
