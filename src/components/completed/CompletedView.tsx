"use client";

import { useState } from "react";
import { JourneyHeader, JourneyProgress } from "@/components/journey";
import { CompletedStateCard } from "./CompletedStateCard";
import { UpdatedLicenceModal } from "./UpdatedLicenceModal";
import {
  syntheticCompletedLicence,
  completedJourneySteps,
} from "@/data/completed";
import { syntheticJourneyData } from "@/data/journey";

export interface CompletedViewProps {
  onViewJourney?: () => void;
}

export function CompletedView({ onViewJourney }: CompletedViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    applicationReference,
    existingLicence,
    serviceType,
    vehicleClass,
  } = syntheticJourneyData;

  return (
    <div className="w-full">
      {/* Journey Header with 6 of 6 Complete */}
      <JourneyHeader
        applicationReference={applicationReference}
        completedCount={6}
        existingLicence={existingLicence}
        serviceType={serviceType}
        totalSteps={6}
        vehicleClass="LMV + MCWG (Updated)"
      />

      {/* 2-Column Responsive Layout */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
        {/* Left Column: All 6 Stages Completed Timeline */}
        <div className="space-y-6">
          <JourneyProgress steps={completedJourneySteps} />
        </div>

        {/* Right Column: Calm Completion State Card */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <CompletedStateCard
            licenceData={syntheticCompletedLicence}
            onViewUpdatedLicence={() => setIsModalOpen(true)}
            onViewJourney={onViewJourney ?? (() => {})}
          />
        </div>
      </div>

      {/* Updated Synthetic Driving Licence Modal */}
      <UpdatedLicenceModal
        isOpen={isModalOpen}
        licenceData={syntheticCompletedLicence}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
