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
              ← Reference Slip
            </Button>
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Statutory Treasury Fee
            </Badge>
          </div>
          <span className="badge badge-outline badge-md font-bold text-[var(--color-ink)]">
            BharatKosh / Parivahan Gateway
          </span>
        </div>

        <Heading as="h1" className="mt-3 text-2xl sm:text-3xl font-black text-[var(--color-ink)] tracking-tight">
          Statutory Fee Payment &amp; Flow Status
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl">
          Pay statutory government fees securely. Payment instantly unlocks automated driving test slot booking.
        </Text>
      </div>

      {/* Live 4-Stage Flow Progress */}
      <Card padding="md" className="bg-[var(--color-surface)] shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Application Flow Stages:
          </span>
          <span className="badge badge-success badge-sm font-semibold">
            Live Synchronized
          </span>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-4 text-xs">
          <div className="rounded border border-emerald-300 bg-emerald-50 p-3 space-y-1">
            <span className="font-bold text-emerald-900 flex items-center gap-1">
              <CheckIcon size="sm" />
              1. Services on DL
            </span>
            <p className="text-[0.625rem] text-[var(--color-muted)]">Form 2 Submitted</p>
          </div>

          <div className="rounded border border-emerald-300 bg-emerald-50 p-3 space-y-1">
            <span className="font-bold text-emerald-900 flex items-center gap-1">
              <CheckIcon size="sm" />
              2. Photo &amp; Signature
            </span>
            <p className="text-[0.625rem] text-[var(--color-muted)]">Exempted via e-KYC</p>
          </div>

          <div
            className={`rounded border p-3 space-y-1 ${
              isPaid
                ? "border-emerald-300 bg-emerald-50"
                : "border-blue-300 bg-blue-50/70 ring-2 ring-blue-100"
            }`}
          >
            <span
              className={`font-bold flex items-center gap-1 ${
                isPaid ? "text-emerald-900" : "text-blue-900"
              }`}
            >
              {isPaid ? <CheckIcon size="sm" /> : <ClockIcon size="sm" />}
              3. Fee Payment (₹850)
            </span>
            <p className="text-[0.625rem] text-[var(--color-muted)]">
              {isPaid ? "Paid & Confirmed" : "Action Required Now"}
            </p>
          </div>

          <div
            className={`rounded border p-3 space-y-1 ${
              isPaid
                ? "border-blue-300 bg-blue-50/70 ring-2 ring-blue-100"
                : "border-slate-200 bg-slate-50 opacity-60"
            }`}
          >
            <span className="font-bold text-[var(--color-ink)] flex items-center gap-1">
              4. Slot Booking
            </span>
            <p className="text-[0.625rem] text-[var(--color-muted)]">
              {isPaid ? "Unlocked & Ready" : "Unlocks after Payment"}
            </p>
          </div>
        </div>
      </Card>

      {/* Main Payment Card */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {/* Left Column: Payment Form */}
        <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
              Select Payment Method:
            </span>

            {/* Payment Mode Tabs/Radios */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMode("upi")}
                className={`rounded border p-3 text-center text-xs font-bold transition-all ${
                  paymentMode === "upi"
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] shadow-xs"
                    : "border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:bg-slate-50"
                }`}
              >
                UPI / QR
              </button>
              <button
                type="button"
                onClick={() => setPaymentMode("netbanking")}
                className={`rounded border p-3 text-center text-xs font-bold transition-all ${
                  paymentMode === "netbanking"
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] shadow-xs"
                    : "border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:bg-slate-50"
                }`}
              >
                Net Banking
              </button>
              <button
                type="button"
                onClick={() => setPaymentMode("card")}
                className={`rounded border p-3 text-center text-xs font-bold transition-all ${
                  paymentMode === "card"
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] shadow-xs"
                    : "border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:bg-slate-50"
                }`}
              >
                Debit / Credit Card
              </button>
            </div>
          </div>

          {/* Mode Inputs */}
          {paymentMode === "upi" && (
            <div className="form-control space-y-1.5 rounded-[var(--radius-sm)] border border-slate-200 bg-slate-50 p-4">
              <label className="label-text text-xs font-bold text-[var(--color-ink)]">
                Enter UPI ID / VPA
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@bank"
                className="input input-bordered input-sm w-full bg-white font-mono text-xs"
              />
              <span className="text-[0.6875rem] text-[var(--color-muted)]">
                Instant verification via Google Pay, PhonePe, Paytm, or BHIM.
              </span>
            </div>
          )}

          {paymentMode === "netbanking" && (
            <div className="form-control space-y-1.5 rounded-[var(--radius-sm)] border border-slate-200 bg-slate-50 p-4">
              <label className="label-text text-xs font-bold text-[var(--color-ink)]">
                Select Your Bank
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="select select-bordered select-sm w-full bg-white text-xs font-bold"
              >
                <option value="State Bank of India">State Bank of India (SBI)</option>
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                <option value="Axis Bank">Axis Bank</option>
              </select>
            </div>
          )}

          {paymentMode === "card" && (
            <div className="space-y-3 rounded-[var(--radius-sm)] border border-slate-200 bg-slate-50 p-4 text-xs">
              <div className="form-control">
                <label className="label-text text-[0.6875rem] font-bold text-[var(--color-muted)] mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8912"
                  className="input input-bordered input-sm w-full bg-white font-mono text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="form-control">
                  <label className="label-text text-[0.6875rem] font-bold text-[var(--color-muted)] mb-1">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    placeholder="08/29"
                    className="input input-bordered input-sm w-full bg-white font-mono text-xs"
                  />
                </div>
                <div className="form-control">
                  <label className="label-text text-[0.6875rem] font-bold text-[var(--color-muted)] mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    maxLength={3}
                    placeholder="•••"
                    className="input input-bordered input-sm w-full bg-white font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Status / Action */}
          {!isPaid ? (
            <Button
              variant="primary"
              size="lg"
              loading={loading}
              onClick={handlePay}
              className="w-full font-black shadow-md bg-[var(--color-primary)] text-sm sm:text-base py-3"
            >
              {loading ? "Processing Payment..." : "Pay ₹850 & Continue to Slot Booking"}
            </Button>
          ) : (
            <div className="rounded-[var(--radius-sm)] border-2 border-emerald-500 bg-emerald-50 p-4 space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <Badge tone="success" size="sm" icon={<CheckIcon size="sm" />}>
                  Payment Confirmed
                </Badge>
                <span className="font-mono text-xs font-bold text-emerald-950">
                  TRX-MORTH-8849102
                </span>
              </div>
              <p className="text-emerald-900 font-medium">
                ₹850 received successfully. Driving test slot booking is now unlocked!
              </p>
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRightIcon size="sm" />}
                onClick={onPaymentSuccess}
                className="w-full font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                Proceed to Book Driving Test Slot →
              </Button>
            </div>
          )}
        </Card>

        {/* Right Column: Fee Itemization Table */}
        <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] block border-b border-[var(--color-border-subtle)] pb-2">
            Statutory Fee Schedule Breakdown:
          </span>

          <table className="table table-sm w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="font-bold">Fee Description</th>
                <th className="text-right font-bold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td>Addition of Class (MCWG)</td>
                <td className="text-right font-mono font-bold">₹500.00</td>
              </tr>
              <tr>
                <td>Automated Driving Skill Test</td>
                <td className="text-right font-mono font-bold">₹300.00</td>
              </tr>
              <tr>
                <td>ADTT Sensor Track Facility Charge</td>
                <td className="text-right font-mono font-bold">₹50.00</td>
              </tr>
              <tr className="font-black text-sm bg-slate-50">
                <td>Total Statutory Amount:</td>
                <td className="text-right font-mono text-[var(--color-primary)]">₹850.00</td>
              </tr>
            </tbody>
          </table>

          <div className="rounded-[var(--radius-sm)] bg-slate-50 p-3 text-[0.6875rem] text-[var(--color-muted)] space-y-1">
            <span className="font-bold text-[var(--color-ink)] block">Treasury Guarantee:</span>
            <p>Non-refundable government fee deposited directly to the State Transport Treasury.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
