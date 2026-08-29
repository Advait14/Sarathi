"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import {
  CheckIcon,
  ShieldIcon,
  FileTextIcon,
  ArrowRightIcon,
  DownloadIcon,
  HomeIcon,
  UserIcon,
} from "@/components/ui/Icons";
import type { UpdatedLicenceData } from "@/data/completed";

export interface CompletedStateCardProps {
  licenceData: UpdatedLicenceData;
  onViewUpdatedLicence: () => void;
  onViewJourney: () => void;
  onBackToLanding?: () => void;
}

export function CompletedStateCard({
  licenceData,
  onViewJourney,
  onViewUpdatedLicence,
  onBackToLanding,
}: CompletedStateCardProps) {
  const {
    authorizedClasses,
    bloodGroup,
    dateOfBirth,
    endorsementDate,
    fatherOrHusbandName,
    holderName,
    issuingAuthority,
    licenceNumber,
    validityNonTransport,
  } = licenceData;

  const handleDownloadPdf = () => {
    alert("Downloading Official Digital Driving Licence (Form 7 - LMV+MCWG) PDF...");
  };

  return (
    <div className="space-y-6">
      {/* 1. Digital Driving Licence Card Inline Component */}
      <Card padding="none" className="bg-[var(--color-surface)] border-2 border-[var(--color-primary)] shadow-card overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-[#003366] to-[#0B57D0] px-5 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldIcon size="sm" className="text-white" />
            <div>
              <span className="text-[0.625rem] uppercase tracking-wider font-bold text-white/80 block leading-tight">
                Union of India · Transport Department
              </span>
              <span className="text-xs font-bold text-white leading-tight block">
                Government of NCT of Delhi · Driving Licence
              </span>
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[0.6875rem] font-mono font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
            DIGITAL COPY
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          {/* Main Details Grid */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            {/* Avatar / Photo placeholder */}
            <div className="flex flex-col items-center gap-1.5 shrink-0 self-center sm:self-start">
              <div className="w-20 h-24 rounded border-2 border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-col items-center justify-center p-2 text-center shadow-inner">
                <UserIcon size="lg" className="text-[var(--color-muted)]" />
                <span className="text-[0.5625rem] text-[var(--color-muted)] font-semibold mt-1">
                  PHOTO
                </span>
              </div>
              <span className="text-[0.5625rem] font-mono font-bold text-[var(--color-muted)]">
                CHIP SECURE
              </span>
            </div>

            {/* Candidate & Licence Info */}
            <div className="flex-1 space-y-2 text-xs w-full">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[0.625rem] font-bold text-[var(--color-muted)] uppercase tracking-wider block">
                    Licence Number
                  </span>
                  <span className="font-mono font-black text-sm text-[var(--color-primary)]">
                    {licenceNumber}
                  </span>
                </div>
                <Badge tone="success" size="sm">
                  Active
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[var(--color-border-subtle)]">
                <div>
                  <span className="text-[0.625rem] text-[var(--color-muted)] block">Name:</span>
                  <span className="font-bold text-[var(--color-ink)]">{holderName}</span>
                </div>
                <div>
                  <span className="text-[0.625rem] text-[var(--color-muted)] block">Father&apos;s Name:</span>
                  <span className="font-semibold text-[var(--color-ink)]">{fatherOrHusbandName}</span>
                </div>
                <div>
                  <span className="text-[0.625rem] text-[var(--color-muted)] block">DOB / Blood:</span>
                  <span className="font-semibold text-[var(--color-ink)]">{dateOfBirth} ({bloodGroup})</span>
                </div>
                <div>
                  <span className="text-[0.625rem] text-[var(--color-muted)] block">Valid Upto (NT):</span>
                  <span className="font-semibold text-[var(--color-ink)]">{validityNonTransport}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Authorized Classes Matrix */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3">
            <span className="text-[0.625rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block mb-1.5">
              Authorized Vehicle Classes (Form 7 Record)
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-1.5 rounded bg-white border border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 text-[0.6875rem] border border-blue-200">
                    LMV
                  </span>
                  <span className="font-medium text-[var(--color-ink)]">Light Motor Vehicle (Car)</span>
                </div>
                <span className="text-[0.6875rem] font-bold text-[var(--color-muted)]">Active since 2015</span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[0.6875rem] border border-emerald-300">
                    MCWG
                  </span>
                  <span className="font-bold text-emerald-950">Motorcycle With Gear (Two-Wheeler)</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[0.6875rem] font-black text-emerald-700 uppercase">
                  <CheckIcon size="sm" className="stroke-[3]" />
                  Newly Endorsed
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions for Digital Licence */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<DownloadIcon size="sm" />}
              onClick={handleDownloadPdf}
              className="flex-1 font-bold text-xs shadow-sm bg-[var(--color-primary)]"
            >
              Download Digital Copy (PDF)
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<FileTextIcon size="sm" />}
              onClick={onViewUpdatedLicence}
              className="flex-1 text-xs font-semibold"
            >
              Smart Card Details
            </Button>
          </div>
        </div>
      </Card>

      {/* 2. Dispatch & Registry Summary Card */}
      <Card padding="md" className="bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2.5">
          <span className="font-bold text-sm text-[var(--color-ink)]">
            National Registry & Physical Dispatch
          </span>
          <StatusIndicator label="Active in All Systems" status="complete" size="sm" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3">
            <span className="text-[0.625rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              DigiLocker & mParivahan
            </span>
            <p className="mt-1 font-bold text-[var(--color-ink)] text-xs">
              Live Synchronized
            </p>
            <p className="text-[0.6875rem] text-[var(--color-muted)] mt-0.5">
              Pull DL-0420110023456 in DigiLocker app anytime.
            </p>
          </div>

          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3">
            <span className="text-[0.625rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Smart Card Speed Post
            </span>
            <p className="mt-1 font-mono font-bold text-[var(--color-ink)] text-xs">
              #ED881290345IN
            </p>
            <p className="text-[0.6875rem] text-[var(--color-muted)] mt-0.5">
              Dispatched to registered Delhi address.
            </p>
          </div>
        </div>

        {/* 3. Action Button to Go Back to Main Landing Page */}
        <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-end">
          {onBackToLanding && (
            <Button
              variant="secondary"
              size="md"
              leftIcon={<HomeIcon size="sm" />}
              onClick={onBackToLanding}
              className="w-full font-bold text-xs shadow-sm bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface-muted)]"
            >
              Back to Main Landing Page
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
