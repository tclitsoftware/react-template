import React, { Ref } from "react";

import { DEFAULT_CREATE_LABEL } from "./constants";
import { SelectOption, SelectProps } from "./types";

export const normalizeValues = (
  input?: string | string[],
  multiple?: boolean,
): string[] => {
  if (multiple) {
    if (Array.isArray(input)) return input;
    if (input === undefined || input === null || input === "") return [];
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

export const mergeOptions = (...optionGroups: SelectOption[][]) => {
  const merged = new Map<string, SelectOption>();

  optionGroups.forEach((group) => {
    group.forEach((option) => {
      merged.set(option.value, option);
    });
  });

  return Array.from(merged.values());
};

export const resolveCreateLabel = (
  createOptionLabel: SelectProps["createOptionLabel"],
  term: string,
) => {
  if (!term.trim()) {
    return DEFAULT_CREATE_LABEL;
  }

  if (typeof createOptionLabel === "function") {
    return createOptionLabel(term.trim());
  }

  return createOptionLabel ?? `Add "${term.trim()}"`;
};

export const assignRef = <T,>(ref: Ref<T> | undefined, value: T) => {
  if (!ref) return;

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  (ref as React.MutableRefObject<T>).current = value;
};
