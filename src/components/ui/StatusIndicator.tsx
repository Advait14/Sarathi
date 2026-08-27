import type { HTMLAttributes } from "react";

export type StatusType =
  | "complete"
  | "current"
  | "upcoming"
  | "waiting"
  | "attention"
  | "blocked"
  | "info";

export type StatusIndicatorProps = HTMLAttributes<HTMLSpanElement> & {
  status: StatusType;
  label: string;
  size?: "sm" | "md";
  showDot?: boolean;
};

const dotClasses: Record<StatusType, string> = {
  complete: "bg-[var(--color-success)] ring-2 ring-[var(--color-success-soft)]",
  current: "bg-[var(--color-accent)] ring-2 ring-[var(--color-accent-soft)]",
  upcoming: "bg-[var(--color-border-strong)] ring-2 ring-[var(--color-surface-muted)]",
  waiting: "bg-[var(--color-warning)] ring-2 ring-[var(--color-warning-soft)]",
  attention: "bg-[var(--color-warning)] ring-2 ring-[var(--color-warning-soft)]",
  blocked: "bg-[var(--color-danger)] ring-2 ring-[var(--color-danger-soft)]",
  info: "bg-[var(--color-info)] ring-2 ring-[var(--color-info-soft)]",
};

const textClasses: Record<StatusType, string> = {
  complete: "text-[var(--color-success-text)] font-semibold",
  current: "text-[var(--color-accent-text)] font-semibold",
  upcoming: "text-[var(--color-muted)] font-medium",
  waiting: "text-[var(--color-warning-text)] font-semibold",
  attention: "text-[var(--color-warning-text)] font-semibold",
  blocked: "text-[var(--color-danger-text)] font-semibold",
  info: "text-[var(--color-info-text)] font-semibold",
};

export function StatusIndicator({
  className = "",
  label,
  showDot = true,
  size = "md",
  status,
  ...props
}: StatusIndicatorProps) {
  const sizeClass = size === "sm" ? "text-xs gap-1.5" : "text-sm gap-2";
  const dotSizeClass = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";

  return (
    <span
      role="status"
      className={`inline-flex items-center ${sizeClass} ${textClasses[status]} ${className}`}
      {...props}
    >
      {showDot ? (
        <span
          aria-hidden="true"
          className={`shrink-0 rounded-full ${dotSizeClass} ${dotClasses[status]}`}
        />
      ) : null}
      <span>{label}</span>
    </span>
  );
}
