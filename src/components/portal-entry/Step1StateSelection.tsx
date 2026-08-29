/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
  InfoIcon,
} from "@/components/ui/Icons";
import { INDIAN_STATES, type StateRecord } from "@/data/portalEntry";
import { NottoOrganDonationCarousel } from "./NottoOrganDonationCarousel";

export interface Step1StateSelectionProps {
  selectedState?: StateRecord;
  onSelectState: (state: StateRecord) => void;
  onNext: () => void;
}

export function Step1StateSelection({
  onNext,
  onSelectState,
  selectedState,
}: Step1StateSelectionProps) {
  const [selectedCode, setSelectedCode] = useState<string>(selectedState?.code || "");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const activeState = INDIAN_STATES.find((s) => s.code === selectedCode);

  const handleProceed = () => {
    if (!selectedCode) {
      setErrorMsg("Please select your state from the dropdown menu to proceed.");
      return;
    }
    const found = INDIAN_STATES.find((s) => s.code === selectedCode);
    if (found) {
      onSelectState(found);
      onNext();
    }
  };

  return (
    <div className="w-full space-y-6 lg:space-y-8 animate-in fade-in duration-300">
      {/* 1. National Awareness Banner Carousel */}
      <div className="w-full">
        <NottoOrganDonationCarousel />
      </div>

      {/* 2. Full-Width State Selection Hero Section */}
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-gradient-to-br from-[#0B2545] via-[#133E68] to-[#1D4E89] text-white p-6 sm:p-10 lg:p-12 shadow-xl">
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=1600&auto=format&fit=crop"
            alt="Highway Travel"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 w-full space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-md border border-white/20">
              <ShieldIcon size="sm" className="text-emerald-400" />
              Citizen Driving Licence Services
            </span>
            <span className="badge badge-sm badge-success bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Online Transport Portal
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Please Select Your State to Access Online Transport Services
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              Access digital driving licence applications, vehicle class endorsements, renewals, and driving test slot bookings for all regional transport offices across India.
            </p>
          </div>

          {/* Full-Width State Selection Card */}
          <div className="w-full rounded-[var(--radius-md)] bg-white p-6 sm:p-8 text-[var(--color-ink)] shadow-2xl space-y-4">
            <div className="w-full space-y-2">
              <label htmlFor="state-select-dropdown" className="font-bold text-xs uppercase tracking-wider text-[var(--color-muted)] block">
                Select Your State / Union Territory
              </label>

              {/* Full Width Dropdown Menu with DaisyUI select */}
              <div className="relative w-full">
                <select
                  id="state-select-dropdown"
                  aria-label="Select The State"
                  value={selectedCode}
                  onChange={(e) => {
                    setSelectedCode(e.target.value);
                    setErrorMsg("");
                    const found = INDIAN_STATES.find((s) => s.code === e.target.value);
                    if (found) onSelectState(found);
                  }}
                  className="select select-bordered select-md sm:select-lg w-full bg-slate-50 text-sm sm:text-base font-bold text-[var(--color-ink)] focus:border-[var(--color-primary)] focus:bg-white"
                >
                  <option value="">- Select Your State -</option>
                  {INDIAN_STATES.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name} ({st.code}) — {st.rtoCount} RTO Jurisdictions
                    </option>
                  ))}
                </select>
              </div>

              {/* Selection Feedback & Purpose Explanation */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <InfoIcon size="sm" className="text-blue-600 shrink-0" />
                  Your state selection routes your application to your regional RTO and applicable fee schedule.
                </span>
                {activeState && (
                  <span className="badge badge-success badge-sm font-semibold gap-1">
                    <CheckIcon size="sm" />
                    Selected: {activeState.name} ({activeState.code})
                  </span>
                )}
              </div>

              {errorMsg && (
                <div className="pt-2">
                  <Alert type="error">{errorMsg}</Alert>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium">
                National portal supported by Ministry of Road Transport &amp; Highways (MoRTH).
              </span>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRightIcon size="md" />}
                onClick={handleProceed}
                className="w-full sm:w-auto font-black shadow-md text-base"
              >
                Proceed to Sarathi Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
