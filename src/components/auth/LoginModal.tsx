"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  ShieldIcon,
  UserIcon,
  CheckIcon,
  ArrowRightIcon,
  LockIcon,
  PhoneIcon,
  FileTextIcon,
} from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, error, isLoading, user } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("123456");
  const [step, setStep] = useState<"identifier" | "otp">("identifier");
  const [localError, setLocalError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
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

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setLocalError("Please enter your Mobile Number or Driving Licence (DL) Number.");
      return;
    }
    setLocalError(null);
    setStep("otp");
  };

  const handleVerifyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    const success = await login(identifier, otp);
    if (success) {
      onClose();
      setStep("identifier");
      setIdentifier("");
    }
  };

  const handleQuickLogin = async (quickIdentifier: string) => {
    setIdentifier(quickIdentifier);
    setLocalError(null);
    const success = await login(quickIdentifier, "123456");
    if (success) {
      onClose();
      setStep("identifier");
      setIdentifier("");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-primary)] p-4 text-white">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-[var(--radius-sm)] bg-white/20 text-white font-bold text-sm">
              <ShieldIcon size="sm" />
            </div>
            <div>
              <span className="text-[0.625rem] font-bold uppercase tracking-wider opacity-80 block">
                Parivahan Sewa · Citizen Authentication
              </span>
              <Heading as="h3" id="login-modal-title" variant="section" className="text-white text-base font-bold">
                Citizen Portal Login
              </Heading>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close login modal"
            className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span className="text-xl font-bold leading-none" aria-hidden="true">&times;</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Quick Demo 1-Click Login Section */}
          <div className="mb-6 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border-subtle)]">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                1-Click Quick Demo Login:
              </span>
              <Badge tone="primary" size="sm">Prototype Accounts</Badge>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("DL-0420110023456")}
                className="w-full flex items-center justify-between rounded p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-left hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-all group"
              >
                <div>
                  <span className="text-xs font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] block">
                    1. Advait Sharma (Ready for MCWG Endorsement)
                  </span>
                  <span className="text-[0.6875rem] font-mono text-[var(--color-muted)]">
                    DL-0420110023456 · Has Active MCWG LL
                  </span>
                </div>
                <ArrowRightIcon size="sm" className="text-[var(--color-muted)] group-hover:text-[var(--color-primary)] shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("DL-0420200099887")}
                className="w-full flex items-center justify-between rounded p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-left hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-all group"
              >
                <div>
                  <span className="text-xs font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] block">
                    2. Priya Verma (Missing MCWG LL)
                  </span>
                  <span className="text-[0.6875rem] font-mono text-[var(--color-muted)]">
                    DL-0420200099887 · Prerequisite Check Flow
                  </span>
                </div>
                <ArrowRightIcon size="sm" className="text-[var(--color-muted)] group-hover:text-[var(--color-primary)] shrink-0" />
              </button>
            </div>
          </div>

          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border)]" />
            </div>
            <span className="relative bg-[var(--color-surface)] px-3 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Or Enter Details Manually
            </span>
          </div>

          {/* Form */}
          {step === "identifier" ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label
                  htmlFor="citizen-identifier-input"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
                >
                  Mobile Number or DL Number
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="citizen-identifier-input"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 9876543210 or DL-0420110023456"
                    className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] focus-visible:border-[var(--color-focus)]"
                    required
                  />
                </div>
                <span className="mt-1 block text-[0.6875rem] text-[var(--color-muted)]">
                  Enter your registered Parivahan mobile number or 16-character Driving Licence number.
                </span>
              </div>

              {(localError || error) && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="rounded-[var(--radius-xs)] bg-[var(--color-danger-soft)] p-3 text-xs font-semibold text-[var(--color-danger-text)] border border-[var(--color-danger-border)]"
                >
                  {localError || error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full font-bold"
                rightIcon={<ArrowRightIcon size="sm" />}
              >
                Send One-Time Password (OTP)
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyLogin} className="space-y-4">
              <div className="rounded-[var(--radius-sm)] bg-[var(--color-info-soft)] p-3 text-xs text-[var(--color-info-text)] border border-[var(--color-info-border)]">
                <p>
                  OTP sent to mobile registered with <strong>{identifier}</strong>.
                </p>
                <p className="mt-1 text-[0.6875rem] text-[var(--color-muted)]">
                  (Simulated Demo OTP: <strong className="text-[var(--color-ink)]">123456</strong>)
                </p>
              </div>

              <div>
                <label
                  htmlFor="citizen-otp-input"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
                >
                  Enter 6-Digit OTP
                </label>
                <input
                  id="citizen-otp-input"
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-2.5 text-center text-lg font-mono font-bold tracking-widest text-[var(--color-ink)] focus-visible:border-[var(--color-focus)]"
                  required
                />
              </div>

              {(localError || error) && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="rounded-[var(--radius-xs)] bg-[var(--color-danger-soft)] p-3 text-xs font-semibold text-[var(--color-danger-text)] border border-[var(--color-danger-border)]"
                >
                  {localError || error}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => setStep("identifier")}
                  className="w-1/3 text-xs"
                >
                  Change ID
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={isLoading}
                  className="w-2/3 font-bold"
                  rightIcon={<CheckIcon size="sm" />}
                >
                  Verify & Sign In
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
