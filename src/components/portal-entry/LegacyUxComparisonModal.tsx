"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ShieldIcon, CheckIcon, AlertTriangleIcon } from "@/components/ui/Icons";

export interface LegacyUxComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LegacyUxComparisonModal({ isOpen, onClose }: LegacyUxComparisonModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

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

  const comparisons = [
    {
      step: "Screen 1: Landing & State Selection",
      officialFlaw:
        "Wall of administrative text about SCOSTA and RTO computerization history. Raw un-searchable dropdown of 36 states requiring endless scrolling.",
      modernImprovement:
        "Purpose-driven civic hero with instant searchable state input, auto-location suggestion, and 1-click popular state chips (Delhi, Maharashtra, Karnataka, UP, J&K).",
    },
    {
      step: "Screen 2: Service Discovery & DL Services Hub",
      officialFlaw:
        "Overwhelming 3x6 grid of 18 identical circle icons with confusing bureaucratic jargon ('DL Extract', 'Service Withdraw', 'AEDL', 'DL Services').",
      modernImprovement:
        "Categorized, intent-based services hub with live search, clear descriptions, and prominent cards for 'Additional Endorsement (MCWG)' and 'DL Extract'.",
    },
    {
      step: "Screen 3: Instructions for Application Submission",
      officialFlaw:
        "Unstructured wall of 18 conditional bullet points demanding citizens read all state caveats and medical form rules before entering credentials.",
      modernImprovement:
        "Visual 4-stage milestone roadmap with time estimates, plain-English document readiness checklist, and clear Form 1-A medical guidance.",
    },
    {
      step: "Screen 4: Enter Driving Licence Details",
      officialFlaw:
        "Massive warning note showing 4 different syntax permutations (e.g. RJ-14/DLC/00/91059 vs RJ14 20000091059) with disjointed action buttons.",
      modernImprovement:
        "Smart auto-normalizing input mask accepting any typing format, DD/MM/YYYY auto-slashing, and instant verified licence preview card.",
    },
    {
      step: "Screen 5: Application For Services on DL (Jurisdiction)",
      officialFlaw:
        "Clunky YES/NO confirmation dropdown, confusing applicant category selector, and manual pincode entry conflicting with separate RTO dropdown.",
      modernImprovement:
        "Integrated digital licence particulars card, single-touch consent checkbox, and automatic RTO jurisdiction matching from applicant pincode.",
    },
    {
      step: "Screen 6: Smart Card Details & Vehicle Classes",
      officialFlaw:
        "Skeuomorphic fake smart card chip graphic, raw table without context, and unexplained 'Employer Category' field.",
      modernImprovement:
        "Clean digital credential view clearly differentiating existing authorized vehicle classes (LMV) from pending endorsement (MCWG).",
    },
    {
      step: "Screen 7: Smart Card Delivery Address Confirmation",
      officialFlaw:
        "Jarring browser alert() pop-up with a single 'OK' button forcing the applicant forward even if their postal address is incorrect.",
      modernImprovement:
        "Dedicated Speed Post dispatch card with two clear paths: (A) Confirm current address, or (B) Bundle Form 1 Change of Address simultaneously under CMVR.",
    },
    {
      step: "Screen 8 & 9: Authentication with KYC / Non e-KYC",
      officialFlaw:
        "Two confusing tiers of submit buttons (Submit/Home vs Submit OTP/Resend/Reset), visual CAPTCHA on top of OTP, and lack of clarity on e-KYC benefits.",
      modernImprovement:
        "Visual comparison cards highlighting Aadhaar e-KYC (100% contactless / No RTO queue) vs Mobile OTP, paired with streamlined 6-digit OTP verification and ZERO CAPTCHA friction.",
    },
    {
      step: "Screen 10: Service Selection Checkbox Grid",
      officialFlaw:
        "Raw unranked list of 7 checkboxes forcing citizens to decipher between 'Replacement', 'Duplicate', 'Extract', and 'Endorsement' with fine-print footnotes.",
      modernImprovement:
        "Intent-based selection and smart bundling card with instant statutory eligibility validation.",
    },
    {
      step: "Screen 11: Additional Endorsement Application Form & Declarations",
      officialFlaw:
        "Color-coded sidebar rules (Green=saved, Purple=action, Blue=incomplete) with ⛔ delete buttons, forklift definitions, mandatory driving school enrollment fields, 4 repetitive checkboxes, and visual CAPTCHA.",
      modernImprovement:
        "Linked Learner's Licence card showing Rule 15 30-day holding satisfaction, optional driving school toggle, interactive Form 1 physical fitness declaration, consolidated statutory declaration, and national organ donation pledge.",
    },
    {
      step: "Screen 12 & 13: Physical Fitness Self-Declaration (Form 1)",
      officialFlaw:
        "Misaligned questionnaire with inverted question (b) trap, and a completely blank full-page interstitial screen with just one 'Okay' button.",
      modernImprovement:
        "Interactive Form 1 modal highlighting question (b) daylight vision capability, pre-filled compliant defaults, and instant green verification badge (zero dead-end screens).",
    },
    {
      step: "Screen 14: Application Reference Details Slip",
      officialFlaw:
        "Contradictory notes demanding paper printouts and in-person document visits despite completing e-KYC, tiny unformatted text, and disconnected next steps.",
      modernImprovement:
        "Official Acknowledgement Card with QR code verification, downloadable Form 2 summary, and clear forward guidance to Fee Payment.",
    },
    {
      step: "Screen 15: Application Flow Stages Tracker",
      officialFlaw:
        "Rigid radio buttons with harsh red 'To be done by the Applicant' warnings, and manual 'Refresh' buttons.",
      modernImprovement:
        "Live 4-Stage Progress Card automatically tracking real-time status transitions across Form 2, e-KYC, payment, and slot booking.",
    },
    {
      step: "Screen 16: Application Fee Calculation & CAPTCHA",
      officialFlaw:
        "Requires clicking a manual 'Click Here To Calculate Fee' button, stressful visual CAPTCHA right before checkout, and obscure 'Common PGI' dropdown.",
      modernImprovement:
        "Automatic statutory fee calculation (₹850), itemized breakdown (Form 2 ₹500 + Track ₹300 + Dispatch ₹50), and zero CAPTCHA checkout.",
    },
    {
      step: "Screen 17: Terms & Conditions Redirect Page",
      officialFlaw:
        "Entire separate redirect page just to agree to a refund policy before payment, causing unnecessary user drop-offs.",
      modernImprovement:
        "Inline statutory refund & T&C agreement seamlessly embedded in the payment card with single-touch confirmation.",
    },
    {
      step: "Screen 18: Payment Transaction Details Dump",
      officialFlaw:
        "Depressing gray database text boxes ('Remarks: captured') and no clear forward action leading to the test appointment.",
      modernImprovement:
        "Civic Treasury Clearance Card with official green badge, transaction reference (TRX-MORTH-8849102), and direct CTA: 'Book Driving Test Slot →'.",
    },
    {
      step: "Screen 19 & 20: Driving Test Slot Booking & Confirmation",
      officialFlaw:
        "Legacy portal dumps users back to the home page or shows raw text prompts without an integrated booking UI.",
      modernImprovement:
        "Interactive Driving Test Slot Booking component with calendar date picker, time slot selector (Morning/Afternoon), automated test track requirements checklist, and instant Appointment Confirmation Slip!",
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ux-comparison-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-4xl overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-primary)] p-4 text-white">
          <div className="flex items-center gap-2">
            <ShieldIcon size="sm" className="text-white" />
            <Heading as="h3" id="ux-comparison-title" variant="section" className="text-white text-base font-bold">
              Official Portal UX Analysis & Modernized Architecture (All 20 Official Screens)
            </Heading>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison modal"
            className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <span className="text-xl font-bold leading-none">&times;</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          <p className="text-[var(--color-text)] leading-relaxed">
            Comprehensive breakdown of all 20 official Parivahan screenshots and how each friction point was solved in the modernized citizen journey:
          </p>

          <div className="space-y-4">
            {comparisons.map((c, idx) => (
              <div
                key={idx}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[var(--color-ink)]">
                    {c.step}
                  </span>
                  <Badge tone="primary" size="sm">
                    UX Transformation
                  </Badge>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded border border-[var(--color-danger-border)] bg-[var(--color-danger-soft)] p-3 space-y-1">
                    <span className="font-bold text-[var(--color-danger-text)] block flex items-center gap-1">
                      <AlertTriangleIcon size="sm" className="text-[var(--color-danger)]" />
                      Official Website Friction:
                    </span>
                    <p className="text-[var(--color-danger-text)] leading-relaxed">
                      {c.officialFlaw}
                    </p>
                  </div>

                  <div className="rounded border border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-3 space-y-1">
                    <span className="font-bold text-[var(--color-success-text)] block flex items-center gap-1">
                      <CheckIcon size="sm" className="text-[var(--color-success)] stroke-[2.5]" />
                      Modernized Sarathi Journey UX:
                    </span>
                    <p className="text-[var(--color-success-text)] leading-relaxed">
                      {c.modernImprovement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end border-t border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-6 py-3.5">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}
