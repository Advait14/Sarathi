"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ShieldIcon, CheckIcon, AlertTriangleIcon, InfoIcon } from "@/components/ui/Icons";

export interface Form1PhysicalFitnessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}

export function Form1PhysicalFitnessModal({
  isOpen,
  onClose,
  onSubmitted,
}: Form1PhysicalFitnessModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const [answers, setAnswers] = useState({
    epilepsy: "no",
    visionCapability: "yes", // (b) is capability question
    limbLoss: "no",
    nightBlindness: "no",
    deafness: "no",
    otherDisability: "no",
  });

  const [isDeclared, setIsDeclared] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDeclared) {
      setError("Please confirm the medical truthfulness declaration.");
      return;
    }
    // Validation: visionCapability must be yes, all other defect questions must be no for standard non-transport
    if (answers.visionCapability !== "yes") {
      setError("Satisfactory visual acuity in daylight is mandatory under Rule 5 for driving non-transport vehicles.");
      return;
    }
    if (
      answers.epilepsy === "yes" ||
      answers.limbLoss === "yes" ||
      answers.nightBlindness === "yes" ||
      answers.deafness === "yes" ||
      answers.otherDisability === "yes"
    ) {
      setError("Applicants with registered medical conditions require Form 1-A medical practitioner certification.");
      return;
    }

    setError(null);
    onSubmitted();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="form1-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-2xl overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-primary)] p-4 text-white">
          <div className="flex items-center gap-2">
            <ShieldIcon size="sm" className="text-white" />
            <Heading as="h3" id="form1-modal-title" variant="section" className="text-white text-base font-bold">
              Form 1 · Physical Fitness Self-Declaration (CMVR Rule 5)
            </Heading>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Form 1 modal"
            className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <span className="text-xl font-bold leading-none">&times;</span>
          </button>
        </div>

        {/* Modal Body / Questions */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-info-border)] bg-[var(--color-info-soft)] p-3 text-xs text-[var(--color-text)] flex items-start gap-2.5">
            <InfoIcon size="sm" className="text-[var(--color-info)] mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-[var(--color-info-text)] block">
                Statutory Non-Transport Self-Assessment:
              </span>
              <p className="text-[var(--color-muted)] text-[0.6875rem] mt-0.5">
                Answer the 6 medical fitness criteria honestly. Note that question (b) is a capability test where &quot;YES&quot; represents normal daylight eyesight.
              </p>
            </div>
          </div>

          <div className="space-y-3.5">
            {/* Question (a) */}
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[var(--color-ink)] font-medium leading-relaxed sm:max-w-md">
                (a) Do you suffer from epilepsy or sudden attacks of disabling giddiness / loss of consciousness?
              </span>
              <div className="flex items-center gap-4 shrink-0 font-bold">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="epilepsy"
                    checked={answers.epilepsy === "yes"}
                    onChange={() => setAnswers({ ...answers, epilepsy: "yes" })}
                  />
                  YES
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-[var(--color-primary)]">
                  <input
                    type="radio"
                    name="epilepsy"
                    checked={answers.epilepsy === "no"}
                    onChange={() => setAnswers({ ...answers, epilepsy: "no" })}
                  />
                  NO
                </label>
              </div>
            </div>

            {/* Question (b) - Capability Question Highlighted */}
            <div className="rounded-[var(--radius-sm)] border-2 border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[var(--color-ink)] font-bold leading-relaxed sm:max-w-md block">
                  (b) Are you able to distinguish with each eye (with or without glasses) at 25 metres in daylight?
                </span>
                <span className="text-[0.625rem] text-[var(--color-success-text)] font-semibold mt-0.5 block">
                  ★ Standard daylight vision capability check
                </span>
              </div>
              <div className="flex items-center gap-4 shrink-0 font-bold">
                <label className="flex items-center gap-1.5 cursor-pointer text-[var(--color-success-text)]">
                  <input
                    type="radio"
                    name="visionCapability"
                    checked={answers.visionCapability === "yes"}
                    onChange={() => setAnswers({ ...answers, visionCapability: "yes" })}
                  />
                  YES (Able)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="visionCapability"
                    checked={answers.visionCapability === "no"}
                    onChange={() => setAnswers({ ...answers, visionCapability: "no" })}
                  />
                  NO
                </label>
              </div>
            </div>

            {/* Question (c) */}
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[var(--color-ink)] font-medium leading-relaxed sm:max-w-md">
                (c) Have you lost either hand or foot, or suffer from any defect in motor/limb control?
              </span>
              <div className="flex items-center gap-4 shrink-0 font-bold">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="limbLoss"
                    checked={answers.limbLoss === "yes"}
                    onChange={() => setAnswers({ ...answers, limbLoss: "yes" })}
                  />
                  YES
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-[var(--color-primary)]">
                  <input
                    type="radio"
                    name="limbLoss"
                    checked={answers.limbLoss === "no"}
                    onChange={() => setAnswers({ ...answers, limbLoss: "no" })}
                  />
                  NO
                </label>
              </div>
            </div>

            {/* Question (d) */}
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[var(--color-ink)] font-medium leading-relaxed sm:max-w-md">
                (d) Do you suffer from night blindness or severe colour perception defect?
              </span>
              <div className="flex items-center gap-4 shrink-0 font-bold">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="nightBlindness"
                    checked={answers.nightBlindness === "yes"}
                    onChange={() => setAnswers({ ...answers, nightBlindness: "yes" })}
                  />
                  YES
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-[var(--color-primary)]">
                  <input
                    type="radio"
                    name="nightBlindness"
                    checked={answers.nightBlindness === "no"}
                    onChange={() => setAnswers({ ...answers, nightBlindness: "no" })}
                  />
                  NO
                </label>
              </div>
            </div>

            {/* Question (e) */}
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[var(--color-ink)] font-medium leading-relaxed sm:max-w-md">
                (e) Do you suffer from deafness hindering awareness of ordinary vehicle sound signals?
              </span>
              <div className="flex items-center gap-4 shrink-0 font-bold">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="deafness"
                    checked={answers.deafness === "yes"}
                    onChange={() => setAnswers({ ...answers, deafness: "yes" })}
                  />
                  YES
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-[var(--color-primary)]">
                  <input
                    type="radio"
                    name="deafness"
                    checked={answers.deafness === "no"}
                    onChange={() => setAnswers({ ...answers, deafness: "no" })}
                  />
                  NO
                </label>
              </div>
            </div>

            {/* Question (f) */}
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[var(--color-ink)] font-medium leading-relaxed sm:max-w-md">
                (f) Do you suffer from any other disability likely to cause your driving to be a source of danger?
              </span>
              <div className="flex items-center gap-4 shrink-0 font-bold">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="otherDisability"
                    checked={answers.otherDisability === "yes"}
                    onChange={() => setAnswers({ ...answers, otherDisability: "yes" })}
                  />
                  YES
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-[var(--color-primary)]">
                  <input
                    type="radio"
                    name="otherDisability"
                    checked={answers.otherDisability === "no"}
                    onChange={() => setAnswers({ ...answers, otherDisability: "no" })}
                  />
                  NO
                </label>
              </div>
            </div>
          </div>

          {/* Declaration Checkbox */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-3.5">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isDeclared}
                onChange={(e) => setIsDeclared(e.target.checked)}
                className="mt-0.5 size-4 rounded border-[var(--color-border-strong)] text-[var(--color-primary)]"
              />
              <span className="font-semibold text-[var(--color-ink)]">
                I hereby declare that to the best of my knowledge and belief, the medical particulars given above are true.
              </span>
            </label>
          </div>

          {error ? (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-[var(--radius-xs)] bg-[var(--color-danger-soft)] p-3 text-xs font-semibold text-[var(--color-danger-text)] border border-[var(--color-danger-border)]"
            >
              {error}
            </div>
          ) : null}

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--color-border)]">
            <Button type="button" variant="secondary" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              rightIcon={<CheckIcon size="sm" />}
              className="font-bold shadow-sm"
            >
              Save Form 1 Declaration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
