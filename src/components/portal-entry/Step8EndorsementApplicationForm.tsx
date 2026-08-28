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
  FileTextIcon,
  InfoIcon,
  AlertTriangleIcon,
} from "@/components/ui/Icons";
import type { PortalServiceItem, StateRecord } from "@/data/portalEntry";
import { Form1PhysicalFitnessModal } from "./Form1PhysicalFitnessModal";


export interface Step8EndorsementApplicationFormProps {
  selectedState: StateRecord;
  selectedService: PortalServiceItem;
  dlNumber: string;
  dob: string;
  isAddressChanged: boolean;
  onBack: () => void;
  onSubmitApplication: () => void;
}

export function Step8EndorsementApplicationForm({
  dlNumber,
  dob,
  isAddressChanged,
  onBack,
  onSubmitApplication,
  selectedService,
  selectedState,
}: Step8EndorsementApplicationFormProps) {
  const [hasAttendedDrivingSchool, setHasAttendedDrivingSchool] = useState(false);
  const [drivingSchoolName, setDrivingSchoolName] = useState("Janakpuri Motor Driving Training School (Accredited)");
  const [enrollmentNumber, setEnrollmentNumber] = useState("DTS/DL04/2024/491");
  const [isForm1Open, setIsForm1Open] = useState(false);
  const [isForm1Completed, setIsForm1Completed] = useState(true);
  const [isDeclarationChecked, setIsDeclarationChecked] = useState(true);
  const [organDonation, setOrganDonation] = useState<"yes" | "no">("yes");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPriya = dlNumber.includes("99887");
  const holderName = isPriya ? "Priya Verma" : "Advait Sharma";
  const rtoName = isPriya ? "ARTO Reasi (JK-20)" : "RTO Janakpuri, West Delhi (DL-04)";
  const linkedLlNumber = isPriya ? "LL-042024009988" : "LL-042024008912";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDeclarationChecked) {
      setError("Please confirm the statutory declaration to submit Form 2.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmitApplication();
    }, 500);
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
              ← Authentication
            </Button>
            <Badge tone="primary" icon={<FileTextIcon size="sm" />}>
              Step 8 of 8 · Form 2 Endorsement Application
            </Badge>
          </div>
          <span className="text-xs font-bold text-[var(--color-ink)]">
            CMVR Rule 15 (Central Motor Vehicles Rules)
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Additional Endorsement on Driving Licence (Form 2)
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Apply to add Motorcycle With Gear (MCWG) to your existing licence using your verified Learner&apos;s Licence record.
        </Text>
      </div>

      {/* Main Form Card */}
      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
        {/* Applicant Context Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 text-xs">
          <div>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Applicant Name
            </span>
            <span className="text-sm font-bold text-[var(--color-ink)]">{holderName}</span>
          </div>
          <div>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Driving Licence No.
            </span>
            <span className="font-mono font-bold text-[var(--color-ink)]">{dlNumber}</span>
          </div>
          <div>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Jurisdictional RTO
            </span>
            <span className="font-bold text-[var(--color-primary)]">{rtoName}</span>
          </div>
          <div>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Application Type
            </span>
            <Badge tone="primary" size="sm">
              AEDL (Form 2)
            </Badge>
          </div>
        </div>

        {/* 1. Existing Classes vs Class For Addition */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Heading as="h2" variant="section">
              Vehicle Class to be Added
            </Heading>
            <span className="text-xs text-[var(--color-muted)]">
              CMVR Category: Non-Transport (Personal Use)
            </span>
          </div>

          <div className="rounded-[var(--radius-sm)] border-2 border-[var(--color-primary-border)] bg-[var(--color-primary-soft)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[var(--color-primary-border)]">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded bg-[var(--color-primary)] text-white font-bold text-sm">
                  🏍️
                </span>
                <div>
                  <span className="font-mono font-bold text-base text-[var(--color-ink)]">
                    MCWG · Motorcycle With Gear
                  </span>
                  <span className="text-xs text-[var(--color-muted)] block">
                    Two-Wheeler (Motorcycle, Scooter with gear) of any engine capacity
                  </span>
                </div>
              </div>

              <Badge tone="success" icon={<CheckIcon size="sm" />}>
                Linked LL Verified
              </Badge>
            </div>

            {/* Linked LL Record Grid */}
            <div className="grid gap-3 sm:grid-cols-3 text-xs">
              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Learner&apos;s Licence No.
                </span>
                <span className="font-mono font-bold text-[var(--color-ink)]">{linkedLlNumber}</span>
              </div>

              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  LL Issue & Validity
                </span>
                <span className="text-[var(--color-ink)]">Issued: 12-06-2024 (Valid till Dec 2024)</span>
              </div>

              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Statutory Rule 15 Status
                </span>
                <span className="font-semibold text-[var(--color-success-text)] flex items-center gap-1">
                  <CheckIcon size="sm" />
                  30-Day Holding Period Satisfied
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Optional Driving Training School Accreditation (Replaces cluttered mandatory fields) */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasAttendedDrivingSchool}
              onChange={(e) => setHasAttendedDrivingSchool(e.target.checked)}
              className="mt-0.5 size-4 rounded border-[var(--color-border-strong)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <div className="text-xs">
              <span className="font-bold text-[var(--color-ink)] block">
                I underwent training at an accredited Driver Training School (Optional for Non-Transport MCWG)
              </span>
              <span className="text-[var(--color-muted)] text-[0.6875rem] block mt-0.5">
                Check this only if you completed formal training at a state-registered driving school.
              </span>
            </div>
          </label>

          {hasAttendedDrivingSchool ? (
            <div className="grid gap-3 sm:grid-cols-2 pt-3 border-t border-[var(--color-border-subtle)] text-xs animate-in fade-in duration-150">
              <div>
                <label className="block text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-ink)]">
                  Accredited Driving School
                </label>
                <input
                  type="text"
                  value={drivingSchoolName}
                  onChange={(e) => setDrivingSchoolName(e.target.value)}
                  className="mt-1 w-full rounded border border-[var(--color-border-strong)] bg-white px-3 py-1.5 text-xs text-[var(--color-ink)]"
                />
              </div>

              <div>
                <label className="block text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-ink)]">
                  Enrollment / Certificate Reference
                </label>
                <input
                  type="text"
                  value={enrollmentNumber}
                  onChange={(e) => setEnrollmentNumber(e.target.value)}
                  className="mt-1 w-full rounded border border-[var(--color-border-strong)] bg-white px-3 py-1.5 text-xs font-mono text-[var(--color-ink)]"
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* 3. Physical Fitness Self-Declaration (Form 1) */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded bg-[var(--color-success-soft)] text-[var(--color-success-text)] font-bold">
              ✓
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--color-ink)] block">
                Physical Fitness Self-Declaration (Form 1)
              </span>
              <span className="text-[0.6875rem] text-[var(--color-muted)]">
                {isForm1Completed
                  ? "Self-declaration completed · Certified fit for non-transport category"
                  : "Required under CMVR Rule 5"}
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setIsForm1Open(!isForm1Open)}
            className="text-xs font-semibold"
          >
            {isForm1Open ? "Hide Form 1 Details" : "Review Form 1 Declaration ↗"}
          </Button>
        </div>

        {/* Form 1 Accordion Questions */}
        {isForm1Open ? (
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-info-border)] bg-[var(--color-info-soft)] p-4 text-xs space-y-3 animate-in fade-in duration-150">
            <span className="font-bold text-[var(--color-info-text)] block">
              Form 1 Medical Self-Declaration Criteria (CMVR Rule 5):
            </span>
            <ul className="space-y-1.5 text-[var(--color-text)] list-disc pl-4 text-[0.6875rem]">
              <li>Do you suffer from epilepsy or sudden attacks of disabling giddiness? — <strong>NO</strong></li>
              <li>Are you able to distinguish motor vehicles at 25 metres in good daylight? — <strong>YES</strong></li>
              <li>Have you lost either hand or foot, or suffer from defect in movement? — <strong>NO</strong></li>
              <li>Do you suffer from night blindness or colour perception defect? — <strong>NO</strong></li>
              <li>Do you suffer from deafness hindering vehicle horn awareness? — <strong>NO</strong></li>
            </ul>
          </div>
        ) : null}

        {/* 4. Statutory Declaration & Organ Donation Consent */}
        <form onSubmit={handleSubmit} className="space-y-5 border-t border-[var(--color-border)] pt-5">
          {/* Organ Donation Consent */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] p-4 space-y-2">
            <span className="text-xs font-bold text-[var(--color-accent-text)] block">
              National Organ Donation Pledge (Optional Civic Initiative):
            </span>
            <p className="text-xs text-[var(--color-text)]">
              Are you willing to donate your organs in case of accidental death to save lives?
            </p>
            <div className="flex items-center gap-6 pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[var(--color-ink)]">
                <input
                  type="radio"
                  name="organDonation"
                  checked={organDonation === "yes"}
                  onChange={() => setOrganDonation("yes")}
                  className="text-[var(--color-primary)]"
                />
                Yes, I pledge to donate
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[var(--color-muted)]">
                <input
                  type="radio"
                  name="organDonation"
                  checked={organDonation === "no"}
                  onChange={() => setOrganDonation("no")}
                  className="text-[var(--color-primary)]"
                />
                No / Not at this time
              </label>
            </div>
          </div>

          {/* Consolidated Legal Declaration (Replaces 4 repetitive checkboxes) */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isDeclarationChecked}
                onChange={(e) => setIsDeclarationChecked(e.target.checked)}
                className="mt-0.5 size-4 rounded border-[var(--color-border-strong)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <div className="text-xs">
                <span className="font-bold text-[var(--color-ink)] block">
                  Statutory Application Declaration under Motor Vehicles Act, 1988:
                </span>
                <p className="text-[var(--color-muted)] text-[0.6875rem] leading-relaxed mt-1">
                  I hereby declare that my existing driving licence is not impounded or suspended by any transport authority. The details provided in this Form 2 application match the records of the national registry. I understand that an updated smart card with MCWG endorsement will be issued upon passing the automated driving test.
                </p>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3">
            <Button type="button" variant="secondary" size="md" onClick={onBack}>
              ← Back to Authentication
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              rightIcon={<ArrowRightIcon size="sm" />}
              className="font-bold shadow-md text-xs sm:text-sm"
            >
              Submit Form 2 Application (Proceed to Fee & Slot Booking)
            </Button>
          </div>
        </form>
      </Card>

      {/* Form 1 Interactive Physical Fitness Modal */}
      <Form1PhysicalFitnessModal
        isOpen={isForm1Open}
        onClose={() => setIsForm1Open(false)}
        onSubmitted={() => setIsForm1Completed(true)}
      />
    </div>
  );
}

