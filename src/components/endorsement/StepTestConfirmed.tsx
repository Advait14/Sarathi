import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { CheckIcon, ArrowRightIcon, ShieldIcon, FileTextIcon } from "@/components/ui/Icons";
import type { ApplicantRecord } from "@/data/endorsement";

export interface StepTestConfirmedProps {
  applicant: ApplicantRecord;
  applicationReference: string;
  appointment: {
    date: string;
    formattedDate: string;
    time: string;
    venue: string;
  };
  onCompleteFlow: () => void;
}

export function StepTestConfirmed({
  applicant,
  applicationReference,
  appointment,
  onCompleteFlow,
}: StepTestConfirmedProps) {
  return (
    <div className="mt-8 space-y-6">
      <Card
        padding="lg"
        className="border-2 border-[var(--color-success)] bg-[var(--color-surface)] shadow-card"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
          <Badge tone="success" icon={<CheckIcon size="sm" />}>
            Driving Test Appointment Booked
          </Badge>
          <span className="text-xs font-mono font-semibold text-[var(--color-muted)]">
            Ref: {applicationReference}
          </span>
        </div>

        <div className="mt-5 text-center sm:text-left">
          <Heading as="h2" variant="heading">
            Your MCWG Driving Test is Scheduled
          </Heading>
          <Text className="mt-1 text-sm text-[var(--color-text)]" variant="body">
            Your application, fee payment, and test appointment slot are complete.
          </Text>
        </div>

        {/* Appointment Slip */}
        <div className="mt-6 rounded-[var(--radius-sm)] border border-[var(--color-success-border)] bg-[var(--color-success-soft)] p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-success-text)]">
                Appointment Date
              </span>
              <p className="mt-1 text-base font-bold text-[var(--color-ink)]">
                {appointment.formattedDate}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-success-text)]">
                Time Slot
              </span>
              <p className="mt-1 text-base font-mono font-bold text-[var(--color-ink)]">
                {appointment.time}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-success-text)]">
                Test Category
              </span>
              <p className="mt-1 text-base font-bold text-[var(--color-accent-text)]">
                MCWG (Two-Wheeler With Gear)
              </p>
            </div>

            <div className="sm:col-span-2 lg:col-span-3 border-t border-[var(--color-success-border)] pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-success-text)]">
                Test Track Venue
              </span>
              <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
                {appointment.venue}
              </p>
            </div>
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="mt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block mb-3">
            Required Documents to Bring on Test Day
          </span>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <div className="flex items-start gap-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 text-xs">
              <CheckIcon size="sm" className="mt-0.5 text-[var(--color-success)] shrink-0" />
              <div>
                <span className="font-bold text-[var(--color-ink)] block">
                  Original Driving Licence (LMV)
                </span>
                <span className="text-[var(--color-muted)]">
                  Physical card or mParivahan digital verified copy.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 text-xs">
              <CheckIcon size="sm" className="mt-0.5 text-[var(--color-success)] shrink-0" />
              <div>
                <span className="font-bold text-[var(--color-ink)] block">
                  Application Reference Slip
                </span>
                <span className="text-[var(--color-muted)]">
                  Form 2 reference slip with number {applicationReference}.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 text-xs">
              <CheckIcon size="sm" className="mt-0.5 text-[var(--color-success)] shrink-0" />
              <div>
                <span className="font-bold text-[var(--color-ink)] block">
                  Fee Payment Receipt
                </span>
                <span className="text-[var(--color-muted)]">
                  Receipt for ₹850 endorsement and test fee.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 text-xs">
              <CheckIcon size="sm" className="mt-0.5 text-[var(--color-success)] shrink-0" />
              <div>
                <span className="font-bold text-[var(--color-ink)] block">
                  Motorcycle & ISI Helmet
                </span>
                <span className="text-[var(--color-muted)]">
                  Motorcycle with manual gear in good working condition.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 border-t border-[var(--color-border)] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Text as="span" variant="caption" className="text-[var(--color-muted)]">
            Your application state is updated to Step 5 (Driving Test) in the journey tracker.
          </Text>
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRightIcon size="sm" />}
            onClick={onCompleteFlow}
          >
            View Updated Journey Progress
          </Button>
        </div>
      </Card>
    </div>
  );
}
