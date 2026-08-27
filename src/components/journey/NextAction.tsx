import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ArrowRightIcon } from "@/components/ui/Icons";

export interface NextActionProps {
  actionTitle: string;
  instructions: string;
  primaryCtaText: string;
  whatHappensNext: string;
  onActionClick?: () => void;
}

export function NextAction({
  actionTitle,
  instructions,
  onActionClick,
  primaryCtaText,
  whatHappensNext,
}: NextActionProps) {
  return (
    <Card
      aria-labelledby="next-action-heading"
      variant="accent"
      padding="lg"
      className="bg-[var(--color-surface)]"
    >
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <Badge tone="primary" size="sm">
          Required Action
        </Badge>
        <span className="text-xs text-[var(--color-accent-text)] font-semibold">
          Action Available
        </span>
      </div>

      <div className="mt-4">
        <Text as="p" variant="label" className="text-[var(--color-accent-text)]">
          What you need to do
        </Text>
        <Heading as="h2" className="mt-1 text-xl font-bold" id="next-action-heading" variant="heading">
          {actionTitle}
        </Heading>
        <Text className="mt-2 text-sm text-[var(--color-text)]" variant="body">
          {instructions}
        </Text>
      </div>

      {/* Primary Action Button */}
      <div className="mt-5">
        <Button
          className="w-full sm:w-auto"
          size="md"
          variant="primary"
          rightIcon={<ArrowRightIcon size="sm" />}
          onClick={onActionClick}
        >
          {primaryCtaText}
        </Button>
      </div>

      {/* What Happens Next Preview */}
      <div className="mt-6 border-t border-[var(--color-border)] pt-4">
        <Text as="p" variant="label" className="text-xs">
          What happens next
        </Text>
        <Text className="mt-1 text-xs text-[var(--color-muted)]" variant="bodySmall">
          {whatHappensNext}
        </Text>
      </div>
    </Card>
  );
}
