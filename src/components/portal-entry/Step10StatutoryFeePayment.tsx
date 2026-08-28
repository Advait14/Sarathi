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
  ClockIcon,
  InfoIcon,
} from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";
import type { PortalServiceItem, StateRecord } from "@/data/portalEntry";

export interface Step10StatutoryFeePaymentProps {
  selectedState: StateRecord;
  selectedService: PortalServiceItem;
  dlNumber: string;
  dob: string;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

export function Step10StatutoryFeePayment({
  dlNumber,
  dob,
  onBack,
  onPaymentSuccess,
  selectedService,
  selectedState,
}: Step10StatutoryFeePaymentProps) {
  const { refresh } = useAuth();
  const [paymentMode, setPaymentMode] = useState<"upi" | "netbanking" | "card">("upi");
  const [upiId, setUpiId] = useState("advait.sharma@okhdfcbank");
  const [selectedBank, setSelectedBank] = useState("State Bank of India");
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Record payment in backend DB
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "pay_fee",
          amount: 850,
          transactionId: "TRX-MORTH-8849102",
        }),
      });
      await refresh();
    } catch (err) {
      console.warn("Backend fee sync error:", err);
    }

    setTimeout(() => {
      setLoading(false);
      setIsPaid(true);
    }, 600);
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
              ← Reference Slip
            </Button>
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Step 10 of 10 · Statutory Treasury Fee
            </Badge>
          </div>
          <span className="text-xs font-bold text-[var(--color-ink)]">
            BharatKosh / Parivahan e-Gateway
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Statutory Fee Payment & Flow Status
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Pay statutory government fees securely. Payment instantly unlocks automated driving test slot booking.
        </Text>
      </div>

      {/* Live 4-Stage Flow Progress (Replaces clunky radio buttons & refresh warning) */}
      <Card padding="md" className="bg-[var(--color-surface)] shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Application Flow Stages Completed:
          </span>
          <Badge tone="success" size="sm">
            Live Synchronized
          </Badge>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-4 text-xs">
          <div className="rounded border border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-3 space-y-1">
            <span className="font-bold text-[var(--color-success-text)] flex items-center gap-1">
              <CheckIcon size="sm" />
              1. Services on DL
            </span>
            <p className="text-[0.625rem] text-[var(--color-muted)]">Form 2 Submitted</p>
          </div>

          <div className="rounded border border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-3 space-y-1">
            <span className="font-bold text-[var(--color-success-text)] flex items-center gap-1">
              <CheckIcon size="sm" />
              2. Photo & Signature
            </span>
            <p className="text-[0.625rem] text-[var(--color-muted)]">Exempted via e-KYC</p>
          </div>

          <div
            className={`rounded border p-3 space-y-1 ${
              isPaid
                ? "border-[var(--color-success-border)] bg-[var(--color-success-soft)]"
                : "border-2 border-[var(--color-primary-border)] bg-[var(--color-primary-soft)]"
            }`}
          >
            <span
              className={`font-bold flex items-center gap-1 ${
                isPaid ? "text-[var(--color-success-text)]" : "text-[var(--color-primary)]"
              }`}
            >
              {isPaid ? <CheckIcon size="sm" /> : <ClockIcon size="sm" />}
              3. Fee Payment
            </span>
            <p className="text-[0.625rem] text-[var(--color-muted)]">
              {isPaid ? "Paid: ₹850" : "Current Step · ₹850"}
            </p>
          </div>

          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 space-y-1">
            <span className="font-bold text-[var(--color-muted)]">4. DL Slot Booking</span>
            <p className="text-[0.625rem] text-[var(--color-muted)]">Next Step at RTO</p>
          </div>
        </div>
      </Card>

      {/* Main Payment & Checkout Card */}
      {!isPaid ? (
        <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Left: Itemized Statutory Fee Breakdown */}
            <div className="space-y-4 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 text-xs">
              <span className="font-bold uppercase tracking-wider text-[var(--color-muted)] text-[0.6875rem] block pb-2 border-b border-[var(--color-border-subtle)]">
                Itemized Statutory Fees (Form 2 Endorsement)
              </span>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text)]">Additional Endorsement Fee (MCWG)</span>
                  <span className="font-mono font-bold text-[var(--color-ink)]">₹500.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text)]">Automated Driving Test Track Fee</span>
                  <span className="font-mono font-bold text-[var(--color-ink)]">₹300.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text)]">Smart Card Printing & Speed Post</span>
                  <span className="font-mono font-bold text-[var(--color-ink)]">₹50.00</span>
                </div>

                <div className="pt-3 border-t-2 border-[var(--color-border)] flex items-center justify-between text-sm">
                  <span className="font-bold text-[var(--color-ink)]">Total Payable Amount</span>
                  <span className="font-mono font-bold text-base text-[var(--color-primary)]">
                    ₹850.00
                  </span>
                </div>
              </div>

              <div className="rounded bg-white p-2.5 text-[0.6875rem] text-[var(--color-muted)] border border-[var(--color-border-subtle)]">
                Government receipt is generated immediately upon payment confirmation under Central Motor Vehicles Act.
              </div>
            </div>

            {/* Right: Payment Gateway Controls */}
            <form onSubmit={handlePay} className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
                Select Payment Method:
              </span>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMode("upi")}
                  className={`rounded border p-2.5 text-center text-xs font-semibold transition-all ${
                    paymentMode === "upi"
                      ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
                  }`}
                >
                  UPI / QR
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode("netbanking")}
                  className={`rounded border p-2.5 text-center text-xs font-semibold transition-all ${
                    paymentMode === "netbanking"
                      ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
                  }`}
                >
                  NetBanking
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode("card")}
                  className={`rounded border p-2.5 text-center text-xs font-semibold transition-all ${
                    paymentMode === "card"
                      ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
                  }`}
                >
                  Debit Card
                </button>
              </div>

              {paymentMode === "upi" ? (
                <div className="space-y-2 pt-1 text-xs">
                  <label className="block font-bold text-[var(--color-ink)] text-[0.6875rem]">
                    UPI ID / VPA
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2 text-xs font-mono text-[var(--color-ink)]"
                    placeholder="username@bank"
                    required
                  />
                </div>
              ) : paymentMode === "netbanking" ? (
                <div className="space-y-2 pt-1 text-xs">
                  <label className="block font-bold text-[var(--color-ink)] text-[0.6875rem]">
                    Select Bank
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-ink)]"
                  >
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Punjab National Bank</option>
                  </select>
                </div>
              ) : (
                <div className="space-y-2 pt-1 text-xs">
                  <label className="block font-bold text-[var(--color-ink)] text-[0.6875rem]">
                    Card Details (Simulated Test Card)
                  </label>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8812"
                    disabled
                    className="w-full rounded border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-2 text-xs font-mono text-[var(--color-muted)]"
                  />
                </div>
              )}

              {/* Inline Statutory Refund & T&C Agreement (Replaces separate redirect page) */}
              <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 text-[0.6875rem]">

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    required
                    className="mt-0.5 size-3.5 rounded border-[var(--color-border-strong)] text-[var(--color-primary)]"
                  />
                  <span className="text-[var(--color-muted)] leading-relaxed">
                    I agree to the statutory payment terms under Central Motor Vehicles Rules. (Online payments are credited to state treasury; manual refund for double payments can be claimed at the RTO).
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                rightIcon={<ArrowRightIcon size="sm" />}
                className="w-full font-bold shadow-md text-xs sm:text-sm mt-2"
              >
                Pay ₹850.00 & Unlock Test Slot Booking
              </Button>
            </form>

          </div>
        </Card>
      ) : (
        /* Payment Success Card */
        <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-5 border-2 border-[var(--color-success-border)]">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--color-success-border)]">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-success-text)] text-white font-bold">
                ✓
              </div>
              <div>
                <span className="text-xs font-bold text-[var(--color-success-text)] block">
                  Statutory Fee Payment Successful
                </span>
                <span className="text-base font-bold text-[var(--color-ink)]">
                  ₹850.00 Paid via BharatKosh Gateway
                </span>
              </div>
            </div>

            <Badge tone="success" size="sm">
              Treasury Confirmed
            </Badge>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 text-xs rounded bg-[var(--color-success-soft)] p-4 border border-[var(--color-success-border)]">
            <div>
              <span className="text-[0.6875rem] text-[var(--color-muted)] block">Transaction Reference:</span>
              <span className="font-mono font-bold text-[var(--color-ink)]">TRX-MORTH-8849102</span>
            </div>
            <div>
              <span className="text-[0.6875rem] text-[var(--color-muted)] block">Paid Date:</span>
              <span className="font-mono font-bold text-[var(--color-ink)]">09-09-2024 03:04 PM</span>
            </div>
            <div>
              <span className="text-[0.6875rem] text-[var(--color-muted)] block">Service:</span>
              <span className="font-semibold text-[var(--color-ink)]">MCWG Endorsement (Form 2)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <button
              type="button"
              className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
            >
              ↓ Download Official Treasury e-Receipt (PDF)
            </button>

            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRightIcon size="sm" />}
              onClick={onPaymentSuccess}
              className="font-bold shadow-md text-xs sm:text-sm"
            >
              Proceed to Driving Test Slot Booking (RTO Track)
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
