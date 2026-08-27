"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  InfoIcon,
} from "@/components/ui/Icons";

export interface PrerequisiteMissingCardProps {
  headline: string;
  subheadline: string;
  missingExplanation?: {
    whatIsMissing: string;
    whyRequired: string;
    legalReference: string;
    nextStepSummary: string;
  };
  primaryCta: {
    label: string;
    action: string;
  };
  secondaryAction?: {
    label: string;
  };
  onPrimaryCtaClick?: () => void;
}

export function PrerequisiteMissingCard({
  headline,
  missingExplanation,
  onPrimaryCtaClick,
  primaryCta,
  secondaryAction,
  subheadline,
}: PrerequisiteMissingCardProps) {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  return (
    <Card
      aria-labelledby="prerequisite-missing-heading"
      variant="warning"
      padding="lg"
      className="bg-[var(--color-surface)]"
    >
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-warning-border)] pb-3">
        <div className="flex items-center gap-2">
          <Badge tone="warning" icon={<AlertTriangleIcon size="sm" />}>
            Requirement Needed
          </Badge>
        </div>
        <span className="text-xs font-semibold text-[var(--color-warning-text)]">
          Early Check
        </span>
      </div>

      <div className="mt-4">
        <Heading
          as="h2"
          id="prerequisite-missing-heading"
          className="text-xl font-bold text-[var(--color-ink)]"
          variant="heading"
        >
          {headline}
        </Heading>
        <Text className="mt-2 text-sm text-[var(--color-text)]" variant="body">
          {subheadline}
        </Text>
      </div>

      {/* Primary Action Button */}
      <div className="mt-5">
        <Button
          variant="primary"
          size="md"
          className="w-full sm:w-auto"
          rightIcon={<ArrowRightIcon size="sm" />}
          onClick={onPrimaryCtaClick}
        >
          {primaryCta.label}
        </Button>
      </div>

      {/* Secondary Expandable Explanation */}
      {missingExplanation && secondaryAction ? (
        <div className="mt-6 border-t border-[var(--color-border)] pt-4">
          <button
            type="button"
            onClick={() => setIsExplanationOpen((prev) => !prev)}
            aria-expanded={isExplanationOpen}
            aria-controls="prerequisite-explanation-details"
            className="flex w-full items-center justify-between gap-2 text-left text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors focus-visible:outline-none"
          >
            <span className="flex items-center gap-2">
              <InfoIcon size="sm" className="text-[var(--color-accent)]" />
              {secondaryAction.label}
            </span>
            <ChevronRightIcon
              size="sm"
              className={`transition-transform duration-200 ${
                isExplanationOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {isExplanationOpen ? (
            <div
              id="prerequisite-explanation-details"
              className="mt-3 rounded-[var(--radius-sm)] border border-[var(--color-info-border)] bg-[var(--color-info-soft)] p-4 text-xs text-[var(--color-text)] space-y-2.5"
            >
              <div>
                <span className="font-bold text-[var(--color-ink)] block">
                  Missing Prerequisite:
                </span>
                <p className="mt-0.5 text-[var(--color-text)]">
                  {missingExplanation.whatIsMissing}
                </p>
              </div>

              <div>
                <span className="font-bold text-[var(--color-ink)] block">
                  Why this is required:
                </span>
                <p className="mt-0.5 leading-relaxed text-[var(--color-text)]">
                  {missingExplanation.whyRequired}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-info-border)] pt-2 text-[0.6875rem] text-[var(--color-muted)]">
                <span>{missingExplanation.legalReference}</span>
                <span className="font-semibold text-[var(--color-info-text)]">
                  {missingExplanation.nextStepSummary}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
