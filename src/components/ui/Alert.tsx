import type { HTMLAttributes, ReactNode } from "react";
import {
  InfoIcon,
  CheckIcon,
  ClockIcon,
  AlertTriangleIcon,
} from "./Icons";

export type AlertType = "info" | "success" | "warning" | "error";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  type?: AlertType;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
}

const alertConfig: Record<
  AlertType,
  {
    classes: string;
    defaultIcon: ReactNode;
    titleColor: string;
    role: string;
  }
> = {
  info: {
    classes: "alert alert-info border border-[var(--color-info-border)] bg-[var(--color-info-soft)] text-[var(--color-info-text)]",
    defaultIcon: <InfoIcon size="md" className="text-[var(--color-info)] shrink-0" />,
    titleColor: "text-[var(--color-primary)]",
    role: "status",
  },
  success: {
    classes: "alert alert-success border border-[var(--color-success-border)] bg-[var(--color-success-soft)] text-[var(--color-success-text)]",
    defaultIcon: <CheckIcon size="md" className="text-[var(--color-success)] shrink-0 stroke-[2.5]" />,
    titleColor: "text-[var(--color-success-text)]",
    role: "status",
  },
  warning: {
    classes: "alert alert-warning border border-[var(--color-warning-border)] bg-[var(--color-warning-soft)] text-[var(--color-warning-text)]",
    defaultIcon: <ClockIcon size="md" className="text-[var(--color-warning)] shrink-0" />,
    titleColor: "text-[var(--color-warning-text)]",
    role: "status",
  },
  error: {
    classes: "alert alert-error border border-[var(--color-danger-border)] bg-[var(--color-danger-soft)] text-[var(--color-danger-text)]",
    defaultIcon: <AlertTriangleIcon size="md" className="text-[var(--color-danger)] shrink-0" />,
    titleColor: "text-[var(--color-danger-text)]",
    role: "alert",
  },
};

export function Alert({
  type = "info",
  title,
  children,
  icon,
  className = "",
  ...props
}: AlertProps) {
  const config = alertConfig[type];

  return (
    <div
      role={config.role}
      className={`rounded-[var(--radius-sm)] p-4 flex items-start gap-3 shadow-sm ${config.classes} ${className}`}
      {...props}
    >
      {icon ?? config.defaultIcon}
      <div className="space-y-1 text-xs flex-1">
        {title && (
          <span className={`font-bold text-sm block ${config.titleColor}`}>
            {title}
          </span>
        )}
        <div className="leading-relaxed text-current">{children}</div>
      </div>
    </div>
  );
}
