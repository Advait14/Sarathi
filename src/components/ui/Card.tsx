import type { HTMLAttributes, ReactNode } from "react";

export type CardVariant = "default" | "accent" | "warning" | "danger" | "muted";
export type CardPadding = "none" | "sm" | "md" | "lg";

export type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  as?: "section" | "div" | "article" | "aside";
};

const variantClasses: Record<CardVariant, string> = {
  default: "border border-[var(--color-border)] bg-[var(--color-surface)] shadow-card",
  accent: "border-2 border-[var(--color-accent)] bg-[var(--color-surface)] shadow-card",
  warning: "border border-[var(--color-warning-border)] bg-[var(--color-warning-soft)] shadow-sm",
  danger: "border border-[var(--color-danger-border)] bg-[var(--color-danger-soft)] shadow-sm",
  muted: "border border-[var(--color-border)] bg-[var(--color-surface-subtle)]",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3 sm:p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Card({
  as: Component = "section",
  children,
  className = "",
  padding = "md",
  variant = "default",
  ...props
}: CardProps) {
  return (
    <Component
      className={`rounded-[var(--radius-card)] ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
