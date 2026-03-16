import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
} from "react";

export type ButtonVariant = "fill" | "outline";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type ButtonSize = "small" | "medium" | "large" | "xl" | "2xl" | "3xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isFullSize?: boolean;
  children?: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  small: "text-xs px-3 py-[7px]",
  medium: "text-sm px-3.5 py-2",
  large: "text-sm px-4 py-3",
  xl: "text-base px-5 py-[13px] font-bold",
  "2xl": "text-lg px-6 py-[17.5px] font-bold",
  "3xl": "text-xl px-8 py-5 font-bold",
};

const fillClasses: Record<ButtonColor, string[]> = {
  primary: [
    "bg-primary-500",
    "border-primary-500",
    "text-white",
    "hover:bg-primary-700",
    "hover:border-primary-700",
    "focus-visible:bg-primary-400",
    "focus-visible:border-primary-400",
    "focus-visible:text-white",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-primary-400",
  ],
  secondary: [
    "bg-secondary-500",
    "border-secondary-500",
    "text-white",
    "hover:bg-secondary-700",
    "hover:border-secondary-700",
    "focus-visible:bg-secondary-400",
    "focus-visible:border-secondary-400",
    "focus-visible:text-white",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-secondary-400",
  ],
  tertiary: [
    "bg-tertiary-500",
    "border-tertiary-500",
    "text-white",
    "hover:bg-tertiary-700",
    "hover:border-tertiary-700",
    "focus-visible:bg-tertiary-400",
    "focus-visible:border-tertiary-400",
    "focus-visible:text-white",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-tertiary-400",
  ],
  success: [
    "bg-success-500",
    "border-success-500",
    "text-white",
    "hover:bg-success-700",
    "hover:border-success-700",
    "focus-visible:bg-success-400",
    "focus-visible:border-success-400",
    "focus-visible:text-white",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-success-400",
  ],
  warning: [
    "bg-warning-500",
    "border-warning-500",
    "text-white",
    "hover:bg-warning-700",
    "hover:border-warning-700",
    "focus-visible:bg-warning-400",
    "focus-visible:border-warning-400",
    "focus-visible:text-white",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-warning-400",
  ],
  error: [
    "bg-error-500",
    "border-error-500",
    "text-white",
    "hover:bg-error-700",
    "hover:border-error-700",
    "focus-visible:bg-error-400",
    "focus-visible:border-error-400",
    "focus-visible:text-white",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-error-400",
  ],
  info: [
    "bg-info-500",
    "border-info-500",
    "text-white",
    "hover:bg-info-700",
    "hover:border-info-700",
    "focus-visible:bg-info-400",
    "focus-visible:border-info-400",
    "focus-visible:text-white",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-info-400",
  ],
};

const outlineClasses: Record<ButtonColor, string[]> = {
  primary: [
    "bg-whiteScale-100",
    "border-primary-500",
    "text-primary-500",
    "hover:bg-whiteScale-70",
    "focus-visible:bg-whiteScale-80",
    "focus-visible:border-primary-500",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-primary-400",
  ],
  secondary: [
    "bg-whiteScale-100",
    "border-secondary-500",
    "text-secondary-500",
    "hover:bg-whiteScale-70",
    "focus-visible:bg-whiteScale-80",
    "focus-visible:border-secondary-500",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-secondary-400",
  ],
  tertiary: [
    "bg-whiteScale-100",
    "border-tertiary-500",
    "text-tertiary-500",
    "hover:bg-whiteScale-70",
    "focus-visible:bg-whiteScale-80",
    "focus-visible:border-tertiary-500",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-tertiary-400",
  ],
  success: [
    "bg-whiteScale-100",
    "border-success-500",
    "text-success-500",
    "hover:bg-whiteScale-70",
    "focus-visible:bg-whiteScale-80",
    "focus-visible:border-success-500",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-success-400",
  ],
  warning: [
    "bg-whiteScale-100",
    "border-warning-500",
    "text-warning-500",
    "hover:bg-whiteScale-70",
    "focus-visible:bg-whiteScale-80",
    "focus-visible:border-warning-500",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-warning-400",
  ],
  error: [
    "bg-whiteScale-100",
    "border-error-500",
    "text-error-500",
    "hover:bg-whiteScale-70",
    "focus-visible:bg-whiteScale-80",
    "focus-visible:border-error-500",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-error-400",
  ],
  info: [
    "bg-whiteScale-100",
    "border-info-500",
    "text-info-500",
    "hover:bg-whiteScale-70",
    "focus-visible:bg-whiteScale-80",
    "focus-visible:border-info-500",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-info-400",
  ],
};

const getFillClasses = (color: ButtonColor, disabled?: boolean): string => {
  if (disabled) {
    return "bg-whiteScale-80 border-whiteScale-80 text-blackScale-20 pointer-events-none";
  }

  return fillClasses[color].join(" ");
};

const getOutlineClasses = (color: ButtonColor, disabled?: boolean): string => {
  if (disabled) {
    return "bg-whiteScale-80 border-whiteScale-60 text-whiteScale-60 pointer-events-none";
  }

  return outlineClasses[color].join(" ");
};

const variantClasses = (
  variant: ButtonVariant,
  color: ButtonColor,
  disabled?: boolean,
) => {
  return variant === "outline"
    ? getOutlineClasses(color, disabled)
    : getFillClasses(color, disabled);
};

const baseClasses =
  "items-center justify-center rounded-[8px] border font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "fill",
      color = "primary",
      size = "medium",
      iconLeft,
      iconRight,
      className,
      children,
      disabled,
      isFullSize = false,
      ...rest
    },
    ref,
  ) => {
    const variantClass = variantClasses(variant, color, disabled);
    const sizeClass = sizeClasses[size];
    const widthClass = isFullSize ? "inline-flex w-full" : "inline-flex";

    return (
      <button
        ref={ref}
        className={`${widthClass} ${baseClasses} ${sizeClass} ${variantClass} ${className ?? ""}`}
        disabled={disabled}
        {...rest}
      >
        <span className="flex items-center gap-[5px]">
          {iconLeft && <span className="flex">{iconLeft}</span>}
          {children}
          {iconRight && <span className="flex">{iconRight}</span>}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
