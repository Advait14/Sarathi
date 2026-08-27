import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/Icons";

export interface PrerequisiteReadyCardProps {
  headline: string;
  subheadline: string;
  primaryCta: {
    label: string;
    action: string;
  };
  onPrimaryCtaClick?: () => void;
}

export function PrerequisiteReadyCard({
  headline,
  onPrimaryCtaClick,
  primaryCta,
  subheadline,
}: PrerequisiteReadyCardProps) {
  return (
    <Card
      aria-labelledby="prerequisite-ready-heading"
      variant="default"
      padding="lg"
      className="border-2 border-[var(--color-success)] bg-[var(--color-surface)] shadow-card"
    >
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center gap-2">
          <Badge tone="success" icon={<CheckIcon size="sm" />}>
            Prerequisites Complete
          </Badge>
        </div>
        <span className="text-xs font-semibold text-[var(--color-success-text)]">
          All Requirements Satisfied
        </span>
      </div>

      <div className="mt-4">
        <Heading
          as="h2"
          id="prerequisite-ready-heading"
          className="text-xl font-bold text-[var(--color-ink)]"
          variant="heading"
        >
          {headline}
        </Heading>
        <Text className="mt-2 text-sm text-[var(--color-text)]" variant="body">
          {subheadline}
        </Text>
      </div>

      {/* Summary Bullet points */}
      <div className="mt-4 rounded-[var(--radius-sm)] border border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-3.5 text-xs text-[var(--color-success-text)] space-y-1.5 font-medium">
        <p className="flex items-center gap-2">
          <CheckIcon size="sm" className="shrink-0 stroke-[2.5]" />
          <span>Existing LMV driving licence active and verified</span>
        </p>
        <p className="flex items-center gap-2">
          <CheckIcon size="sm" className="shrink-0 stroke-[2.5]" />
          <span>MCWG Learner&apos;s Licence issued and valid</span>
        </p>
        <p className="flex items-center gap-2">
          <CheckIcon size="sm" className="shrink-0 stroke-[2.5]" />
          <span>Mandatory statutory holding period completed</span>
        </p>
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
    </Card>
  );
}
