"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ArrowRightIcon, CheckIcon, ShieldIcon } from "@/components/ui/Icons";

export interface StepDeclarationProps {
  onNext: () => void;
}

export function StepDeclaration({ onNext }: StepDeclarationProps) {
  const [agreedGeneral, setAgreedGeneral] = useState(true);
  const [agreedFitness, setAgreedFitness] = useState(true);
  const [organDonor, setOrganDonor] = useState(true);

  const canProceed = agreedGeneral && agreedFitness;

  return (
    <div className="mt-8 space-y-6">
      <Card padding="lg" className="bg-[var(--color-surface)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-2">
            <Badge tone="primary">
              Statutory Form 1
            </Badge>
            <span className="text-xs font-semibold text-[var(--color-ink)]">
              Self Declaration of Physical Fitness
            </span>
          </div>
          <span className="text-xs text-[var(--color-muted)]">
            Rule 5(2) Central Motor Vehicles Rules
          </span>
        </div>

        <div className="mt-4">
          <Heading as="h2" variant="section">
            Physical Fitness & Legal Declaration
          </Heading>
          <Text className="mt-1 text-sm text-[var(--color-text)]" variant="body">
            Please review the standard statutory declarations required for non-transport vehicle endorsement.
          </Text>
        </div>

        {/* Declarations List */}
        <div className="mt-6 space-y-4">
          {/* Declaration 1 */}
          <label className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedFitness}
              onChange={(e) => setAgreedFitness(e.target.checked)}
              className="mt-0.5 size-4 rounded border-[var(--color-border-strong)] text-[var(--color-primary)] focus:ring-[var(--color-focus)]"
            />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[var(--color-ink)] block">
                1. Physical Fitness & Vision Declaration (Form 1)
              </span>
              <p className="text-[var(--color-muted)] leading-relaxed">
                I declare that I do not suffer from epilepsy, sudden attacks of giddiness, color blindness preventing distinction of traffic signals, or any physical disability likely to cause driving danger.
              </p>
            </div>
          </label>

          {/* Declaration 2 */}
          <label className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedGeneral}
              onChange={(e) => setAgreedGeneral(e.target.checked)}
              className="mt-0.5 size-4 rounded border-[var(--color-border-strong)] text-[var(--color-primary)] focus:ring-[var(--color-focus)]"
            />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[var(--color-ink)] block">
                2. Accuracy of Information & Compliance Declaration
              </span>
              <p className="text-[var(--color-muted)] leading-relaxed">
                I declare that the particulars given in this application are true to the best of my knowledge, and my existing driving licence has not been suspended or revoked.
              </p>
            </div>
          </label>

          {/* Declaration 3 (Optional) */}
          <label className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={organDonor}
              onChange={(e) => setOrganDonor(e.target.checked)}
              className="mt-0.5 size-4 rounded border-[var(--color-border-strong)] text-[var(--color-primary)] focus:ring-[var(--color-focus)]"
            />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[var(--color-ink)] block">
                3. Organ Donation Consent (Optional)
              </span>
              <p className="text-[var(--color-muted)] leading-relaxed">
                In the event of untimely demise due to road accident, I wish to donate my viable organs to save lives.
              </p>
            </div>
          </label>
        </div>

        {/* Action Button */}
        <div className="mt-6 border-t border-[var(--color-border)] pt-4">
          <Button
            variant="primary"
            size="md"
            disabled={!canProceed}
            rightIcon={<ArrowRightIcon size="sm" />}
            onClick={onNext}
          >
            Accept Declarations & Review Application
          </Button>
        </div>
      </Card>
    </div>
  );
}
