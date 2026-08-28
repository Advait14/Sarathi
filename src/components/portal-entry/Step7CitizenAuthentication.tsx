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
  const [otpSent, setOtpSent] = useState(true);
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
              ← Address
            </Button>
            <Badge tone="primary" icon={<LockIcon size="sm" />}>
              Step 7 of 7 · Citizen Identity Authentication
            </Badge>
          </div>
          <span className="text-xs font-bold text-[var(--color-ink)]">
            National Parivahan Security Gateway
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Verify Identity & Authorize Endorsement Request
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Select your preferred verification method to submit your Form 2 application. Aadhaar e-KYC enables 100% contactless online processing.
        </Text>
      </div>

      {/* Main Auth Card */}
      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
        {/* Method Comparison Cards (Replaces raw radio buttons) */}
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
                  : "border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)]"
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

                <p className="mt-1.5 text-xs text-[var(--color-muted)] leading-relaxed">
                  Instant paperless identity verification. No need to carry physical document copies to the RTO.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] text-[0.6875rem] font-semibold text-[var(--color-success-text)] flex items-center gap-1">
                <CheckIcon size="sm" />
                Zero Physical Queue at RTO
              </div>
            </button>

            {/* Option 2: Mobile OTP Non-eKYC */}
            <button
              type="button"
              onClick={() => {
                setAuthMode("mobile");
                setError(null);
              }}
              className={`flex flex-col justify-between rounded-[var(--radius-sm)] border p-4 text-left transition-all ${
                authMode === "mobile"
                  ? "border-2 border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] ring-2 ring-[var(--color-accent-soft)] shadow-sm"
                  : "border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="neutral" size="sm">
                    Standard Verification
                  </Badge>
                  <span className="text-[0.6875rem] text-[var(--color-muted)]">
                    Non e-KYC
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <PhoneIcon size="sm" className="text-[var(--color-ink)] shrink-0" />
                  <span className="font-bold text-sm text-[var(--color-ink)]">
                    Submit via Mobile Number OTP
                  </span>
                </div>

                <p className="mt-1.5 text-xs text-[var(--color-muted)] leading-relaxed">
                  For citizens whose mobile is not linked to Aadhaar. Physical document copies must be produced during the driving test.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] text-[0.6875rem] text-[var(--color-muted)]">
                Requires physical verification at track
              </div>
            </button>
          </div>
        </div>

        {/* OTP Input Form (Clean 6-digit box, no captcha friction) */}
        <form onSubmit={handleVerify} className="space-y-4 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--color-border)]">
            <div>
              <span className="text-xs font-bold text-[var(--color-ink)] block">
                {authMode === "aadhaar"
                  ? "Aadhaar Registered Mobile OTP"
                  : "Sarathi Registered Mobile OTP"}
              </span>
              <span className="text-[0.6875rem] text-[var(--color-muted)]">
                One-Time Password dispatched to <strong className="font-mono text-[var(--color-ink)]">{maskedMobile}</strong>
              </span>
            </div>

            <div className="rounded bg-white px-2 py-1 text-[0.625rem] font-mono font-bold text-[var(--color-primary)] border border-[var(--color-primary-border)]">
              Demo OTP: 123456
            </div>
          </div>

          <div>
            <label
              htmlFor="otp-verification-input"
              className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
            >
              Enter 6-Digit OTP Code
            </label>
            <input
              id="otp-verification-input"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="mt-1.5 w-full sm:w-64 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white px-4 py-2.5 text-lg font-mono tracking-widest text-[var(--color-ink)] text-center focus-visible:border-[var(--color-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
              required
            />
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
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setOtp("123456");
                setOtpSent(true);
              }}
              className="text-xs text-[var(--color-primary)] font-semibold"
            >
              Resend OTP Code
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              rightIcon={<ArrowRightIcon size="sm" />}
              className="font-bold shadow-md"
            >
              Verify OTP & Proceed to Endorsement Journey
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
