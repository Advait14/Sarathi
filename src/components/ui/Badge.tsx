import type { HTMLAttributes, ReactNode } from "react";

export type BadgeTone = "neutral" | "primary" | "info" | "success" | "warning" | "danger";
export type BadgeSize = "sm" | "md";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  size?: BadgeSize;
  icon?: ReactNode;
};

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-[var(--color-surface-muted)] text-[var(--color-muted)] border-[var(--color-border)]",
  primary: "bg-[var(--color-primary-soft)] text-[var(--color-primary-text)] border-[var(--color-primary-border)]",
  info: "bg-[var(--color-info-soft)] text-[var(--color-info-text)] border-[var(--color-info-border)]",
  success: "bg-[var(--color-success-soft)] text-[var(--color-success-text)] border-[var(--color-success-border)]",
  warning: "bg-[var(--color-warning-soft)] text-[var(--color-warning-text)] border-[var(--color-warning-border)]",
  danger: "bg-[var(--color-danger-soft)] text-[var(--color-danger-text)] border-[var(--color-danger-border)]",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[0.6875rem] leading-4 gap-1",
  md: "px-2.5 py-1 text-xs leading-4 gap-1.5",
};

export function Badge({
  children,
  className = "",
  icon,
  size = "md",
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-[var(--radius-badge)] border tracking-wide uppercase ${sizeClasses[size]} ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {icon ? (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </span>
  );
}
