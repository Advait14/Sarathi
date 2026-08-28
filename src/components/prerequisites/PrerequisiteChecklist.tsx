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
    <Card aria-labelledby="prerequisite-checklist-heading" padding="md" className="bg-[var(--color-surface)] shadow-card">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
        <div>
          <Heading as="h2" id="prerequisite-checklist-heading" variant="section">
            Prerequisite Readiness Checklist
          </Heading>
          <Text className="mt-0.5 text-xs text-[var(--color-muted)]" variant="caption">
            Official statutory criteria evaluated before endorsement filing
          </Text>
        </div>
        <Badge tone="neutral" size="sm">
          CMVR Rule 10
        </Badge>
      </div>

      <ul role="list" className="mt-4 space-y-3 list-none p-0 m-0">
        {items.map((item, index) => {
          const isVerified = item.status === "verified";
          const isMissing = item.status === "missing";
          const isPending = item.status === "pending";

          const categoryLabel = isVerified
            ? "1. WHAT YOU HAVE"
            : isMissing
            ? "2. WHAT YOU NEED"
            : "3. WHAT HAPPENS NEXT";

          return (
            <li
              key={item.id}
              className={`rounded-[var(--radius-sm)] border p-4 transition-all ${
                isVerified
                  ? "border-[var(--color-success-border)] bg-[var(--color-success-soft)]"
                  : isMissing
                  ? "border-2 border-[var(--color-warning-border)] bg-[var(--color-warning-soft)] shadow-sm"
                  : "border-[var(--color-border)] bg-[var(--color-surface-subtle)]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Status Glyph Icon */}
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-white shadow-sm font-bold text-xs ${
                      isVerified
                        ? "bg-[var(--color-success)]"
                        : isMissing
                        ? "bg-[var(--color-warning)] text-white"
                        : "bg-[var(--color-muted)] text-white"
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

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.625rem] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                        {categoryLabel}
                      </span>
                    </div>

                    <h3
                      className={`text-sm font-bold leading-tight ${
                        isVerified
                          ? "text-[var(--color-success-text)]"
                          : isMissing
                          ? "text-[var(--color-ink)]"
                          : "text-[var(--color-muted)]"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-xs ${
                        isVerified
                          ? "text-[var(--color-success-text)]"
                          : isMissing
                          ? "text-[var(--color-text)]"
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
                  className="shrink-0 self-start font-bold"
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
