import { Card } from "@/components/ui/Card";
import { Heading, Text } from "@/components/ui/Text";
import { CheckIcon, InfoIcon, ShieldIcon } from "@/components/ui/Icons";

export interface WaitingGuidanceCardProps {
  rtoName: string;
  trackAddress: string;
}

export function WaitingGuidanceCard({ rtoName, trackAddress }: WaitingGuidanceCardProps) {
  return (
    <Card padding="md" className="bg-[var(--color-surface)] shadow-sm">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
        <InfoIcon size="sm" className="text-[var(--color-accent)]" />
        <Heading as="h2" variant="section">
          While you wait
        </Heading>
      </div>

      <div className="mt-4 space-y-3.5 text-xs text-[var(--color-text)]">
        <div className="flex items-start gap-2.5">
          <CheckIcon size="sm" className="text-[var(--color-success)] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[var(--color-ink)] block">
              Know your test track location:
            </span>
            <p className="mt-0.5 text-[var(--color-muted)]">
              {trackAddress}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <CheckIcon size="sm" className="text-[var(--color-success)] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[var(--color-ink)] block">
              Practice motorcycle riding with gear:
            </span>
            <p className="mt-0.5 text-[var(--color-muted)]">
              Your MCWG Learner&apos;s Licence permits supervised practice before your RTO skill test.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <CheckIcon size="sm" className="text-[var(--color-success)] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[var(--color-ink)] block">
              Test day documents:
            </span>
            <p className="mt-0.5 text-[var(--color-muted)]">
              Keep your original LMV licence card and an ISI certified helmet ready for appointment day.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
