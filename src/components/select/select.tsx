import Button from "components/button";
import Icon from "components/icon";
import Typography from "components/typography";
import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FieldError } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  subtitle?: string;
}

type SelectProps = Omit<
  React.InputHTMLAttributes<HTMLDivElement>,
  "size" | "color"
> & {
  error?: FieldError;
  helperText?: string;
  label?: string;
  options: SelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  multiple?: boolean;
  searchable?: boolean;
  onValueChange?: (value: string | string[]) => void;
  onSearch?: (term: string) => Promise<SelectOption[]>;
  loading?: boolean;
  noOptionsText?: string;
  overrideClassName?: string;
  reserveHelperSpace?: boolean;
  placeholder?: string;
  onCreateOption?: (term: string) => Promise<SelectOption | null | undefined> | SelectOption | null | undefined;
  createOptionLabel?: string | ((term: string) => string);
};

const normalizeValues = (
  input?: string | string[],
  multiple?: boolean,
): string[] => {
  if (multiple) {
    if (Array.isArray(input)) return input;
    if (input === undefined || input === null) return [];
    return [input];
  }
  if (Array.isArray(input)) {
    return input.length ? [input[0]] : [];
  }
  if (input === undefined || input === null || input === "") {
    return [];
  }
  return [input];
};

