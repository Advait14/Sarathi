import type { JourneyStepData } from "@/data/journey";
import { Card } from "@/components/ui/Card";
import { Heading, Text } from "@/components/ui/Text";
import { JourneyStep } from "./JourneyStep";

export interface JourneyProgressProps {
  steps: JourneyStepData[];
}

export function JourneyProgress({ steps }: JourneyProgressProps) {
  return (
    <section aria-labelledby="journey-progress-heading" className="w-full">
      <div className="mb-4">
        <Heading as="h2" id="journey-progress-heading" variant="section">
          Journey stages
        </Heading>
        <Text className="mt-1" variant="caption">
          Continuous citizen pathway showing completed requirements, your current stage, and next steps.
        </Text>
      </div>

      <Card padding="md" className="bg-[var(--color-surface)]">
        <ol aria-label="Endorsement journey stages" className="list-none p-0 m-0">
          {steps.map((step, index) => (
            <JourneyStep
              key={step.id}
              {...step}
              stepIndex={index + 1}
              isLast={index === steps.length - 1}
            />
          ))}
        </ol>
      </Card>
    </section>
  );
}
