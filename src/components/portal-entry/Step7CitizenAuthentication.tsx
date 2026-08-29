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
  LockIcon,
  PhoneIcon,
  InfoIcon,
} from "@/components/ui/Icons";
import type { PortalServiceItem, StateRecord } from "@/data/portalEntry";

export interface Step7CitizenAuthenticationProps {
  selectedState: StateRecord;
  selectedService: PortalServiceItem;
  dlNumber: string;
  dob: string;
  isAddressChanged: boolean;
  onBack: () => void;
  onComplete: (authMode: "aadhaar" | "mobile") => void;
}

export function Step7CitizenAuthentication({
  dlNumber,
  dob,
  isAddressChanged,
  onBack,
  onComplete,
  selectedService,
  selectedState,
}: Step7CitizenAuthenticationProps) {
  const [authMode, setAuthMode] = useState<"aadhaar" | "mobile">("aadhaar");
  const [otp, setOtp] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPriya = dlNumber.includes("99887");
  const maskedMobile = isPriya ? "98******44" : "98******10";

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      setError("Please enter the 6-digit OTP code sent to your registered mobile.");
      return;
    }

    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      onComplete(authMode);
    }, 400);
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
              ← Address
            </Button>
            <Badge tone="primary" icon={<LockIcon size="sm" />}>
              Citizen Authentication
            </Badge>
          </div>
          <span className="badge badge-outline badge-md font-bold text-[var(--color-ink)]">
            Security Gateway
          </span>
        </div>

        <Heading as="h1" className="mt-3 text-2xl sm:text-3xl font-black text-[var(--color-ink)] tracking-tight">
          Verify Identity &amp; Authorize Endorsement Request
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl">
          Select your preferred verification method to submit your Form 2 application. Aadhaar e-KYC enables 100% contactless online processing.
        </Text>
      </div>

      {/* Main Auth Card */}
      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
        {/* Method Comparison Cards */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block mb-3">
            Choose Authentication Mode:
          </span>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Option 1: Aadhaar e-KYC */}
            <button
              type="button"
              onClick={() => {
                setAuthMode("aadhaar");
                setError(null);
              }}
              className={`flex flex-col justify-between rounded-[var(--radius-sm)] border p-4 text-left transition-all ${
                authMode === "aadhaar"
                  ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] ring-2 ring-[var(--color-primary-soft)] shadow-sm"
                  : "border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-slate-50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="primary" size="sm" icon={<CheckIcon size="sm" />}>
                    Recommended · Contactless
                  </Badge>
                  <span className="text-[0.6875rem] font-bold text-[var(--color-primary)]">
                    Fast Track
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <ShieldIcon size="sm" className="text-[var(--color-primary)] shrink-0" />
                  <span className="font-bold text-sm text-[var(--color-ink)]">
                    Submit via Aadhaar e-KYC
                  </span>
                </div>

                <p className="mt-1 text-xs text-[var(--color-muted)] leading-relaxed">
                  Instant paperless authentication. No physical documents needed at RTO.
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[var(--color-border-subtle)] text-[0.6875rem] text-emerald-800 font-medium">
                ✓ 100% Online Endorsement Eligibility
              </div>
            </button>

            {/* Option 2: Mobile OTP */}
            <button
              type="button"
              onClick={() => {
                setAuthMode("mobile");
                setError(null);
              }}
              className={`flex flex-col justify-between rounded-[var(--radius-sm)] border p-4 text-left transition-all ${
                authMode === "mobile"
                  ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] ring-2 ring-[var(--color-primary-soft)] shadow-sm"
                  : "border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-slate-50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="neutral" size="sm">
                    Alternative
                  </Badge>
                  <span className="text-[0.6875rem] font-mono text-[var(--color-muted)]">
                    SMS Gateway
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <PhoneIcon size="sm" className="text-[var(--color-muted)] shrink-0" />
                  <span className="font-bold text-sm text-[var(--color-ink)]">
                    Submit via Mobile Number (Non-Aadhaar)
                  </span>
                </div>

                <p className="mt-1 text-xs text-[var(--color-muted)] leading-relaxed">
                  Verify via SMS OTP sent to registered mobile number associated with your DL.
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[var(--color-border-subtle)] text-[0.6875rem] text-amber-800 font-medium">
                ⓘ May require physical document verification at RTO
              </div>
            </button>
          </div>
        </div>

        {/* OTP Input Form Area */}
        <form onSubmit={handleVerify} className="space-y-4 pt-2 border-t border-[var(--color-border)]">
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[var(--color-ink)] block">
                  Enter 6-Digit Verification Code (OTP)
                </span>
                <span className="text-[0.6875rem] text-[var(--color-muted)]">
                  Code sent to registered number {maskedMobile}
                </span>
              </div>
              <span className="badge badge-success badge-sm font-semibold">
                OTP Sent
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="form-control flex-1 max-w-xs">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setError(null);
                  }}
                  placeholder="123456"
                  className="input input-bordered w-full font-mono text-center text-lg font-black tracking-widest bg-white"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                className="font-bold shadow-xs text-xs sm:text-sm"
              >
                {loading ? "Verifying Identity..." : "Verify OTP & Proceed to Application"}
              </Button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 text-[var(--color-muted)]">
              <span>Prototype Sandbox: <strong>123456</strong> is pre-filled.</span>
              <button
                type="button"
                onClick={() => setOtp("123456")}
                className="text-[var(--color-primary)] hover:underline font-semibold"
              >
                Resend Code (30s)
              </button>
            </div>
          </div>

          {error && <Alert type="error">{error}</Alert>}
        </form>

        {/* Consent Note */}
        <div className="rounded-[var(--radius-sm)] bg-blue-50/60 border border-blue-200 p-3.5 flex items-start gap-2.5 text-xs text-blue-950">
          <InfoIcon size="sm" className="text-blue-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            By proceeding, you give consent to the Transport Department under Aadhaar Act 2016 for e-KYC verification and Form 2 submission.
          </p>
        </div>
      </Card>
    </div>
  );
}
