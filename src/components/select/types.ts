import React from "react";
import { FieldError } from "react-hook-form";

/**
 * Represents a single selectable item in the dropdown.
 */
export interface SelectOption {
  /** Display text for the option. */
  label: string;
  /** Internal value used in logic. */
  value: string;
  /** If `true`, the option cannot be selected. @default false */
  disabled?: boolean;
  /** Optional secondary text below the label. */
  subtitle?: string;
}

/**
 * Props for the Select component.
 * Extends standard HTML attributes for the wrapper div.
 */
export type SelectProps = Omit<
  React.InputHTMLAttributes<HTMLDivElement>,
  "size" | "color"
> & {
  /** Field error object from react-hook-form. */
  error?: FieldError;

  /** Optional helper text displayed below the component. */
  helperText?: string;

  /** Label displayed above the selector. */
  label?: string;

  /** List of options to show in the dropdown. */
  options: SelectOption[];

  /** Currently selected value(s) (controlled). */
  value?: string | string[];

  /** Initial selected value(s). */
  defaultValue?: string | string[];

  /** If `true`, multiple options can be selected simultaneously. @default false */
  multiple?: boolean;

  /** If `true`, an input is shown to filter the options. @default false */
  searchable?: boolean;

  /** Callback triggered when selection changes. */
  onValueChange?: (value: string | string[]) => void;

  /** 
   * Callback for async search. 
   * If provided, `options` will be replaced by the results of this callback while searching.
   */
  onSearch?: (term: string) => Promise<SelectOption[]>;

  /** If `true`, shows a loading indicator inside the dropdown. */
  loading?: boolean;

  /** Text to show when no options match the search criteria. @default "No Options" */
  noOptionsText?: string;

  /** Custom CSS class for the selection trigger button. */
  overrideClassName?: string;

  /** 
   * If `true`, reserves vertical space for helper/error text.
   * @default true 
   */
  reserveHelperSpace?: boolean;

  /** Placeholder text when nothing is selected. */
  placeholder?: string;

  /** 
   * Callback to create a new option if no match is found.
   * If provided, a "Create Option" button will appear.
   */
  onCreateOption?: (
    term: string,
  ) => Promise<SelectOption | null | undefined> | SelectOption | null | undefined;

  /** Label for the create option action. */
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
