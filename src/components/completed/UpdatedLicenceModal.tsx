"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { CheckIcon, ShieldIcon, UserIcon } from "@/components/ui/Icons";
import type { UpdatedLicenceData } from "@/data/completed";

export interface UpdatedLicenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  licenceData: UpdatedLicenceData;
}

export function UpdatedLicenceModal({
  isOpen,
  licenceData,
  onClose,
}: UpdatedLicenceModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const {
    authorizedClasses,
    bloodGroup,
    dateOfBirth,
    endorsementDate,
    fatherOrHusbandName,
    holderName,
    issuingAuthority,
    licenceNumber,
    originalIssueDate,
    registeredAddress,
    validityNonTransport,
  } = licenceData;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="licence-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-2xl overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-6 py-4">
          <div className="flex items-center gap-2">
            <ShieldIcon size="md" className="text-[var(--color-primary)]" />
            <Heading as="h3" id="licence-modal-title" variant="section">
              Updated Driving Licence Card
            </Heading>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close driving licence details modal"
            className="rounded p-1 text-[var(--color-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
          >
            <span className="text-xl font-bold leading-none" aria-hidden="true">&times;</span>
          </button>

        </div>

        {/* Modal Body: Driving Licence Card Graphic */}
        <div className="p-6">
          <div className="rounded-[var(--radius-sm)] border-2 border-[var(--color-primary)] bg-[var(--color-canvas)] p-5 shadow-sm">
            {/* Card Emblem Header */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Union of India · Transport Department
                </span>
                <span className="text-xs font-bold text-[var(--color-ink)] block">
                  Government of NCT of Delhi
                </span>
              </div>
              <Badge tone="success">Active on National Register</Badge>
            </div>

            {/* Main Info Grid */}
            <div className="mt-4 grid gap-4 sm:grid-cols-[110px_minmax(0,1fr)]">
              {/* Photo Placeholder */}
              <div className="flex flex-col items-center justify-center rounded border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 text-center">
                <UserIcon size="lg" className="text-[var(--color-muted)]" />
                <span className="mt-2 text-[0.625rem] font-bold text-[var(--color-muted)] uppercase">
                  Digital Photo
                </span>
              </div>

              {/* Personal & Licence Details */}
              <div className="space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between">
                  <span className="font-bold text-[var(--color-muted)]">Licence No:</span>
                  <span className="font-mono font-bold text-sm text-[var(--color-ink)]">
                    {licenceNumber}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between">
                  <span className="font-bold text-[var(--color-muted)]">Name:</span>
                  <span className="font-bold text-sm text-[var(--color-ink)]">{holderName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[0.6875rem]">
                  <div>
                    <span className="text-[var(--color-muted)] block">DOB:</span>
                    <span className="font-mono font-medium text-[var(--color-ink)]">{dateOfBirth}</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-muted)] block">Blood Group:</span>
                    <span className="font-bold text-[var(--color-ink)]">{bloodGroup}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[0.6875rem] pt-1">
                  <div>
                    <span className="text-[var(--color-muted)] block">First Issued:</span>
                    <span className="font-mono font-medium text-[var(--color-ink)]">{originalIssueDate}</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-muted)] block">Valid Till (NT):</span>
                    <span className="font-mono font-bold text-[var(--color-success-text)]">{validityNonTransport}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Authorized Classes Table */}
            <div className="mt-5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block pb-1 mb-2 border-b border-[var(--color-border-subtle)]">
                Vehicles Authorized to Drive (COV)
              </span>

              <div className="space-y-2 text-xs">
                {authorizedClasses.map((cov) => (
                  <div
                    key={cov.code}
                    className="flex items-center justify-between rounded p-2 bg-[var(--color-surface-subtle)] border border-[var(--color-border-subtle)]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[var(--color-primary)]">
                          {cov.code}
                        </span>
                        <span className="text-xs font-semibold text-[var(--color-ink)]">
                          {cov.title}
                        </span>
                      </div>
                      <span className="text-[0.6875rem] text-[var(--color-muted)]">
                        Issue/Endorsement Date: {cov.issueDate}
                      </span>
                    </div>

                    <Badge tone={cov.code === "MCWG" ? "primary" : "neutral"} size="sm">
                      {cov.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Issuing Authority & Address */}
            <div className="mt-3 text-[0.6875rem] text-[var(--color-muted)] border-t border-[var(--color-border-subtle)] pt-2 flex flex-wrap justify-between gap-1">
              <span>{issuingAuthority}</span>
              <span>Endorsed on: {endorsementDate}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-6 py-4">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
