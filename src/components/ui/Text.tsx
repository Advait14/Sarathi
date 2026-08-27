import type { HTMLAttributes, ReactNode } from "react";

export type TextVariant =
  | "body"
  | "bodyLarge"
  | "bodySmall"
  | "label"
  | "caption"
  | "muted";

export type TextProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "p" | "span" | "div" | "label";
  variant?: TextVariant;
};

const textClasses: Record<TextVariant, string> = {
  body: "text-base leading-normal text-[var(--color-text)]",
  bodyLarge: "text-lg leading-relaxed text-[var(--color-text)]",
  bodySmall: "text-sm leading-normal text-[var(--color-text)]",
  label: "text-sm font-semibold tracking-wide text-[var(--color-muted)]",
  caption: "text-xs leading-normal text-[var(--color-muted)]",
  muted: "text-sm leading-normal text-[var(--color-subtle)]",
};

export function Text({
  as: Component = "p",
  children,
  className = "",
  variant = "body",
  ...props
}: TextProps) {
  return (
    <Component className={`${textClasses[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
}

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingVariant = "display" | "title" | "heading" | "section" | "subsection";

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
  as?: HeadingLevel;
  variant?: HeadingVariant;
};

const headingClasses: Record<HeadingVariant, string> = {
  display:
    "text-[length:var(--text-display)] font-bold tracking-tight text-[var(--color-ink)] leading-tight",
  title:
    "text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink)] leading-tight",
  heading:
    "text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-ink)] leading-snug",
  section:
    "text-lg sm:text-xl font-semibold tracking-tight text-[var(--color-ink)] leading-snug",
  subsection:
    "text-base sm:text-lg font-semibold text-[var(--color-ink)] leading-normal",
};

export function Heading({
  as: Component = "h2",
  children,
  className = "",
  variant = "heading",
  ...props
}: HeadingProps) {
  return (
    <Component className={`${headingClasses[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
}
