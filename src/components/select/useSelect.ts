import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TypographyTone } from "components/typography/Typography";

import {
  DEFAULT_NO_OPTIONS_TEXT,
  DEFAULT_PLACEHOLDER,
} from "./constants";
import { SelectOption, SelectProps } from "./types";
import { mergeOptions, normalizeValues, resolveCreateLabel } from "./utils";

type UseSelectParams = Pick<
  SelectProps,
  | "createOptionLabel"
  | "defaultValue"
  | "helperText"
  | "loading"
  | "multiple"
  | "noOptionsText"
  | "onCreateOption"
  | "onSearch"
  | "onValueChange"
  | "options"
  | "placeholder"
  | "searchable"
  | "value"
> & {
  error?: SelectProps["error"];
  disabled?: boolean;
};

export const useSelect = ({
  createOptionLabel,
  defaultValue,
  disabled,
  error,
  helperText,
  loading: externalLoading,
  multiple,
  noOptionsText,
  onCreateOption,
  onSearch,
  onValueChange,
  options,
  placeholder,
  searchable,
  value,
}: UseSelectParams) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRequestRef = useRef(0);

  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string[]>(
    normalizeValues(value ?? defaultValue, multiple),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SelectOption[]>(options);
  const [additionMode, setAdditionMode] = useState(false);
  const [additionTerm, setAdditionTerm] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const helperTone: TypographyTone = error ? "error" : "muted";
  const helperMessage = error?.message ?? helperText;
  const noResultsText = noOptionsText ?? DEFAULT_NO_OPTIONS_TEXT;
  const canCreateOption = Boolean(onCreateOption);
  const loadingText = externalLoading || searchLoading ? "Searching..." : null;

  useEffect(() => {
    setSearchResults(options);
  }, [options]);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(normalizeValues(value, multiple));
    }
  }, [multiple, value]);

  useEffect(() => {
    if (!open) {
      setAdditionMode(false);
      setAdditionTerm("");
    }
  }, [open]);

  const resolvedOptions = useMemo(
    () => mergeOptions(options, searchResults),
    [options, searchResults],
  );

  const optionsByValue = useMemo(
    () =>
      new Map(
        resolvedOptions.map((option) => [option.value, option] as const),
      ),
    [resolvedOptions],
  );

  const filteredOptions = useMemo(() => {
    if (onSearch || !searchable || !searchTerm) {
      return searchResults;
    }

    const normalizedTerm = searchTerm.toLowerCase();

    return resolvedOptions.filter((option) => {
      const labelMatch = option.label.toLowerCase().includes(normalizedTerm);
      const subtitleMatch = option.subtitle?.toLowerCase().includes(normalizedTerm);
      return labelMatch || Boolean(subtitleMatch);
    });
  }, [onSearch, resolvedOptions, searchResults, searchable, searchTerm]);

  const selectedOptions = useMemo(
    () =>
      selectedValue
        .map((currentValue) => optionsByValue.get(currentValue))
        .filter((option): option is SelectOption => Boolean(option)),
    [optionsByValue, selectedValue],
  );

  const displayLabel = useMemo(() => {
    if (multiple) {
      return selectedOptions.length
        ? `${selectedOptions.length} selected`
        : placeholder ?? DEFAULT_PLACEHOLDER;
    }

    return selectedOptions[0]?.label ?? placeholder ?? DEFAULT_PLACEHOLDER;
  }, [multiple, placeholder, selectedOptions]);

  const createLabel = useMemo(
    () => resolveCreateLabel(createOptionLabel, searchTerm),
    [createOptionLabel, searchTerm],
  );

  const commitValue = useCallback(
    (nextValue: string[]) => {
      setSelectedValue(nextValue);
      onValueChange?.(multiple ? nextValue : nextValue[0]);
    },
    [multiple, onValueChange],
  );

  const closeDropdown = useCallback(() => {
    setOpen(false);
  }, []);

  const openDropdown = useCallback(() => {
    if (!disabled) {
      setOpen(true);
    }
  }, [disabled]);

  const toggleOpen = useCallback(() => {
    if (!disabled) {
      setOpen((currentOpen) => !currentOpen);
    }
  }, [disabled]);

  const handleSelect = useCallback(
    (option: SelectOption) => {
      if (option.disabled) {
        return;
      }

      const nextValue = multiple
        ? selectedValue.includes(option.value)
          ? selectedValue.filter((currentValue) => currentValue !== option.value)
          : [...selectedValue, option.value]
        : [option.value];

      commitValue(nextValue);

      if (!multiple) {
        closeDropdown();
      }
    },
    [closeDropdown, commitValue, multiple, selectedValue],
  );

  const handleRemove = useCallback(
    (valueToRemove: string) => {
      if (!multiple) {
        return;
      }

      commitValue(
        selectedValue.filter((currentValue) => currentValue !== valueToRemove),
      );
    },
    [commitValue, multiple, selectedValue],
  );

  const handleRemoveAll = useCallback(() => {
    if (!multiple) {
      return;
    }

    commitValue([]);
  }, [commitValue, multiple]);

  const handleSearch = useCallback(
    async (term: string) => {
      setSearchTerm(term);

      if (!searchable || !onSearch) {
        return;
      }

      const requestId = searchRequestRef.current + 1;
      searchRequestRef.current = requestId;
      setSearchLoading(true);

      try {
        const result = await onSearch(term);

        if (searchRequestRef.current === requestId) {
          setSearchResults(result);
        }
      } finally {
        if (searchRequestRef.current === requestId) {
          setSearchLoading(false);
        }
      }
    },
    [onSearch, searchable],
  );

  const handleCreate = useCallback(async () => {
    const normalizedTerm = additionTerm.trim();

    if (!normalizedTerm || !onCreateOption) {
      return;
    }

    setCreateLoading(true);

    try {
      const nextOption = await onCreateOption(normalizedTerm);

      if (!nextOption) {
        return;
      }

      setSearchResults((currentOptions) =>
        currentOptions.some((option) => option.value === nextOption.value)
          ? currentOptions
          : [nextOption, ...currentOptions],
      );

      handleSelect(nextOption);
      setAdditionMode(false);
      setAdditionTerm("");
      closeDropdown();
    } finally {
      setCreateLoading(false);
    }
  }, [additionTerm, closeDropdown, handleSelect, onCreateOption]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [closeDropdown]);

  useEffect(() => {
    if (!open || !wrapperRef.current) {
      setDropUp(false);
      return;
    }

    const rect = wrapperRef.current.getBoundingClientRect();
    const dropdownHeight = 220;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setDropUp(spaceBelow < dropdownHeight && spaceAbove > dropdownHeight);
  }, [open]);

  return {
    additionMode,
    additionTerm,
    canCreateOption,
    closeDropdown,
    createLabel,
    createLoading,
    displayLabel,
    dropUp,
    filteredOptions,
    handleCreate,
    handleRemove,
    handleRemoveAll,
    handleSearch,
    handleSelect,
    helperMessage,
    helperTone,
    loadingText,
    noResultsText,
    open,
    openDropdown,
    searchTerm,
    selectedOptions,
    selectedValue,
    setAdditionMode,
    setAdditionTerm,
    toggleOpen,
    wrapperRef,
  };
};
