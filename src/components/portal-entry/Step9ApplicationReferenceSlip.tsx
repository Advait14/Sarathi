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
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] pb-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge tone="success" icon={<CheckIcon size="sm" />}>
            Application Registered
          </Badge>
          <span className="font-mono text-xs font-bold text-[var(--color-ink)]">
            Ref: {appNumber}
          </span>
        </div>

        <Heading as="h1" className="mt-3 text-2xl sm:text-3xl font-black text-[var(--color-ink)] tracking-tight">
          Application Reference Details &amp; Acknowledgement
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl">
          Your Form 2 application for MCWG endorsement has been officially registered with the Ministry of Road Transport and Highways.
        </Text>
      </div>

      {/* Main Acknowledgement Slip Card */}
      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
        {/* Top Success Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-sm)] border-2 border-emerald-500 bg-emerald-50/80 p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-emerald-600 text-white text-base font-bold shadow-xs">
              ✓
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 block">
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
                  Date of Birth &amp; Blood Group
                </span>
                <span className="font-mono font-bold text-[var(--color-ink)]">{dob || "15/08/1995"} · {bloodGroup}</span>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-[var(--color-border-subtle)]">
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Jurisdictional RTO Authority
                </span>
                <span className="font-bold text-[var(--color-ink)]">{rtoName}</span>
              </div>
            </div>

            {/* Services Requested */}
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white p-4 space-y-2 text-xs">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                Services Registered Under This Application:
              </span>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                <span className="font-bold text-[var(--color-ink)]">
                  Addition of Class of Vehicle — MCWG (Motorcycle With Gear)
                </span>
                <Badge tone="primary" size="sm">Endorsement</Badge>
              </div>
            </div>
          </div>

          {/* Quick QR Receipt Box */}
          <div className="w-full sm:w-48 rounded-[var(--radius-sm)] border border-slate-200 bg-slate-50 p-4 text-center space-y-2">
            <div className="size-28 mx-auto bg-white border border-slate-300 rounded p-2 flex items-center justify-center font-mono text-[0.6875rem] text-slate-400">
              [QR VERIFIED]
            </div>
            <span className="text-[0.625rem] font-mono text-[var(--color-muted)] block">
              Scan on Parivahan App
            </span>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<FileTextIcon size="sm" />}
              onClick={() => alert("Printing Application Acknowledgement Slip...")}
              className="w-full text-xs font-semibold"
            >
              Print Receipt
            </Button>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="secondary"
            size="md"
            onClick={onViewDashboard}
            className="w-full sm:w-auto text-xs"
          >
            View in Dashboard
          </Button>

          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRightIcon size="md" />}
            onClick={onProceedToFee}
            className="w-full sm:w-auto font-black shadow-md bg-[var(--color-primary)] text-sm sm:text-base py-3 px-8"
          >
            Pay Statutory Fee (₹850) →
          </Button>
        </div>
      </Card>
    </div>
  );
}
