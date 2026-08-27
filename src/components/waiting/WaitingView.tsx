import { JourneyHeader, JourneyProgress } from "@/components/journey";
import { WaitingCard } from "./WaitingCard";
import { WaitingGuidanceCard } from "./WaitingGuidanceCard";
import { syntheticJourneyData } from "@/data/journey";

export function WaitingView() {
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
            currentStage="Stage 4: Endorsement Scrutiny / Review"
            lastUpdated="27 Aug 2026, 03:45 PM"
            rtoName="Licensing Authority (RTO Janakpuri, West Delhi)"
            whatIsHappening="Your application documents, linked MCWG Learner's Licence, and fitness declarations are currently being scrutinized by the licensing officer."
            whatHappensNext="As soon as officer review is completed, your next step (statutory fee payment and driving test slot booking) will appear right here."
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
