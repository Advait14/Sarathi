import { JourneyHeader, JourneyProgress } from "@/components/journey";
import { Card } from "@/components/ui/Card";
import { Heading, Text } from "@/components/ui/Text";
import { CheckIcon, InfoIcon } from "@/components/ui/Icons";
import { ContextualActionNotification } from "./ContextualActionNotification";
import { syntheticJourneyData } from "@/data/journey";

export interface ActionAvailableViewProps {
  onContinue: () => void;
  onViewJourney?: () => void;
}

export function ActionAvailableView({
  onContinue,
  onViewJourney,
}: ActionAvailableViewProps) {
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

        {/* Right Column: Contextual Action Notification & Preparation Card */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <ContextualActionNotification
            applicationReference={applicationReference}
            rtoName="RTO Janakpuri, West Delhi (DL-04)"
            vehicleClass={vehicleClass}
            onContinue={onContinue}
            onViewJourney={onViewJourney}
          />

          <Card padding="md" className="bg-[var(--color-surface)] shadow-sm">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <InfoIcon size="sm" className="text-[var(--color-accent)]" />
              <Heading as="h2" variant="section">
                Stage 4 Preview
              </Heading>
            </div>

            <div className="mt-4 space-y-3 text-xs text-[var(--color-text)]">
              <div className="flex items-start gap-2">
                <CheckIcon size="sm" className="text-[var(--color-success)] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[var(--color-ink)]">Statutory fee: </strong>
                  ₹850 (₹500 endorsement + ₹300 test fee + ₹50 track maintenance).
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckIcon size="sm" className="text-[var(--color-success)] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[var(--color-ink)]">Slot selection: </strong>
                  Morning & afternoon slots available at Janakpuri Automated Track.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
