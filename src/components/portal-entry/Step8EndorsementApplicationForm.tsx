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
  FileTextIcon,
  InfoIcon,
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
              ← Authentication
            </Button>
            <Badge tone="primary" icon={<FileTextIcon size="sm" />}>
              Form 2 Application
            </Badge>
          </div>
          <span className="badge badge-outline badge-md font-bold text-[var(--color-ink)]">
            CMVR Rule 15
          </span>
        </div>

        <Heading as="h1" className="mt-3 text-2xl sm:text-3xl font-black text-[var(--color-ink)] tracking-tight">
          Additional Endorsement on Driving Licence (Form 2)
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: Vehicle Class to Add */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
                1. Vehicle Class Endorsement Selected:
              </span>
              <span className="badge badge-success badge-sm font-semibold gap-1">
                <CheckIcon size="sm" />
                Learner Licence Active
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded bg-white border border-[var(--color-border)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs border border-emerald-300">
                    MCWG
                  </span>
                  <span className="font-bold text-sm text-[var(--color-ink)]">
                    Motorcycle With Gear (Two-Wheeler)
                  </span>
                </div>
                <p className="text-xs text-[var(--color-muted)] mt-1">
                  Linked to active Learner Licence: <span className="font-mono font-bold text-[var(--color-ink)]">{linkedLlNumber}</span>
                </p>
              </div>

              <Badge tone="primary" size="sm">
                Endorsement Target
              </Badge>
            </div>
          </div>

          {/* SECTION 2: Form 1 Physical Fitness Declaration */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
                2. Physical Fitness Declaration (Form 1):
              </span>
              <span className="badge badge-success badge-sm font-semibold">
                Self-Declaration Complete
              </span>
            </div>

            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              Under CMVR rules, non-transport vehicle endorsement requires Form 1 self-declaration of physical fitness.
            </p>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsForm1Open(true)}
                className="text-xs font-bold"
              >
                Review Form 1 Self-Declaration Answers
              </Button>
            </div>
          </div>

          {/* SECTION 3: Accredited Driving School Training */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
              3. Driving Training School Certificate (Optional):
            </span>

            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasAttendedDrivingSchool}
                onChange={(e) => setHasAttendedDrivingSchool(e.target.checked)}
                className="checkbox checkbox-primary checkbox-sm mt-0.5"
              />
              <span className="text-xs text-[var(--color-text)] font-semibold">
                I have completed driving training at a recognized/accredited motor driving school
              </span>
            </label>

            {hasAttendedDrivingSchool && (
              <div className="grid gap-3 sm:grid-cols-2 pt-2 animate-in fade-in duration-200">
                <div className="form-control">
                  <label className="label-text text-[0.6875rem] font-bold text-[var(--color-muted)] block mb-1">
                    Driving School Name
                  </label>
                  <input
                    type="text"
                    value={drivingSchoolName}
                    onChange={(e) => setDrivingSchoolName(e.target.value)}
                    className="input input-bordered input-sm w-full text-xs font-medium bg-white"
                  />
                </div>
                <div className="form-control">
                  <label className="label-text text-[0.6875rem] font-bold text-[var(--color-muted)] block mb-1">
                    Enrollment / Certificate Reference
                  </label>
                  <input
                    type="text"
                    value={enrollmentNumber}
                    onChange={(e) => setEnrollmentNumber(e.target.value)}
                    className="input input-bordered input-sm w-full text-xs font-medium bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SECTION 4: NOTTO Organ Donation Pledge */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
              4. Organ &amp; Tissue Donation Pledge (National Registry):
            </span>

            <p className="text-xs text-[var(--color-muted)]">
              Would you like to pledge your organs for donation in the event of an untimely death?
            </p>

            <div className="flex items-center gap-6 text-xs font-bold text-[var(--color-ink)]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="organDonation"
                  checked={organDonation === "yes"}
                  onChange={() => setOrganDonation("yes")}
                  className="radio radio-primary radio-sm"
                />
                <span>Yes, I wish to pledge</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="organDonation"
                  checked={organDonation === "no"}
                  onChange={() => setOrganDonation("no")}
                  className="radio radio-primary radio-sm"
                />
                <span>No, not at this time</span>
              </label>
            </div>
          </div>

          {/* SECTION 5: Statutory Declaration */}
          <div className="rounded-[var(--radius-sm)] bg-slate-50 border border-slate-200 p-4">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isDeclarationChecked}
                onChange={(e) => {
                  setIsDeclarationChecked(e.target.checked);
                  if (e.target.checked) setError(null);
                }}
                className="checkbox checkbox-primary checkbox-sm mt-0.5"
              />
              <span className="text-xs text-[var(--color-text)] font-medium leading-relaxed">
                I hereby declare that all particulars given in this Form 2 application are true to the best of my knowledge. I understand that false statements will render my application liable to cancellation under the Motor Vehicles Act, 1988.
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
              ← Back to Auth
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              rightIcon={<ArrowRightIcon size="md" />}
              className="w-full sm:w-auto font-black shadow-md bg-[var(--color-primary)] text-sm sm:text-base py-3 px-8"
            >
              {loading ? "Submitting Form 2..." : "Submit Form 2 Endorsement Application"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Form 1 Physical Fitness Modal */}
      <Form1PhysicalFitnessModal
        isOpen={isForm1Open}
        onClose={() => setIsForm1Open(false)}
        onSubmitted={() => {
          setIsForm1Completed(true);
          setIsForm1Open(false);
        }}
      />
    </div>
  );
}
