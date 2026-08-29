import type { HTMLAttributes, ReactNode } from "react";

export type ContainerSize = "narrow" | "content" | "wide" | "full";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: ContainerSize;
  as?: "div" | "section" | "main" | "header" | "footer";
};

const sizeClasses: Record<ContainerSize, string> = {
  narrow: "max-w-4xl",
  content: "max-w-6xl",
  wide: "max-w-[1600px]",
  full: "w-full",
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
      className={`mx-auto w-full px-4 sm:px-8 lg:px-12 xl:px-16 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
