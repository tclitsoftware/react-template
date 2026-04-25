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

/**
 * Props for the Icon component.
 */
export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "color">,
  React.AriaAttributes {
  /**
   * The name of the SVG icon to render (matches filename in assets/icons).
   */
  name: IconName;

  /**
   * Size of the icon in pixels (both width and height).
   * @default 24
   */
  size?: number;

  /**
   * Color for the icon stroke. 
   * If provided, overrides the CSS `currentColor`.
   */
  strokeColor?: string;

  /**
   * Optional CSS class.
   */
  className?: string;
}

/**
 * Dynamic SVG icon component that loads files from `src/assets/icons`.
 * Automatically supports custom sizing and stroke coloring.
 * 
 * @example
 * <Icon name="search" size={16} strokeColor="#ff0000" />
 */
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
