"use client";

import {
  prerequisiteStatesData,
  type PrerequisiteStateKey,
} from "@/data/prerequisites";
import { PrerequisiteGoal } from "./PrerequisiteGoal";
import { PrerequisiteChecklist } from "./PrerequisiteChecklist";
import { PrerequisiteMissingCard } from "./PrerequisiteMissingCard";
import { PrerequisiteReadyCard } from "./PrerequisiteReadyCard";

export interface PrerequisiteViewProps {
  stateKey: PrerequisiteStateKey;
  onContinueToEndorsement?: () => void;
  onApplyForLL?: () => void;
}

export function PrerequisiteView({
  onApplyForLL,
  onContinueToEndorsement,
  stateKey,
}: PrerequisiteViewProps) {
  const currentData = prerequisiteStatesData[stateKey];
  const isReady = stateKey === "eligible_for_endorsement";

  return (
    <div className="w-full">
      {/* 1. Goal Section */}
      <PrerequisiteGoal
        title={currentData.goal.title}
        targetClass={currentData.goal.targetClass}
        existingLicence={currentData.goal.existingLicence}
        existingNumber={currentData.goal.existingNumber}
      />

      {/* 2. Responsive 2-Column Section */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
        {/* Left Column: Prerequisite Checklist */}
        <div className="space-y-6">
          <PrerequisiteChecklist items={currentData.checklist} />
        </div>

        {/* Right Column: Status & Action Card (Sticky on Desktop) */}
        <div className="space-y-6 lg:sticky lg:top-6">
          {isReady ? (
            <PrerequisiteReadyCard
              headline={currentData.headline}
              subheadline={currentData.subheadline}
              primaryCta={currentData.primaryCta}
              onPrimaryCtaClick={onContinueToEndorsement}
            />
          ) : (
            <PrerequisiteMissingCard
              headline={currentData.headline}
              subheadline={currentData.subheadline}
              missingExplanation={currentData.missingExplanation}
              primaryCta={currentData.primaryCta}
              secondaryAction={currentData.secondaryAction}
              onPrimaryCtaClick={onApplyForLL}
            />
          )}
        </div>
      </div>
    </div>
  );
}
