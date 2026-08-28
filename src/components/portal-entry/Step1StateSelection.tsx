"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/Icons";
import { INDIAN_STATES, type StateRecord } from "@/data/portalEntry";

export interface Step1StateSelectionProps {
  selectedState: StateRecord;
  onSelectState: (state: StateRecord) => void;
  onNext: () => void;
}

export function Step1StateSelection({
  onNext,
  onSelectState,
  selectedState,
}: Step1StateSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return INDIAN_STATES;
    return INDIAN_STATES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const popularStates = useMemo(
    () => INDIAN_STATES.filter((s) => s.isPopular),
    []
  );

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      {/* Official Government Hero Header */}
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-surface-subtle)] p-6 sm:p-8 shadow-sm">
        {/* Tricolor subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary-soft)] px-3 py-1 text-xs font-bold text-[var(--color-primary)] border border-[var(--color-primary-border)]">
                <ShieldIcon size="sm" />
                Ministry of Road Transport &amp; Highways
              </span>
              <Badge tone="neutral" size="sm">
                Sarathi 4.0 National Portal
              </Badge>
            </div>

            <Heading as="h1" variant="title" className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] tracking-tight">
              Select Your State or Union Territory
            </Heading>

            <Text className="text-sm text-[var(--color-text)] max-w-2xl leading-relaxed" variant="body">
              Driving licence rules, automated testing tracks, and RTO jurisdictional services are managed by individual state transport departments.
            </Text>
          </div>

          {/* National Emblem Seal Pill */}
          <div className="hidden lg:flex flex-col items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-center shadow-xs">
            <span className="text-[0.625rem] font-bold uppercase tracking-widest text-[var(--color-muted)]">
              Government of India
            </span>
            <span className="font-mono text-xs font-bold text-[var(--color-ink)] mt-0.5">
              36 States &amp; UTs Connected
            </span>
            <span className="text-[0.625rem] text-[var(--color-success-text)] font-semibold mt-0.5 flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
              National Registry Online
            </span>
          </div>
        </div>
      </div>

      {/* Main Selection Area */}
      <div className="space-y-6">
        {/* Quick Select Popular State Chips */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Quick Select State:
            </span>
            <span className="text-xs text-[var(--color-muted)]">
              Most frequent citizen jurisdictions
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {popularStates.map((st) => {
              const isSelected = selectedState.code === st.code;
              return (
                <button
                  key={st.code}
                  type="button"
                  onClick={() => onSelectState(st)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-[var(--color-primary)] text-white shadow-md ring-2 ring-[var(--color-primary-soft)] scale-[1.02]"
                      : "bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-subtle)] hover:shadow-xs"
                  }`}
                >
                  <span className={`text-[0.625rem] font-mono font-extrabold px-1.5 py-0.5 rounded ${
                    isSelected ? "bg-white/20 text-white" : "bg-[var(--color-surface-muted)] text-[var(--color-muted)]"
                  }`}>
                    {st.code}
                  </span>
                  <span>{st.name}</span>
                  {isSelected ? <CheckIcon size="sm" className="stroke-[2.5]" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="space-y-2">
          <label
            htmlFor="state-search-input"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
          >
            Search All States &amp; Union Territories (36 Listed)
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--color-muted)]">
              <SearchIcon size="sm" />
            </div>
            <input
              id="state-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by state name or RTO code (e.g. Delhi, MH, Karnataka, RJ)..."
              className="w-full rounded-[var(--radius-md)] border-2 border-[var(--color-border-strong)] bg-[var(--color-surface)] pl-10 pr-4 py-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] shadow-xs transition-all focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-soft)] focus:outline-none"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)] font-bold"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>

        {/* States Grid */}
        <div className="grid max-h-[380px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStates.map((st) => {
            const isSelected = selectedState.code === st.code;
            return (
              <button
                key={st.code}
                type="button"
                onClick={() => onSelectState(st)}
                className={`group flex items-start justify-between rounded-[var(--radius-md)] border p-4 text-left transition-all ${
                  isSelected
                    ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] ring-2 ring-[var(--color-primary-soft)] shadow-md"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary-border)] hover:bg-[var(--color-surface-subtle)] hover:shadow-xs"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Monogram Emblem Box */}
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] font-mono text-xs font-black transition-colors ${
                      isSelected
                        ? "bg-[var(--color-primary)] text-white shadow-xs"
                        : "bg-[var(--color-surface-muted)] text-[var(--color-ink)] group-hover:bg-[var(--color-primary-soft)] group-hover:text-[var(--color-primary)]"
                    }`}
                  >
                    {st.code}
                  </div>

                  <div>
                    <span className="text-sm font-bold text-[var(--color-ink)] block group-hover:text-[var(--color-primary)] transition-colors">
                      {st.name}
                    </span>
                    <span className="text-xs text-[var(--color-muted)] mt-0.5 block">
                      {st.rtoCount} RTO Offices · Online Services
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-xs">
                    <CheckIcon size="sm" className="stroke-[3]" />
                  </span>
                ) : (
                  <span className="text-xs text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Select →
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Jurisdiction Action Card */}
        <div className="rounded-[var(--radius-lg)] border-2 border-[var(--color-primary-border)] bg-gradient-to-r from-[var(--color-primary-soft)] via-[var(--color-surface)] to-[var(--color-surface)] p-6 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] text-lg font-black text-white shadow-sm">
                {selectedState.code}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-[var(--color-primary)]">
                    Selected State Transport Authority
                  </span>
                  <Badge tone="success" size="sm">
                    Verified Digital Services
                  </Badge>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-[var(--color-ink)]">
                  {selectedState.name} Transport Department
                </h2>
                <p className="text-xs text-[var(--color-muted)]">
                  Includes Endorsement of Vehicle Class (MCWG), Learner&apos;s Licences, Driving Test Slot Booking, and Address Updates.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRightIcon size="md" />}
              onClick={onNext}
              className="font-extrabold shadow-lg text-sm sm:text-base px-6 py-3.5 shrink-0 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all hover:scale-[1.01]"
            >
              Explore {selectedState.name} Services
            </Button>
          </div>
        </div>

        {/* Trust, Security & Compliance Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-3 text-xs text-[var(--color-muted)]">
          <div className="flex items-center gap-2">
            <ShieldIcon size="sm" className="text-[var(--color-primary)]" />
            <span>Digital India &amp; NIC Parivahan National Registry Certified</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Aadhaar e-KYC Enabled</span>
            <span>•</span>
            <span>Central Motor Vehicles Act, 1988</span>
          </div>
        </div>
      </div>
    </div>
  );
}
