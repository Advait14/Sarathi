import type { HTMLAttributes, ReactNode } from "react";

export type ContainerSize = "narrow" | "content" | "wide" | "full";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: ContainerSize;
  as?: "div" | "section" | "main" | "header" | "footer";
};

const sizeClasses: Record<ContainerSize, string> = {
  narrow: "max-w-2xl",
  content: "max-w-3xl",
  wide: "max-w-5xl",
  full: "max-w-7xl",
};

export function Container({
  as: Component = "div",
  children,
  className = "",
  size = "wide",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
