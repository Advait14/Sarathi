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
  selectedState,
}: Step4SmartDlLookupProps) {
  const [rawDl, setRawDl] = useState("");
  const [dob, setDob] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveDl = rawDl.trim() || "DL-0420110023456";
  const effectiveDob = dob.trim() || "15/08/1995";
  const normalizedDl = normalizeDlNumber(effectiveDl);

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setIsFetched(true);
    }, 350);
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
              ← Instructions
            </Button>
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Licence Verification
            </Badge>
          </div>
          <span className="badge badge-outline badge-md font-bold text-[var(--color-ink)]">
            {selectedState.name} Transport Registry
          </span>
        </div>

        <Heading as="h1" className="mt-3 text-2xl sm:text-3xl font-black text-[var(--color-ink)] tracking-tight">
          Enter Driving Licence Details
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl">
          Enter your Driving Licence number and Date of Birth to verify records from the national registry.
        </Text>
      </div>

      {/* Main Input & Lookup Form Card */}
      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
        {/* Input Form */}
        <form onSubmit={handleFetch} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="form-control">
              <label
                htmlFor="smart-dl-input"
                className="label-text block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-1.5"
              >
                Driving Licence Number
              </label>
              <input
                id="smart-dl-input"
                type="text"
                value={rawDl}
                onChange={(e) => {
                  setRawDl(e.target.value);
                  setIsFetched(false);
                }}
                placeholder="DL-0420110023456"
                className="input input-bordered w-full font-mono text-sm text-[var(--color-ink)] bg-slate-50 focus:bg-white"
              />
              <span className="mt-1 block text-[0.6875rem] text-[var(--color-muted)]">
                Standard National Format (e.g. DL-0420110023456)
              </span>
            </div>

            <div className="form-control">
              <label
                htmlFor="smart-dob-input"
                className="label-text block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-1.5"
              >
                Date of Birth (DD/MM/YYYY)
              </label>
              <input
                id="smart-dob-input"
                type="text"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setIsFetched(false);
                }}
                placeholder="15/08/1995"
                className="input input-bordered w-full font-mono text-sm text-[var(--color-ink)] bg-slate-50 focus:bg-white"
              />
              <span className="mt-1 block text-[0.6875rem] text-[var(--color-muted)]">
                Exact date of birth recorded on your official licence.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="font-bold shadow-xs text-xs sm:text-sm"
            >
              {loading ? "Searching Registry..." : "Verify & Fetch Record"}
            </Button>

            {/* Quick Demo Pre-fill Pill */}
            <button
              type="button"
              onClick={() => {
                setRawDl("DL-0420110023456");
                setDob("15/08/1995");
                setIsFetched(true);
              }}
              className="text-[0.6875rem] text-[var(--color-primary)] hover:underline font-semibold"
            >
              Auto-fill Prototype Demo Record (Advait Sharma)
            </button>
          </div>
        </form>

        {error && (
          <Alert type="error" title="Lookup Failed">
            {error}
          </Alert>
        )}

        {/* Live Fetched Record Card */}
        {isFetched && (
          <div className="rounded-[var(--radius-sm)] border-2 border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-5 space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-success-border)] pb-3">
              <div className="flex items-center gap-2">
                <Badge tone="success" icon={<CheckIcon size="sm" />}>
                  Official Record Verified
                </Badge>
                <span className="text-xs font-bold text-emerald-900">
                  National Parivahan Registry
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-950">
                {normalizedDl}
              </span>
            </div>

            {/* Record Grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Holder Name:</span>
                <span className="font-bold text-[var(--color-ink)] text-sm">Advait Sharma</span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Father&apos;s Name:</span>
                <span className="font-semibold text-[var(--color-ink)]">Rajesh Sharma</span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Current Class:</span>
                <span className="font-bold text-[var(--color-ink)]">LMV (Light Motor Vehicle)</span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] block">Issuing Authority:</span>
                <span className="font-bold text-[var(--color-ink)]">RTO Janakpuri (DL-04)</span>
              </div>
            </div>

            {/* Next CTA to Step 5 */}
            <div className="pt-3 border-t border-[var(--color-success-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-emerald-900 font-medium">
                Record retrieved successfully. Proceed to confirm details and jurisdictional routing.
              </span>
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRightIcon size="sm" />}
                onClick={() => onProceedToJourney(normalizedDl, effectiveDob)}
                className="w-full sm:w-auto font-bold text-xs shadow-sm bg-emerald-700 hover:bg-emerald-800 border-transparent text-white"
              >
                Proceed to Details &amp; Endorsement
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
