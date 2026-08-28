"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ArrowRightIcon, CheckIcon, ShieldIcon, InfoIcon } from "@/components/ui/Icons";
import { feeStructure } from "@/data/endorsement";

export interface StepPaymentProps {
  applicationReference: string;
  onNext: () => void;
}

export function StepPayment({ applicationReference, onNext }: StepPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const totalAmount = feeStructure.reduce((sum, item) => sum + item.amount, 0);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 600);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] pb-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
            Step 7 of 8 · Statutory Treasury Fee
          </Badge>
          <span className="text-xs font-mono font-bold text-[var(--color-ink)]">
            Ref: {applicationReference}
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Statutory Fee Payment &amp; Breakdown
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Pay statutory government endorsement and test track evaluation fees securely.
        </Text>
      </div>

      <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
        {/* Itemized Fee Breakdown (Navan / Square Pattern) */}
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 text-xs space-y-3">
          <span className="font-bold uppercase tracking-wider text-[var(--color-muted)] text-[0.6875rem] block pb-2 border-b border-[var(--color-border-subtle)]">
            Itemized Statutory Tariff (Central Motor Vehicles Act, 1988)
          </span>

          <div className="space-y-2.5">
            {feeStructure.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[var(--color-ink)] block">{item.description}</span>
                  <span className="text-[0.6875rem] text-[var(--color-muted)]">{item.ruleReference}</span>
                </div>
                <div className="font-mono font-bold text-[var(--color-ink)]">
                  ₹{item.amount}.00
                </div>
              </div>
            ))}

            <div className="pt-3 border-t-2 border-[var(--color-border)] flex items-center justify-between text-sm">
              <span className="font-bold text-[var(--color-ink)]">Total Payable Amount</span>
              <span className="font-mono font-bold text-base text-[var(--color-primary)]">
                ₹{totalAmount}.00
              </span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        {!isPaid ? (
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
              Select Payment Method:
            </span>

            <div className="grid gap-2.5 sm:grid-cols-3">
              <label
                className={`rounded-[var(--radius-sm)] border p-3.5 cursor-pointer flex items-center gap-2.5 text-xs font-semibold transition-all ${
                  selectedMethod === "upi"
                    ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary-soft)] shadow-sm"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
                }`}
              >
                <input
                  type="radio"
                  name="pay-method"
                  value="upi"
                  checked={selectedMethod === "upi"}
                  onChange={() => setSelectedMethod("upi")}
                  className="size-3.5 text-[var(--color-primary)]"
                />
                <span>UPI / QR (GPay, PhonePe)</span>
              </label>

              <label
                className={`rounded-[var(--radius-sm)] border p-3.5 cursor-pointer flex items-center gap-2.5 text-xs font-semibold transition-all ${
                  selectedMethod === "netbanking"
                    ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary-soft)] shadow-sm"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
                }`}
              >
                <input
                  type="radio"
                  name="pay-method"
                  value="netbanking"
                  checked={selectedMethod === "netbanking"}
                  onChange={() => setSelectedMethod("netbanking")}
                  className="size-3.5 text-[var(--color-primary)]"
                />
                <span>NetBanking (SBI, HDFC, ICICI)</span>
              </label>

              <label
                className={`rounded-[var(--radius-sm)] border p-3.5 cursor-pointer flex items-center gap-2.5 text-xs font-semibold transition-all ${
                  selectedMethod === "card"
                    ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary-soft)] shadow-sm"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
                }`}
              >
                <input
                  type="radio"
                  name="pay-method"
                  value="card"
                  checked={selectedMethod === "card"}
                  onChange={() => setSelectedMethod("card")}
                  className="size-3.5 text-[var(--color-primary)]"
                />
                <span>Debit / RuPay Card</span>
              </label>
            </div>

            {/* Inline Statutory Refund Agreement */}
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 text-[0.6875rem]">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  required
                  className="mt-0.5 size-3.5 rounded border-[var(--color-border-strong)] text-[var(--color-primary)]"
                />
                <span className="text-[var(--color-muted)] leading-relaxed">
                  I agree to the statutory payment terms under Central Motor Vehicles Rules. (Government treasury receipts are issued instantly upon payment confirmation).
                </span>
              </label>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                loading={isProcessing}
                rightIcon={<ArrowRightIcon size="sm" />}
                onClick={handlePay}
                className="w-full font-bold shadow-md text-xs sm:text-sm"
              >
                Pay ₹{totalAmount}.00 &amp; Unlock Driving Test Slot Booking
              </Button>
            </div>
          </div>
        ) : (
          /* Payment Confirmed State (Coinbase / OKX Pattern) */
          <div className="rounded-[var(--radius-sm)] border-2 border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-full bg-[var(--color-success-text)] text-white font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-xs font-bold text-[var(--color-success-text)] block">
                    Statutory Fee Payment Successful
                  </span>
                  <span className="text-base font-bold text-[var(--color-ink)]">
                    ₹{totalAmount}.00 Paid via BharatKosh Gateway
                  </span>
                </div>
              </div>

              <Badge tone="success" size="sm">
                Receipt: TRX-MORTH-8849102
              </Badge>
            </div>

            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              Your government treasury transaction has been validated. You can now immediately book your appointment slot for the automated driving test track.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[var(--color-success-border)]">
              <button
                type="button"
                className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
              >
                ↓ Download Official Treasury Receipt (PDF)
              </button>

              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRightIcon size="sm" />}
                onClick={onNext}
                className="font-bold shadow-md text-xs sm:text-sm"
              >
                Proceed to Driving Test Slot Booking
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
