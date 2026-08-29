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
              ← DL Details
            </Button>
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Postal Delivery Dispatch
            </Badge>
          </div>
          <span className="badge badge-outline badge-md font-bold text-[var(--color-ink)]">
            India Post Speed Post
          </span>
        </div>

        <Heading as="h1" className="mt-3 text-2xl sm:text-3xl font-black text-[var(--color-ink)] tracking-tight">
          Smart Card Delivery Address Confirmation
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl">
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

        {/* Action Choice Selection */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
            Is this delivery address current and correct?
          </span>

          <div className="grid gap-3 sm:grid-cols-2">
            <label
              onClick={() => setAddressChoice("correct")}
              className={`flex items-start gap-3 rounded-[var(--radius-sm)] border p-4 text-left cursor-pointer transition-all ${
                addressChoice === "correct"
                  ? "border-2 border-emerald-500 bg-emerald-50/70 shadow-sm"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="addressChoice"
                checked={addressChoice === "correct"}
                onChange={() => setAddressChoice("correct")}
                className="radio radio-primary radio-sm mt-0.5"
              />
              <div className="text-xs">
                <span className="font-bold text-[var(--color-ink)] block">
                  Yes, Address is Correct
                </span>
                <span className="text-[var(--color-muted)] text-[0.6875rem] block mt-0.5">
                  Proceed directly with MCWG Endorsement application using this address.
                </span>
              </div>
            </label>

            <label
              onClick={() => setAddressChoice("change")}
              className={`flex items-start gap-3 rounded-[var(--radius-sm)] border p-4 text-left cursor-pointer transition-all ${
                addressChoice === "change"
                  ? "border-2 border-amber-500 bg-amber-50/70 shadow-sm"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="addressChoice"
                checked={addressChoice === "change"}
                onChange={() => setAddressChoice("change")}
                className="radio radio-warning radio-sm mt-0.5"
              />
              <div className="text-xs">
                <span className="font-bold text-[var(--color-ink)] block">
                  No, I Need to Change Address
                </span>
                <span className="text-[var(--color-muted)] text-[0.6875rem] block mt-0.5">
                  Bundle Change of Address service with this endorsement application.
                </span>
              </div>
            </label>
          </div>
        </div>

        {addressChoice === "change" && (
          <Alert type="warning" title="Bundled Change of Address Service">
            An address update will require uploading proof of current residence (Aadhaar / Electricity Bill) during the application step.
          </Alert>
        )}

        {/* Action Footer */}
        <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="secondary"
            size="md"
            onClick={onBack}
            className="w-full sm:w-auto text-xs"
          >
            ← Back to Particulars
          </Button>

          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRightIcon size="md" />}
            onClick={() => onNext(addressChoice === "change")}
            className="w-full sm:w-auto font-black shadow-md bg-[var(--color-primary)] text-sm sm:text-base py-3 px-8"
          >
            Confirm Jurisdiction &amp; Continue to Aadhaar Authentication
          </Button>
        </div>
      </Card>
    </div>
  );
}
