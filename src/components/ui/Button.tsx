import type { ButtonHTMLAttributes, ReactNode } from "react";
import { SpinnerIcon } from "./Icons";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "btn btn-primary bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] border-transparent shadow-sm",
  secondary:
    "btn btn-outline border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-strong)] active:bg-[var(--color-surface-muted)] shadow-sm",
  ghost:
    "btn btn-ghost text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] active:bg-[var(--color-accent-soft)] border-transparent",
  danger:
    "btn btn-error bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger-hover)] active:bg-[var(--color-danger-text)] border-transparent shadow-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "btn-sm min-h-10 px-3.5 py-1.5 text-xs font-medium gap-1.5",
  md: "btn-md min-h-11 px-4 py-2 text-sm font-semibold gap-2",
  lg: "btn-lg min-h-12 px-6 py-2.5 text-base font-semibold gap-2.5",
};

export function Button({
  children,
  className = "",
  disabled,
  leftIcon,
  loading = false,
  rightIcon,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      aria-busy={loading || undefined}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center rounded-[var(--radius-button)] tracking-tight transition-colors duration-150 select-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <SpinnerIcon size={size === "lg" ? "md" : "sm"} className="text-current animate-spin" />
      ) : leftIcon ? (
        <span aria-hidden="true" className="shrink-0">
          {leftIcon}
        </span>
      ) : null}
      <span>{children}</span>
      {!loading && rightIcon ? (
        <span aria-hidden="true" className="shrink-0">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
}
