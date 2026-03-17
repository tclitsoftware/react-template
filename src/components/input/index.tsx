import Typography from "components/typography";
import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FieldError } from "react-hook-form";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> & {
  error?: FieldError;
  helperText?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  overrideClassName?: string;
  parentClassName?: string;
  reserveHelperSpace?: boolean;
  enableNumberFormat?: boolean;
  enableCurrencyFormat?: boolean;
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

const getNumberSeparators = (locale?: string) => {
  const formattedParts = new Intl.NumberFormat(locale ?? "id-ID").formatToParts(
    12345.6,
  );

  return {
    groupSeparator:
      formattedParts.find((part) => part.type === "group")?.value ?? ".",
    decimalSeparator:
      formattedParts.find((part) => part.type === "decimal")?.value ?? ",",
  };
};

const sanitizeNumericInput = (value: string, locale?: string) => {
  if (!value) return "";

  const { groupSeparator, decimalSeparator } = getNumberSeparators(locale);
  const normalizedValue = value
    .split(groupSeparator)
    .join("")
    .replace(decimalSeparator, ".");
  let hasDecimal = false;
  let sanitizedValue = "";

  for (let index = 0; index < normalizedValue.length; index += 1) {
    const character = normalizedValue[index];

    if (character >= "0" && character <= "9") {
      sanitizedValue += character;
      continue;
    }

    if (character === "-" && sanitizedValue.length === 0) {
      sanitizedValue += character;
      continue;
    }

    if (character === "." && !hasDecimal) {
      hasDecimal = true;
      sanitizedValue += character;
    }
  }

  return sanitizedValue;
};

const formatNumericDisplay = (
  value: string,
  {
    enableCurrencyFormat,
    currency,
    locale,
    minimumFractionDigits,
    maximumFractionDigits,
  }: Pick<
    InputProps,
    | "enableCurrencyFormat"
    | "currency"
    | "locale"
    | "minimumFractionDigits"
    | "maximumFractionDigits"
  >,
) => {
  if (!value || value === "-" || value === "." || value === "-.") {
    return value;
  }

  if (value.endsWith(".")) {
    const integerValue = value.slice(0, -1);
    if (!integerValue || integerValue === "-") {
      return value;
    }

    const { decimalSeparator } = getNumberSeparators(locale);
    const integerFormatter = new Intl.NumberFormat(locale ?? "id-ID", {
      style: enableCurrencyFormat ? "currency" : "decimal",
      currency: enableCurrencyFormat ? currency ?? "IDR" : undefined,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return `${integerFormatter.format(Number(integerValue))}${decimalSeparator}`;
  }

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return value;
  }

  const hasFraction = value.includes(".");
  const fractionLength = hasFraction ? value.split(".")[1]?.length ?? 0 : 0;

  const formatter = new Intl.NumberFormat(locale ?? "id-ID", {
    style: enableCurrencyFormat ? "currency" : "decimal",
    currency: enableCurrencyFormat ? currency ?? "IDR" : undefined,
    minimumFractionDigits:
      minimumFractionDigits ?? (hasFraction ? fractionLength : 0),
    maximumFractionDigits:
      maximumFractionDigits ?? (hasFraction ? fractionLength : 0),
  });

  return formatter.format(numericValue);
};

const getRawCharacterCount = (value: string, locale?: string) =>
  sanitizeNumericInput(value, locale).length;

const getDisplayCursorPosition = (
  value: string,
  rawCharacterCount: number,
  locale?: string,
) => {
  if (rawCharacterCount <= 0) {
    return 0;
  }

  const { decimalSeparator } = getNumberSeparators(locale);
  let matchedRawCharacters = 0;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    const isNumericCharacter = character >= "0" && character <= "9";
    const isLeadingMinus = character === "-" && matchedRawCharacters === 0;
    const isDecimalCharacter = character === decimalSeparator;

    if (!isNumericCharacter && !isLeadingMinus && !isDecimalCharacter) {
      continue;
    }

    matchedRawCharacters += 1;

    if (matchedRawCharacters >= rawCharacterCount) {
      return index + 1;
    }
  }

  return value.length;
};

const InputInner = (
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
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
    overrideClassName,
    parentClassName,
    reserveHelperSpace = true,
    type,
    value,
    defaultValue,
    onChange,
    enableNumberFormat,
    enableCurrencyFormat,
    currency,
    locale,
    minimumFractionDigits,
    maximumFractionDigits,
    ...rest
  } = props;

  const inputId = id ?? label;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pendingSelectionRef = useRef<number | null>(null);
  const isFormattedNumberInput =
    type === "number" && (enableNumberFormat || enableCurrencyFormat);
  const initialRawValue =
    value !== undefined
      ? String(value)
      : defaultValue !== undefined
        ? String(defaultValue)
        : "";
  const [formattedValue, setFormattedValue] = useState(
    isFormattedNumberInput
      ? formatNumericDisplay(sanitizeNumericInput(initialRawValue, locale), {
          enableCurrencyFormat,
          currency,
          locale,
          minimumFractionDigits,
          maximumFractionDigits,
        })
      : initialRawValue,
  );

  useEffect(() => {
    if (!isFormattedNumberInput || value === undefined) {
      return;
    }

    setFormattedValue(
      formatNumericDisplay(sanitizeNumericInput(String(value), locale), {
        enableCurrencyFormat,
        currency,
        locale,
        minimumFractionDigits,
        maximumFractionDigits,
      }),
    );
  }, [
    currency,
    enableCurrencyFormat,
    isFormattedNumberInput,
    locale,
    maximumFractionDigits,
    minimumFractionDigits,
    value,
  ]);

  useLayoutEffect(() => {
    if (pendingSelectionRef.current === null || !inputRef.current) {
      return;
    }

    const nextSelection = pendingSelectionRef.current;
    pendingSelectionRef.current = null;
    inputRef.current.setSelectionRange(nextSelection, nextSelection);
  }, [formattedValue]);

  const containerClasses = [
    "flex items-center gap-3 rounded border bg-white px-3 py-2 transition",
    error ? "border-error shadow-[0_0_0_3px] shadow-error-500/15" : "border-border focus-within:border-primary-600",
    error
      ? "focus-within:ring-error"
      : "focus-within:ring-primary-200 focus-within:ring-offset-1 focus-within:ring-2",
    disabled ? "bg-whiteScale-80 border-whiteScale-60" : "",
    overrideClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    "flex-1 bg-transparent text-sm placeholder:text-tertiary focus:outline-none placeholder:font-normal",
    disabled ? "text-greyScale-60" : "text-text-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const helperTone = error ? "error" : "muted";
  const helperMessage = error?.message ?? helperText;

  const assignInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;

    if (typeof ref === "function") {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isFormattedNumberInput) {
      onChange?.(event);
      return;
    }

    const selectionStart = event.target.selectionStart ?? event.target.value.length;
    const rawCharacterCount = getRawCharacterCount(
      event.target.value.slice(0, selectionStart),
      locale,
    );
    const rawValue = sanitizeNumericInput(event.target.value, locale);
    const nextDisplayValue = formatNumericDisplay(rawValue, {
      enableCurrencyFormat,
      currency,
      locale,
      minimumFractionDigits,
      maximumFractionDigits,
    });
    pendingSelectionRef.current = getDisplayCursorPosition(
      nextDisplayValue,
      rawCharacterCount,
      locale,
    );

    if (value === undefined) {
      setFormattedValue(nextDisplayValue);
    }

    const patchedEvent = {
      ...event,
      target: {
        ...event.target,
        value: rawValue,
      },
      currentTarget: {
        ...event.currentTarget,
        value: rawValue,
      },
    } as ChangeEvent<HTMLInputElement>;

    onChange?.(patchedEvent);
  };

  return (
    <div className={`w-full flex flex-col gap-[7px] ${parentClassName}`}>
      {label &&
        <label className="flex items-center gap-1 text-sm text-text-primary" htmlFor={inputId}>
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
        <input
          id={inputId}
          disabled={disabled}
          data-testid={inputId}
          ref={assignInputRef}
          className={inputClasses}
          {...rest}
          inputMode={isFormattedNumberInput ? "decimal" : rest.inputMode}
          type={isFormattedNumberInput ? "text" : type}
          value={isFormattedNumberInput ? formattedValue : value}
          defaultValue={isFormattedNumberInput ? undefined : defaultValue}
          onChange={handleChange}
        />
        {rightIcon && (
          <span
            className={`text-tertiary ${disabled ? "text-blackScale-40" : ""}`}
          >
            {rightIcon}
          </span>
        )}
      </div>
      {(reserveHelperSpace || helperMessage) ? (
        <Typography className="text-xs" tone={helperTone}>
          {helperMessage ?? "\u00A0"}
        </Typography>
      ) : null}
    </div>
  );
};

const Input = forwardRef(InputInner) as (
  props: InputProps & { ref?: ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof InputInner>;

export default Input;
export { default as Textarea } from "./textarea"
export { default as PhoneInput } from "./phone-input";
