import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ShieldIcon } from "@/components/ui/Icons";
import { ENDORSEMENT_STEPS, type EndorsementStepId } from "@/data/endorsement";

export interface EndorsementFlowHeaderProps {
  currentStepId: EndorsementStepId;
  onBack?: () => void;
  canGoBack: boolean;
  onExitFlow?: () => void;
}

export function EndorsementFlowHeader({
  canGoBack,
  currentStepId,
  onBack,
  onExitFlow,
}: EndorsementFlowHeaderProps) {
  const currentIndex = ENDORSEMENT_STEPS.findIndex((s) => s.id === currentStepId);
  const currentStep = ENDORSEMENT_STEPS[currentIndex] || ENDORSEMENT_STEPS[0];
  const progressPercent = Math.round(((currentIndex + 1) / ENDORSEMENT_STEPS.length) * 100);

  return (
    <header className="border-b border-[var(--color-border)] pb-6 pt-2">
      {/* Top Bar with Navigation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {canGoBack && onBack ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              ← Previous Step
            </Button>
          ) : onExitFlow ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onExitFlow}
              className="text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              ← Back to Overview
            </Button>
          ) : null}
          <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
            Form 2 Endorsement Flow
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[var(--color-accent-text)]">
            Step {currentStep.stepNumber} of {ENDORSEMENT_STEPS.length}
          </span>
          <span className="text-xs text-[var(--color-muted)]">
            ({currentStep.shortTitle})
          </span>
        </div>
      </div>

      {/* Step Title & Subtitle */}
      <div className="mt-4">
        <Heading as="h1" variant="title">
          {currentStep.title}
        </Heading>
        <Text className="mt-1 text-sm text-[var(--color-text)]" variant="body">
          {currentStep.description}
        </Text>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Application progress: step ${currentStep.stepNumber} of ${ENDORSEMENT_STEPS.length}`}
          className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface-muted)] border border-[var(--color-border)]"
        >
          <div
            className="h-full bg-[var(--color-accent)] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
}
