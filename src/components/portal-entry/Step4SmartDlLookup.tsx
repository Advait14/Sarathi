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
  InfoIcon,
} from "@/components/ui/Icons";
import {
  normalizeDlNumber,
  type PortalServiceItem,
  type StateRecord,
} from "@/data/portalEntry";

export interface Step4SmartDlLookupProps {
  selectedState: StateRecord;
  selectedService: PortalServiceItem;
  onBack: () => void;
  onProceedToJourney: (dlNumber: string, dob: string) => void;
}

export function Step4SmartDlLookup({
  onBack,
  onProceedToJourney,
  selectedService,
  selectedState,
}: Step4SmartDlLookupProps) {
  const [rawDl, setRawDl] = useState("DL-0420110023456");
  const [dob, setDob] = useState("15/08/1995");
  const [isFetched, setIsFetched] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizedDl = normalizeDlNumber(rawDl);

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawDl.trim() || !dob.trim()) {
      setError("Please enter both Driving Licence number and Date of Birth.");
      return;
    }

    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setIsFetched(true);
    }, 400);
  };

  const handleUseDemoAdvait = () => {
    setRawDl("DL-0420110023456");
    setDob("15/08/1995");
    setIsFetched(true);
    setError(null);
  };

  const handleUseDemoPriya = () => {
    setRawDl("DL-0420200099887");
    setDob("22/11/1998");
    setIsFetched(true);
    setError(null);
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
              ← Instructions
            </Button>
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Step 4 of 4 · Licence Verification
            </Badge>
          </div>
          <span className="text-xs font-bold text-[var(--color-ink)]">
            National Driving Licence Registry
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Enter Driving Licence Details
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Auto-normalizes legacy format variations into standardized National Sarathi registry format.
        </Text>
      </div>

      {/* Main Input & Lookup Form Card */}
      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card">
        {/* Quick Demo Pre-fill Chips */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 mb-6 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            1-Click Demo Licence Fill:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleUseDemoAdvait}
              className="rounded bg-[var(--color-surface)] px-2.5 py-1 text-xs font-semibold border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] text-[var(--color-ink)]"
            >
              Advait Sharma (DL-0420110023456)
            </button>
            <button
              type="button"
              onClick={handleUseDemoPriya}
              className="rounded bg-[var(--color-surface)] px-2.5 py-1 text-xs font-semibold border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] text-[var(--color-ink)]"
            >
              Priya Verma (DL-0420200099887)
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleFetch} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="smart-dl-input"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
              >
                Driving Licence Number (Any Format)
              </label>
              <input
                id="smart-dl-input"
                type="text"
                value={rawDl}
                onChange={(e) => setRawDl(e.target.value)}
                placeholder="e.g. DL-0420110023456 or DL04 2011 0023456"
                className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm font-mono text-[var(--color-ink)] focus-visible:border-[var(--color-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
                required
              />
              <span className="mt-1 block text-[0.6875rem] text-[var(--color-muted)]">
                Normalized as: <strong className="font-mono text-[var(--color-primary)]">{normalizedDl}</strong>
              </span>
            </div>

            <div>
              <label
                htmlFor="smart-dob-input"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
              >
                Date of Birth (DD/MM/YYYY)
              </label>
              <input
                id="smart-dob-input"
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="15/08/1995"
                className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm font-mono text-[var(--color-ink)] focus-visible:border-[var(--color-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
                required
              />
              <span className="mt-1 block text-[0.6875rem] text-[var(--color-muted)]">
                Exact date of birth as recorded on your official licence.
              </span>
            </div>
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

          <div className="flex gap-2">
            <Button
              type="submit"
              variant="secondary"
              size="md"
              loading={loading}
              className="font-bold text-xs"
            >
              Verify & Refresh Record
            </Button>
          </div>
        </form>

        {/* Live Fetched Licence Card Preview */}
        {isFetched ? (
          <div className="mt-7 rounded-[var(--radius-sm)] border-2 border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-5 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--color-success-border)]">
              <div className="flex items-center gap-2">
                <Badge tone="success" icon={<CheckIcon size="sm" />}>
                  Official Record Verified
                </Badge>
                <span className="text-xs font-mono font-bold text-[var(--color-ink)]">
                  {normalizedDl}
                </span>
              </div>
              <span className="text-xs font-semibold text-[var(--color-success-text)]">
                Active on Sarathi National Register
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Licence Holder
                </span>
                <p className="text-base font-bold text-[var(--color-ink)] mt-0.5">
                  {rawDl.includes("99887") ? "Priya Verma" : "Advait Sharma"}
                </p>
                <p className="text-[0.6875rem] text-[var(--color-muted)] mt-0.5">
                  DOB: {dob} · Blood Group: {rawDl.includes("99887") ? "O+" : "B+"}
                </p>
              </div>

              <div>
                <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                  Current Authorized Classes (COV)
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[var(--color-primary)]">
                    LMV
                  </span>
                  <span className="text-xs text-[var(--color-ink)] font-semibold">
                    Light Motor Vehicle (Valid until 2035)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--color-success-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-[var(--color-muted)]">
                Issuing RTO: <strong>RTO Janakpuri, West Delhi (DL-04)</strong>
              </div>

              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRightIcon size="sm" />}
                onClick={() => onProceedToJourney(normalizedDl, dob)}
                className="font-bold shadow-md"
              >
                Proceed to Eligibility & Endorsement Journey
              </Button>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
