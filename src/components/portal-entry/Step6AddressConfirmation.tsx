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
  AlertTriangleIcon,
  InfoIcon,
} from "@/components/ui/Icons";
import type { PortalServiceItem, StateRecord } from "@/data/portalEntry";

export interface Step6AddressConfirmationProps {
  selectedState: StateRecord;
  selectedService: PortalServiceItem;
  dlNumber: string;
  onBack: () => void;
  onNext: (isAddressChanged: boolean) => void;
}

export function Step6AddressConfirmation({
  dlNumber,
  onBack,
  onNext,
  selectedService,
  selectedState,
}: Step6AddressConfirmationProps) {
  const [addressChoice, setAddressChoice] = useState<"correct" | "change">("correct");

  const isPriya = dlNumber.includes("99887");
  const registeredAddress = isPriya
    ? "House No. 42, Ward 3, Main Market, Reasi, Jammu and Kashmir, 182311"
    : "B-4/12, Block B, Janakpuri, West Delhi, New Delhi, Delhi, 110058";

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
              ← DL Details
            </Button>
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Step 6 of 7 · Postal Delivery Dispatch
            </Badge>
          </div>
          <span className="text-xs font-bold text-[var(--color-ink)]">
            India Post Speed Post Dispatch
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Smart Card Delivery Address Confirmation
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Upon passing your MCWG driving test, your updated Driving Licence smart card will be automatically printed and dispatched via India Post Speed Post.
        </Text>
      </div>

      {/* Main Address Card */}
      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
        {/* Postal Dispatch Address Card */}
        <div className="rounded-[var(--radius-sm)] border-2 border-[var(--color-primary-border)] bg-[var(--color-surface-subtle)] p-5">
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Registered Delivery Address
              </span>
              <Badge tone="neutral" size="sm">
                Speed Post Delivery
              </Badge>
            </div>
            <span className="text-[0.6875rem] font-mono text-[var(--color-muted)]">
              Ref: {dlNumber}
            </span>
          </div>

          <p className="text-sm font-semibold text-[var(--color-ink)] leading-relaxed">
            {registeredAddress}
          </p>

          <div className="mt-3 text-[0.6875rem] text-[var(--color-muted)] flex items-center gap-1.5">
            <InfoIcon size="sm" className="text-[var(--color-info)] shrink-0" />
            <span>
              Deliveries require physical recipient signature or authorized OTP verification upon arrival.
            </span>
          </div>
        </div>

        {/* Action Choice Selection (Replaces the brutal single-OK popup) */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
            Is this delivery address current and correct?
          </span>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setAddressChoice("correct")}
              className={`flex items-start gap-3 rounded-[var(--radius-sm)] border p-4 text-left transition-all ${
                addressChoice === "correct"
                  ? "border-2 border-[var(--color-success-border)] bg-[var(--color-success-soft)] ring-2 ring-[var(--color-success-soft)] shadow-sm"
                  : "border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)]"
              }`}
            >
              <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white">
                {addressChoice === "correct" ? (
                  <div className="size-2 rounded-full bg-[var(--color-success-text)]" />
                ) : null}
              </div>
              <div className="text-xs">
                <span className="font-bold text-[var(--color-ink)] block">
                  Yes, Address is Correct
                </span>
                <span className="text-[var(--color-muted)] text-[0.6875rem] block mt-0.5">
                  Proceed directly with MCWG Endorsement application using this address.
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAddressChoice("change")}
              className={`flex items-start gap-3 rounded-[var(--radius-sm)] border p-4 text-left transition-all ${
                addressChoice === "change"
                  ? "border-2 border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] ring-2 ring-[var(--color-accent-soft)] shadow-sm"
                  : "border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)]"
              }`}
            >
              <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white">
                {addressChoice === "change" ? (
                  <div className="size-2 rounded-full bg-[var(--color-accent)]" />
                ) : null}
              </div>
              <div className="text-xs">
                <span className="font-bold text-[var(--color-ink)] block">
                  No, I Need to Update Address
                </span>
                <span className="text-[var(--color-muted)] text-[0.6875rem] block mt-0.5">
                  Bundle Form 1 Change of Address service simultaneously in this application.
                </span>
              </div>
            </button>
          </div>
        </div>

        {addressChoice === "change" ? (
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] p-4 text-xs text-[var(--color-accent-text)] animate-in fade-in duration-150">
            <span className="font-bold block">
              Dual Service Processing (CMVR Rule 17):
            </span>
            <p className="mt-1 text-xs leading-relaxed">
              Your application will include both <strong>MCWG Addition</strong> and <strong>Change of Address</strong>. You will be able to provide your updated address with Aadhaar e-KYC or address proof in the subsequent step.
            </p>
          </div>
        ) : null}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
          <Button variant="secondary" size="md" onClick={onBack}>
            ← Back to Particulars
          </Button>

          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRightIcon size="sm" />}
            onClick={() => onNext(addressChoice === "change")}
            className="font-bold shadow-sm"
          >
            {addressChoice === "correct"
              ? "Confirm Address & Proceed to Authentication"
              : "Continue with Address Update & Authentication"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
