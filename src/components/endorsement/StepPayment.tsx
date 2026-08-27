"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ArrowRightIcon, CheckIcon, ShieldIcon } from "@/components/ui/Icons";
import { feeStructure, type FeeItem } from "@/data/endorsement";

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
    }, 700);
  };

  return (
    <div className="mt-8 space-y-6">
      <Card padding="lg" className="bg-[var(--color-surface)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-2">
            <Badge tone="primary">
              Form 2 Fee Payment
            </Badge>
            <span className="text-xs font-mono text-[var(--color-muted)]">
              Ref: {applicationReference}
            </span>
          </div>
          <span className="text-xs text-[var(--color-muted)] font-medium">
            Standard RTO Tariff
          </span>
        </div>

        <div className="mt-4">
          <Heading as="h2" variant="section">
            Government Fee Breakdown
          </Heading>
          <Text className="mt-1 text-sm text-[var(--color-text)]" variant="body">
            Statutory fees required for vehicle class endorsement and driving skill test booking.
          </Text>
        </div>

        {/* Fee Table */}
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
          <div className="divide-y divide-[var(--color-border)]">
            {feeStructure.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <p className="font-semibold text-[var(--color-ink)]">{item.description}</p>
                  <p className="text-xs text-[var(--color-muted)]">{item.ruleReference}</p>
                </div>
                <div className="font-mono font-bold text-[var(--color-ink)]">
                  ₹{item.amount}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-3 text-base font-bold text-[var(--color-ink)]">
              <span>Total Payable Amount</span>
              <span className="font-mono text-lg text-[var(--color-primary)]">
                ₹{totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        {!isPaid ? (
          <div className="mt-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
              Select Simulated Payment Mode
            </span>

            <div className="grid gap-3 sm:grid-cols-3">
              <label
                className={`rounded-[var(--radius-sm)] border p-3 cursor-pointer flex items-center gap-2.5 text-xs font-semibold ${
                  selectedMethod === "upi"
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
                }`}
              >
                <input
                  type="radio"
                  name="pay-method"
                  value="upi"
                  checked={selectedMethod === "upi"}
                  onChange={() => setSelectedMethod("upi")}
                  className="size-3.5 text-[var(--color-accent)]"
                />
                <span>UPI / QR Code</span>
              </label>

              <label
                className={`rounded-[var(--radius-sm)] border p-3 cursor-pointer flex items-center gap-2.5 text-xs font-semibold ${
                  selectedMethod === "netbanking"
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
                }`}
              >
                <input
                  type="radio"
                  name="pay-method"
                  value="netbanking"
                  checked={selectedMethod === "netbanking"}
                  onChange={() => setSelectedMethod("netbanking")}
                  className="size-3.5 text-[var(--color-accent)]"
                />
                <span>Net Banking (SBI/HDFC/ICICI)</span>
              </label>

              <label
                className={`rounded-[var(--radius-sm)] border p-3 cursor-pointer flex items-center gap-2.5 text-xs font-semibold ${
                  selectedMethod === "card"
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
                }`}
              >
                <input
                  type="radio"
                  name="pay-method"
                  value="card"
                  checked={selectedMethod === "card"}
                  onChange={() => setSelectedMethod("card")}
                  className="size-3.5 text-[var(--color-accent)]"
                />
                <span>Debit / Credit Card</span>
              </label>
            </div>

            <div className="rounded-[var(--radius-sm)] border border-[var(--color-info-border)] bg-[var(--color-info-soft)] p-3 text-xs text-[var(--color-text)] flex items-center gap-2">
              <ShieldIcon size="sm" className="text-[var(--color-info)] shrink-0" />
              <span>Simulated prototype transaction — no actual charge will be incurred.</span>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                loading={isProcessing}
                rightIcon={<ArrowRightIcon size="sm" />}
                onClick={handlePay}
              >
                Pay ₹{totalAmount} (Simulated)
              </Button>
            </div>
          </div>
        ) : (
          /* Payment Confirmed State */
          <div className="mt-6 rounded-[var(--radius-sm)] border border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge tone="success" icon={<CheckIcon size="sm" />}>
                Payment Successful
              </Badge>
              <span className="text-xs font-mono text-[var(--color-success-text)] font-semibold">
                Receipt #RCP-2026-88129
              </span>
            </div>
            <p className="text-sm font-semibold text-[var(--color-success-text)]">
              Payment of ₹{totalAmount} successfully recorded.
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              Your application has moved forward. You can now choose your driving test appointment slot.
            </p>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRightIcon size="sm" />}
                onClick={onNext}
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
