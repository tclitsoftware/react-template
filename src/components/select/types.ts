import React from "react";
import { FieldError } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  subtitle?: string;
}

export type SelectProps = Omit<
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
  onCreateOption?: (
    term: string,
  ) => Promise<SelectOption | null | undefined> | SelectOption | null | undefined;
  createOptionLabel?: string | ((term: string) => string);
};

export type SelectFooterProps = {
  additionMode: boolean;
  additionTerm: string;
  canCreateOption: boolean;
  createLoading: boolean;
  multiple?: boolean;
  onAdditionTermChange: (value: string) => void;
  onAddModeOpen: () => void;
  onAddModeClose: () => void;
  onCreateOption: () => void;
  onReset: () => void;
  onSave: () => void;
};
