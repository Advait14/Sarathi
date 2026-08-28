import { JourneyHeader, JourneyProgress } from "@/components/journey";
import { WaitingCard } from "./WaitingCard";
import { WaitingGuidanceCard } from "./WaitingGuidanceCard";
import { syntheticJourneyData } from "@/data/journey";

export interface WaitingViewProps {
  onActionClick?: () => void;
}

export function WaitingView({ onActionClick }: WaitingViewProps) {
  const {
    applicationReference,
    existingLicence,
    serviceType,
    steps,
    vehicleClass,
  } = syntheticJourneyData;

  const completedCount = steps.filter((s) => s.state === "completed").length;

  return (
    <div className="w-full">
      {/* Journey Header with Persistent Reference */}
      <JourneyHeader
        applicationReference={applicationReference}
        completedCount={completedCount}
        existingLicence={existingLicence}
        serviceType={serviceType}
        totalSteps={steps.length}
        vehicleClass={vehicleClass}
      />

      {/* 2-Column Responsive Layout */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
        {/* Left Column: Persistent Journey Progress */}
        <div className="space-y-6">
          <JourneyProgress steps={steps} />
        </div>

        {/* Right Column: Legitimate Waiting State Card & Guidance */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <WaitingCard
            applicationReference={applicationReference}
            currentStage="Stage 3: Mandatory Holding Period (In Progress)"
            lastUpdated="28 Aug 2026, 03:45 PM"
            rtoName="Licensing Authority (RTO Janakpuri, West Delhi)"
            whatIsHappening="Your MCWG Learner's Licence is active. The mandatory 30-day practice holding period under CMVR Rule 15 is in progress (Day 14 of 30)."
            whatHappensNext="As soon as the 30-day holding period completes on 19 Sep 2026, your endorsement application and driving test booking will automatically unlock."
          />

          <WaitingGuidanceCard
            rtoName="RTO Janakpuri, West Delhi (DL-04)"
            trackAddress="Automated Driving Test Track, RTO Janakpuri, New Delhi - 110058"
          />
        </div>
      </div>
    </div>
  );
}
