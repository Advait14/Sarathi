import type { HTMLAttributes } from "react";

export type ProgressTone = "primary" | "success" | "warning" | "error" | "info";

export interface ProgressProps extends HTMLAttributes<HTMLProgressElement> {
  value: number;
  max?: number;
  tone?: ProgressTone;
}

const toneClasses: Record<ProgressTone, string> = {
  primary: "progress-primary bg-[var(--color-surface-muted)] text-[var(--color-primary)]",
  success: "progress-success bg-[var(--color-surface-muted)] text-[var(--color-success)]",
  warning: "progress-warning bg-[var(--color-surface-muted)] text-[var(--color-warning)]",
  error: "progress-error bg-[var(--color-surface-muted)] text-[var(--color-danger)]",
  info: "progress-info bg-[var(--color-surface-muted)] text-[var(--color-info)]",
};

export function Progress({
  value,
  max = 100,
  tone = "primary",
  className = "",
  ...props
}: ProgressProps) {
  return (
    <progress
      className={`progress w-full h-2 rounded-full overflow-hidden ${toneClasses[tone]} ${className}`}
      value={value}
      max={max}
      {...props}
    />
  );
}
