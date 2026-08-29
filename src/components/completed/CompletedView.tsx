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
import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Text";
import { CheckIcon, AwardIcon } from "@/components/ui/Icons";

export interface CompletedViewProps {
  onViewJourney?: () => void;
  onBackToLanding?: () => void;
}

export function CompletedView({ onViewJourney, onBackToLanding }: CompletedViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    applicationReference,
    existingLicence,
    serviceType,
  } = syntheticJourneyData;

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* 1. Primary Celebratory Hero Header */}
      <div className="rounded-[var(--radius-md)] border-2 border-emerald-500 bg-gradient-to-r from-emerald-900 via-[#003366] to-[#0B57D0] p-6 text-white shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[0.6875rem] font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-sm">
                <CheckIcon size="sm" className="stroke-[3]" />
                All 6 of 6 Milestones Completed
              </span>
              <span className="text-xs text-white/80 font-mono">
                Ref: {applicationReference}
              </span>
            </div>
            <h1 className="text-xl md:text-3xl font-black tracking-tight text-white">
              Congratulation on getting your updated Drivers License
            </h1>
            <p className="text-xs md:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Your MCWG (Motorcycle With Gear) practical driving test results are official. Your driving licence record has been endorsed in the national registry and your digital copy is ready.
            </p>
          </div>

          <div className="self-start md:self-auto shrink-0 flex items-center gap-3">
            <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-center backdrop-blur-md">
              <span className="text-[0.625rem] font-bold uppercase tracking-wider text-emerald-200 block">
                Licence Status
              </span>
              <span className="text-lg font-black text-white block">
                LMV + MCWG
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Master Journey Persistent Header */}
      <JourneyHeader
        applicationReference={applicationReference}
        completedCount={6}
        existingLicence={existingLicence}
        serviceType={serviceType}
        totalSteps={6}
        vehicleClass="LMV + MCWG (Updated)"
      />

      {/* 3. 2-Column Responsive Layout */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
        {/* Left Column: All 6 Stages Completed Timeline */}
        <div className="space-y-6">
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-card">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3 mb-4">
              <div>
                <Heading as="h2" variant="section" className="text-sm font-bold text-[var(--color-ink)]">
                  Master Journey Timeline
                </Heading>
                <span className="text-[0.6875rem] text-[var(--color-muted)]">
                  All 6 stages verified and closed in the central database
                </span>
              </div>
              <Badge tone="success" size="sm">
                6 of 6 Milestones Complete
              </Badge>
            </div>

            <JourneyProgress steps={completedJourneySteps} />
          </div>
        </div>

        {/* Right Column: Digital Copy of Updated Licence & Completion Actions */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <CompletedStateCard
            licenceData={syntheticCompletedLicence}
            onViewUpdatedLicence={() => setIsModalOpen(true)}
            onViewJourney={onViewJourney ?? (() => {})}
            onBackToLanding={onBackToLanding}
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
