import React from "react";
// This needs refactoring for vite, require context is a webpack specific loader so we need to revactor it to use import.meta.glob instead


interface SVGModules {
  default : React.FC<React.SVGProps<SVGSVGElement>>;
}

const iconModules = import.meta.glob<SVGModules>("../../assets/icons/*.svg", {
  eager: true,
  query: "?react",
})

export const icons = Object.entries(iconModules).reduce<Record<string, React.FC<React.SVGProps<SVGSVGElement>>>>(
  (acc, [path, module]) => {
    // Extract name: "../../assets/icons/arrow-left.svg" -> "arrow-left"
    const name = path.split('/').pop()?.replace('.svg', '') || '';
    if (name) {
      acc[name] = module.default;
    }
    return acc;
  },
  {}
);

export type IconName = keyof typeof icons;
export const iconNames: IconName[] = Object.keys(icons) as IconName[];

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "color">,
  React.AriaAttributes {
  name: IconName;
  size?: number;
  strokeColor?: string;
  className?: string;
}

const Icon = ({
  name,
  size = 24,
  strokeColor,
  className,
  style,
  ...rest
}: IconProps) => {
  const Svg = icons[name];
  if (!Svg) return null;

  const inheritedStyle: React.CSSProperties = { ...(style ?? {}) };
  if (strokeColor) {
    inheritedStyle.color = strokeColor;
  }

  return (
    <Svg
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      stroke={strokeColor ?? "currentColor"}
      style={inheritedStyle}
      {...rest}
    />
  );
};

export default Icon;
