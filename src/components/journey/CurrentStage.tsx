import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Heading, Text } from "@/components/ui/Text";

export interface CurrentStageProps {
  stageNumber: number;
  totalStages: number;
  title: string;
  description: string;
}

export function CurrentStage({
  description,
  stageNumber,
  title,
  totalStages,
}: CurrentStageProps) {
  return (
    <Card aria-labelledby="current-stage-heading" padding="md" className="bg-[var(--color-surface)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center gap-2">
          <Badge tone="info" size="sm">
            Where you are
          </Badge>
          <Text as="span" variant="caption" className="font-semibold text-[var(--color-muted)]">
            Stage {stageNumber} of {totalStages}
          </Text>
        </div>
        <StatusIndicator label="Active stage" status="current" size="sm" />
      </div>

      <div className="mt-4">
        <Heading as="h2" id="current-stage-heading" variant="heading">
          {title}
        </Heading>
        <Text className="mt-2 text-sm text-[var(--color-text)]" variant="body">
          {description}
        </Text>
      </div>
    </Card>
  );
}