const SelectInner = (
  props: SelectProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const {
    label,
    helperText,
    error,
    id,
    disabled,
    options,
    required,
    value,
    defaultValue,
    multiple,
    searchable,
    onValueChange,
    onSearch,
    loading: externalLoading,
    noOptionsText,
    overrideClassName,
    reserveHelperSpace = true,
    placeholder,
    onCreateOption,
    createOptionLabel,
    ...rest
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputId = id ?? label;

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string[]>(
    normalizeValues(value ?? defaultValue, multiple),
  );
  const [dropUp, setDropUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SelectOption[]>(options);

  useEffect(() => {
    setSearchResults(options);
  }, [options]);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(normalizeValues(value, multiple));
    }
  }, [value, multiple]);

  const resolvedOptions = useMemo(() => {
    const mergedOptions = new Map<string, SelectOption>();

    options.forEach((option) => {
      mergedOptions.set(option.value, option);
    });

    searchResults.forEach((option) => {
      mergedOptions.set(option.value, option);
    });

    return Array.from(mergedOptions.values());
  }, [options, searchResults]);

  const filteredOptions = useMemo(() => {
    if (onSearch || !searchable || searchTerm === "") {
      return searchResults;
    }
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, onSearch, searchResults, searchable, searchTerm]);

  const selectedLabels = selectedValue
    .map((val) => resolvedOptions.find((option) => option.value === val)?.label)
    .filter((label): label is string => Boolean(label));

  const displayLabel = multiple
    ? selectedLabels.length
      ? `${selectedLabels.length} selected`
      : placeholder ?? "Select an option"
    : selectedLabels[0] ?? placeholder ?? "Select an option";

  const helperTone = error ? "error" : "muted";
  const helperMessage = error?.message ?? helperText;

  const toggleOpen = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    let nextValue: string[];
    if (multiple) {
      nextValue = selectedValue.includes(option.value)
        ? selectedValue.filter((value) => value !== option.value)
        : [...selectedValue, option.value];
    } else {
      nextValue = [option.value];
    }
    setSelectedValue(nextValue);
    onValueChange?.(multiple ? nextValue : nextValue[0]);
    setOpen(multiple ? true : false);
  };

  const handleRemove = (value: string) => {
    if (!multiple) return;
    const nextValue = selectedValue.filter((item) => item !== value);
    setSelectedValue(nextValue);
    onValueChange?.(nextValue);
  };

  const handleRemoveAll = () => {
    if (!multiple) return;
    setSelectedValue([]);
    onValueChange?.([]);
  }

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (!searchable || !onSearch) return;
    setSearchLoading(true);
    try {
      const result = await onSearch(term);
      setSearchResults(result);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCreateOption = async () => {
    const normalizedTerm = searchTerm.trim();
    if (!normalizedTerm || !onCreateOption) {
      return;
    }

    setCreateLoading(true);
    try {
      const nextOption = await onCreateOption(normalizedTerm);
      if (!nextOption) {
        return;
      }

      setSearchResults((currentOptions) => {
        if (currentOptions.some((option) => option.value === nextOption.value)) {
          return currentOptions;
        }

        return [nextOption, ...currentOptions];
      });
      handleSelect(nextOption);
      setSearchTerm("");
      setOpen(false);
    } finally {
      setCreateLoading(false);
    }
  };

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, []);

  useEffect(() => {
    if (!open || !wrapperRef.current) {
      setDropUp(false);
      return;
    }
    const rect = wrapperRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 220;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    setDropUp(spaceBelow < dropdownHeight && spaceAbove > dropdownHeight);
  }, [open]);

  const wrapperClasses = "flex flex-col gap-1 w-full";

  const buttonClasses = [
    "flex min-h-[38px] items-center justify-between rounded border bg-white px-4 text-sm text-text-primary transition focus-visible:outline-none focus-visible:ring-offset-1 w-full transition-all",
    error
      ? "border-error focus-visible:border-error focus-visible:ring-error shadow-[0_0_0_3px] shadow-error-500/15"
      : "border-border focus-within:border-primary-500 focus-within:ring-primary-200 focus-within:ring-2",
    disabled ? "bg-whiteScale-80 border-whiteScale-60 text-blackScale-40" : "",
    overrideClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const listPositionClass = dropUp ? "bottom-full mb-2" : "top-full mt-2";
  const listClasses = [
    "absolute left-0 right-0 z-20 max-h-60 overflow-auto rounded-md border border-border bg-white shadow-lg px-1.5 py-1",
    dropUp ? "flex flex-col-reverse gap-1" : "flex flex-col gap-1",
    listPositionClass,
    open ? "block" : "hidden",
  ]
    .filter(Boolean)
    .join(" ");

  const optionClasses = [
    "flex w-full flex-row items-center justify-between rounded-md px-4 py-2 text-left transition hover:bg-primary-50",
  ].join(" ");

  const loadingText = externalLoading || searchLoading ? "Searching..." : null;
  const noResultsText = noOptionsText ?? "No options";
  const canCreateOption =
    Boolean(onCreateOption) &&
    searchTerm.trim().length > 0 &&
    filteredOptions.length === 0 &&
    !loadingText;
  const createLabel =
    typeof createOptionLabel === "function"
      ? createOptionLabel(searchTerm.trim())
      : createOptionLabel ?? `Add "${searchTerm.trim()}"`;

  return (
    <div ref={ref ?? wrapperRef} className={wrapperClasses} {...rest}>
      {label &&
        <label
          className="flex items-center gap-1 text-sm text-text-primary"
          htmlFor={inputId}
        >
          {label}
          {required && <span className="text-error">*</span>}
        </label>
      }
      <div className="relative">
        <button
          type="button"
          className={buttonClasses}
          onClick={toggleOpen}
          disabled={disabled}
        >
          {multiple ? (
            <div className="flex flex-wrap gap-2 py-2">
              {selectedValue.length ? (
                selectedValue.map((value) => {
                  const option = resolvedOptions.find((opt) => opt.value === value);
                  if (!option) return null;
                  return (
                    <span
                      key={`chip-${value}`}
                      className="flex flex-row items-center gap-2 rounded-full bg-tertiary-100 px-3 py-2 text-xs"
                    >
                      <div className="flex-col">
                        <span className="text-primary-700">{option.label}</span>
                        {option.subtitle && (
                          <Typography variant="code" className="text-greyScale-60" as="div">
                            {option.subtitle}
                          </Typography>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemove(value);
                        }}
                        className="text-primary-500 focus:outline-none"
                      >
                        <Icon name="close-circle" size={12} />
                      </button>
                    </span>
                  );
                })
              ) : (
                <span className="text-sm text-text-primary font-normal">{displayLabel}</span>
              )}
            </div>
          ) : (
            <span className="truncate text-sm text-text-primary font-normal">{displayLabel}</span>
          )}
          {multiple && selectedValue.length > 0 ?
            <button type="button" onClick={handleRemoveAll}>
              <Icon name="close-circle" size={12} />
            </button>
            :
            <Icon name="arrow-down-2" size={18} className={disabled ? "text-blackScale-40" : "text-tertiary"} />
          }
        </button>
        <div className={listClasses}>
          {searchable && (
            <input
              type="text"
              value={searchTerm}
              disabled={disabled}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search..."
              className="w-full rounded-[12px] border border-border bg-white px-3 py-2 text-sm text-text-primary focus:border-primary-500 focus:outline-none"
            />
          )}
          {loadingText && (
            <div className="px-4 py-2">
              <Typography className="text-xs" tone="muted">
                {loadingText}
              </Typography>
            </div>
          )}
          {filteredOptions.length === 0 && !loadingText && (
            <div className="px-4 py-3">
              <Typography className="text-xs" tone="muted">
                {noResultsText}
              </Typography>
            </div>
          )}
          {canCreateOption ? (
            <div className="px-1.5 pb-1">
              <Button
                type="button"
                variant="outline"
                color="primary"
                isFullSize
                onClick={handleCreateOption}
                disabled={createLoading}
                iconLeft={<Icon name="add" size={18} className="text-primary" />}
              >
                {createLoading ? "Adding..." : createLabel}
              </Button>
            </div>
          ) : null}
          {filteredOptions.map((option) => {
            const isActive = selectedValue.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                disabled={option.disabled}
                onClick={() => handleSelect(option)}
                className={`${optionClasses} ${isActive ? "bg-primary-50" : ""} ${option.disabled ? "cursor-not-allowed text-blackScale-40" : ""}`}
              >
                <div>
                  <Typography variant="bodyMedium" className="text-greyScale-60">
                    {option.label}
                  </Typography>
                  {option.subtitle && (
                    <Typography variant="code" className="text-greyScale-60 text-xs">
                      {option.subtitle}
                    </Typography>
                  )}
                </div>
                {isActive && <Icon name="tick-circle" size={12} className="text-primary-500" />}
              </button>
            );
          })}
        </div>
      </div>
      {(reserveHelperSpace || helperMessage) ? (
        <Typography variant="bodyMedium" tone={helperTone}>
          {helperMessage ?? "\u00A0"}
        </Typography>
      ) : null}
    </div>
  );
};

const Select = forwardRef(SelectInner) as (
  props: SelectProps & { ref?: ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof SelectInner>;

export default Select;
