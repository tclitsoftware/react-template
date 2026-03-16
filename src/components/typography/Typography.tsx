import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react";

export type TypographyVariant =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "body"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall"
  | "bodyExtraSmall"
  | "bodyExtraSmallBold"
  | "code";

export type TypographyWeight =
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type TypographyTone =
  | "black"
  | "primary"
  | "secondary"
  | "muted"
  | "inverse"
  | "info"
  | "warning"
  | "error";

export type TypographyAlign = "left" | "center" | "right" | "justify";

const weightClasses: Record<TypographyWeight, string> = {
  thin: "font-thin",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

const toneClasses: Record<TypographyTone, string> = {
  black: "text-black",
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  muted: "text-text-tertiary",
  inverse: "text-whiteScale-100",
  info: "text-info",
  warning: "text-warning",
  error: "text-error",
};

const alignClasses: Record<TypographyAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const typographyVariants: Record<
  TypographyVariant,
  { as: ElementType; classes: string; defaultWeight: TypographyWeight }
> = {
  heading1: {
    as: "h1",
    classes: "font-heading text-[48px] leading-[58px] tracking-[-0.02em]",
    defaultWeight: "bold",
  },
  heading2: {
    as: "h2",
    classes: "font-heading text-[40px] leading-[48px] tracking-[-0.02em]",
    defaultWeight: "bold",
  },
  heading3: {
    as: "h3",
    classes: "font-heading text-[24px] leading-[29px] tracking-[-0.02em]",
    defaultWeight: "bold",
  },
  heading4: {
    as: "h4",
    classes: "font-heading text-[20px] leading-[24px] tracking-[-0.01em]",
    defaultWeight: "bold",
  },
  heading5: {
    as: "h5",
    classes: "font-heading text-[18px] leading-[21px] tracking-[-0.01em]",
    defaultWeight: "bold",
  },
  heading6: {
    as: "h6",
    classes: "font-heading text-[16px] leading-[19px] tracking-[-0.01em]",
    defaultWeight: "bold",
  },
  body: {
    as: "p",
    classes: "font-sans text-[14px] leading-[16px] tracking-[0em]",
    defaultWeight: "normal",
  },
  bodyLarge: {
    as: "p",
    classes: "font-sans text-[14px] leading-[16px] tracking-[0em]",
    defaultWeight: "normal",
  },
  bodyMedium: {
    as: "p",
    classes: "font-sans text-[12px] leading-[14px] tracking-[0em]",
    defaultWeight: "normal",
  },
  bodySmall: {
    as: "p",
    classes: "font-sans text-[10px] leading-[12px] tracking-[0em]",
    defaultWeight: "normal",
  },
  bodyExtraSmall: {
    as: "p",
    classes: "font-sans text-[8px] leading-[9px] tracking-[0em]",
    defaultWeight: "normal",
  },
  bodyExtraSmallBold: {
    as: "p",
    classes: "font-heading text-[12px] leading-[14px] tracking-[0.02em]",
    defaultWeight: "bold",
  },
  code: {
    as: "code",
    classes: "font-mono text-[14px] leading-[15px] tracking-[0em]",
    defaultWeight: "normal",
  },
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  tone?: TypographyTone;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  as?: ElementType;
  children?: ReactNode;
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = "body",
      tone = "black",
      align = "left",
      weight,
      as,
      className,
      children,
      ...rest
    },
    ref,
  ): JSX.Element => {
    const variantDefinition = typographyVariants[variant] ?? typographyVariants.body;
    const Component = as ?? variantDefinition.as;
    const weightClass = weightClasses[weight ?? variantDefinition.defaultWeight];
    const toneClass = toneClasses[tone];
    const alignClass = alignClasses[align];

    const combinedClassName = [
      variantDefinition.classes,
      weightClass,
      toneClass,
      alignClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component ref={ref} className={combinedClassName} {...rest}>
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";

export default Typography;
