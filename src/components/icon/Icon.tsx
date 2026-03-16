import React from "react";

type RequireContext = {
  keys(): string[];
  <T>(path: string): T;
};

const requireIcon = (require as any).context(
  "!!@svgr/webpack?-svgo,+titleProp,+ref!../../assets/icons",
  false,
  /\.svg$/,
) as RequireContext;

type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;
type IconModule = { default: SvgComponent };

export const icons = requireIcon.keys().reduce<Record<string, SvgComponent>>((acc, path) => {
  const name = path.replace(/^\.\//, "").replace(/\.svg$/, "");
  const iconModule = requireIcon<IconModule>(path);
  acc[name] = iconModule.default;
  return acc;
}, {});

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
