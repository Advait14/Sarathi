import type { PrerequisiteCheckItem } from "@/data/prerequisites";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Text";
import { CheckIcon, AlertTriangleIcon, ClockIcon } from "@/components/ui/Icons";

export interface PrerequisiteChecklistProps {
  items: PrerequisiteCheckItem[];
}

export function PrerequisiteChecklist({ items }: PrerequisiteChecklistProps) {
  return (
    <Card aria-labelledby="prerequisite-checklist-heading" padding="md" className="bg-[var(--color-surface)]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div>
          <Heading as="h2" id="prerequisite-checklist-heading" variant="section">
            Prerequisite checklist
          </Heading>
          <Text className="mt-0.5 text-xs text-[var(--color-muted)]" variant="caption">
            Official requirements checked before starting endorsement
          </Text>
        </div>
      </div>

      <ul role="list" className="mt-4 space-y-4 list-none p-0 m-0">
        {items.map((item) => {
          const isVerified = item.status === "verified";
          const isMissing = item.status === "missing";
          const isPending = item.status === "pending";

          return (
            <li
              key={item.id}
              className={`rounded-[var(--radius-sm)] border p-3.5 transition-colors ${
                isVerified
                  ? "border-[var(--color-success-border)] bg-[var(--color-success-soft)]"
                  : isMissing
                  ? "border-[var(--color-warning-border)] bg-[var(--color-warning-soft)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface-subtle)]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Status Glyph Icon */}
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${
                      isVerified
                        ? "bg-[var(--color-success)]"
                        : isMissing
                        ? "bg-[var(--color-warning)]"
                        : "bg-[var(--color-border-strong)]"
                    }`}
                  >
                    {isVerified ? (
                      <CheckIcon size="sm" className="stroke-[2.5]" />
                    ) : isMissing ? (
                      <AlertTriangleIcon size="sm" className="stroke-[2.5]" />
                    ) : (
                      <ClockIcon size="sm" className="stroke-[2.5]" />
                    )}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`text-sm font-bold leading-tight ${
                          isVerified
                            ? "text-[var(--color-success-text)]"
                            : isMissing
                            ? "text-[var(--color-warning-text)]"
                            : "text-[var(--color-muted)]"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isVerified
                          ? "text-[var(--color-success-text)]"
                          : isMissing
                          ? "text-[var(--color-warning-text)]"
                          : "text-[var(--color-muted)]"
                      }`}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <Badge
                  tone={isVerified ? "success" : isMissing ? "warning" : "neutral"}
                  size="sm"
                  className="shrink-0"
                >
                  {item.statusLabel}
                </Badge>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
