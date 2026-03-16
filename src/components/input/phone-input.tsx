import Typography from "components/typography";
import Select, { SelectOption } from "components/select";
import React, {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FieldError } from "react-hook-form";

const defaultCountryOptions = [
  { code: "+62", label: "Indonesia", flag: "🇮🇩" },
  { code: "+1", label: "United States", flag: "🇺🇸" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", label: "India", flag: "🇮🇳" },
];

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> & {
  error?: FieldError;
  helperText?: string;
  label?: string;
  countryOptions?: typeof defaultCountryOptions;
  countryCode?: string;
  onCountryChange?: (code: string) => void;
  rightIcon?: ReactNode;
  overrideClassName?: string;
};

const PhoneInputInner = (
  props: PhoneInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const {
    label,
    helperText,
    error,
    className,
    id,
    disabled,
    countryOptions = defaultCountryOptions,
    countryCode,
    onCountryChange,
    rightIcon,
    overrideClassName,
    ...rest
  } = props;
  const inputId = id ?? label;
  const [selectedCode, setSelectedCode] = useState(countryCode ?? countryOptions[0].code);

  useEffect(() => {
    if (countryCode && countryCode !== selectedCode) {
      setSelectedCode(countryCode);
    }
  }, [countryCode, selectedCode]);

  const containerClasses = [
    "flex items-center gap-2.5 rounded border bg-white transition focus-within:ring-offset-1",
    error ? "border-error shadow-[0_0_0_3px] shadow-error-500/15" : "border-border focus-within:border-primary-500 focus-within:ring-primary-200 focus-within:ring-2",
    disabled ? "bg-whiteScale-80 border-whiteScale-60" : "",
    overrideClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    "flex-1 bg-transparent text-sm placeholder:text-tertiary focus:outline-none min-h-[38px]",
    disabled ? "text-blackScale-40" : "text-text-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const helperTone = error ? "error" : "muted";
  const helperMessage = error?.message ?? helperText;

  const countrySelectOptions = useMemo<SelectOption[]>(
    () =>
      countryOptions.map((option) => ({
        label: `${option.flag} ${option.code}`,
        value: option.code,
        // subtitle: option.label,
      })),
    [countryOptions],
  );

  const handleCountrySelect = (value: string | string[]) => {
    const nextValue = Array.isArray(value) ? value[0] : value;
    if (!nextValue) return;
    setSelectedCode(nextValue);
    onCountryChange?.(nextValue);
  };

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
        <div className="min-w-[120px]">
          <Select
            label="Country"
            helperText=""
            options={countrySelectOptions}
            value={selectedCode}
            onValueChange={handleCountrySelect}
            disabled={disabled}
            required={rest.required}
            className="bg-whiteScale-90 rounded-l flex flex-col w-full gap-0 [&>label]:sr-only [&>div>button]:rounded-none [&>div>button]:border-0 [&>div>button]:bg-transparent [&>div>button]:px-3 [&>div>button]:py-0 [&>div>button]:min-h-[38px] [&>div>button]:text-left [&>div>button]:text-greyScale-60 [&>div>button]:shadow-none [&>p]:hidden"
          />
        </div>
        <input
          id={inputId}
          data-testid={inputId}
          disabled={disabled}
          ref={ref}
          className={inputClasses}
          type="number"
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

const PhoneInput = forwardRef(PhoneInputInner) as (
  props: PhoneInputProps & { ref?: ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof PhoneInputInner>;

export default PhoneInput;
