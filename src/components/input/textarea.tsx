import Typography from "components/typography";
import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import { FieldError } from "react-hook-form";

type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size" | "color"
> & {
  error?: FieldError;
  helperText?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  overrideClassName?: string;
};

const TextareaInner = (
  props: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) => {
  const {
    leftIcon,
    rightIcon,
    label,
    helperText,
    error,
    className,
    id,
    disabled,
    rows = 3,
    overrideClassName,
    ...rest
  } = props;

  const inputId = id ?? label;

  const containerClasses = [
    "flex items-center gap-3 rounded border bg-white px-3 py-2 transition",
    error ? "border-error focus-within:border-error" : "border-border focus-within:border-primary-500",
    error
      ? "focus-within:ring-error focus-within:ring-offset-1 shadow-[0_0_0_3px] shadow-error-500/15"
      : "focus-within:ring-primary-200 focus-within:ring-offset-1 focus-within:ring-2",
    disabled ? "bg-whiteScale-80 border-whiteScale-60" : "",
    overrideClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const textareaClasses = [
    "flex-1 resize-none bg-transparent text-sm placeholder:text-tertiary focus:outline-none",
    disabled ? "text-blackScale-40" : "text-text-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const helperTone = error ? "error" : "muted";
  const helperMessage = error?.message ?? helperText;

  return (
    <div className="w-full flex flex-col gap-1">
      {label &&
        <label
          className="flex items-center gap-1 text-sm text-text-primary"
          htmlFor={inputId}
        >
          {label}
          {rest.required && <span className="text-error">*</span>}
        </label>
      }
      <div className={containerClasses}>
        {leftIcon && (
          <span
            className={`text-tertiary ${disabled ? "text-blackScale-40" : ""}`}
          >
            {leftIcon}
          </span>
        )}
        <textarea
          id={inputId}
          data-testid={inputId}
          disabled={disabled}
          ref={ref}
          rows={rows}
          className={textareaClasses}
          {...rest}
        />
        {rightIcon && (
          <span
            className={`text-tertiary ${disabled ? "text-blackScale-40" : ""}`}
          >
            {rightIcon}
          </span>
        )}
      </div>
      <Typography className="text-xs" tone={helperTone}>
        {helperMessage ?? "\u00A0"}
      </Typography>
    </div>
  );
};

const Textarea = forwardRef(TextareaInner) as (
  props: TextareaProps & { ref?: ForwardedRef<HTMLTextAreaElement> },
) => ReturnType<typeof TextareaInner>;

export default Textarea;
