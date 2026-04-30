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
  /** 
   * Field error object from react-hook-form. 
   * If present, the component will show a red border and display the error message.
   */
  error?: FieldError;

  /** 
   * Optional helper text displayed below the component. 
   * Usually used for instructions or descriptions.
   */
  helperText?: string;

  /** 
   * Label displayed above the selector. 
   * Clicking the label will focus the selection trigger.
   */
  label?: string;

  /** 
   * List of options to show in the dropdown. 
   * Each option must have a `label` and a `value`.
   */
  options: SelectOption[];

  /** 
   * Currently selected value(s) (controlled). 
   * Pass a string for single select or an array of strings for multiple select.
   */
  value?: string | string[];

  /** 
   * Initial selected value(s) for uncontrolled usage. 
   */
  defaultValue?: string | string[];

  /** 
   * If `true`, multiple options can be selected simultaneously. 
   * Selected items will be displayed as chips.
   * @default false 
   */
  multiple?: boolean;

  /** 
   * If `true`, an input is shown inside the dropdown to filter the options.
   * @default false 
   */
  searchable?: boolean;

  /** 
   * Callback triggered when the selection changes. 
   * Receives the new value (string or string array depending on `multiple`).
   */
  onValueChange?: (value: string | string[]) => void;

  /** 
   * Callback for async search. 
   * If provided, the internal filtering is bypassed and results from this callback are displayed.
   */
  onSearch?: (term: string) => Promise<SelectOption[]>;

  /** 
   * If `true`, shows a loading indicator inside the dropdown. 
   * Usually used when fetching options asynchronously.
   */
  loading?: boolean;

  /** 
   * Text to show when no options match the search criteria or when the list is empty. 
   * @default "No Options" 
   */
  noOptionsText?: string;

  /** 
   * Custom CSS class for the selection trigger button. 
   * Use this to override borders, background, etc.
   */
  overrideClassName?: string;

  /** 
   * If `true`, reserves vertical space for helper/error text even when none is present.
   * Prevents layout shifts when errors appear.
   * @default true 
   */
  reserveHelperSpace?: boolean;

  /** 
   * Placeholder text displayed when nothing is selected. 
   */
  placeholder?: string;

  /** 
   * Callback to create a new option if no match is found.
   * If provided, a "Create Option" button will appear in the footer.
   * Receives the current search term.
   */
  onCreateOption?: (
    term: string,
  ) => Promise<SelectOption | null | undefined> | SelectOption | null | undefined;

  /** 
   * Label for the create option action. 
   * Can be a static string or a function receiving the current term.
   */
  createOptionLabel?: string | ((term: string) => string);

  /** 
   * Optional element to render the menu into using a portal.
   * Use `document.body` to prevent clipping by table containers or fixed/absolute parents.
   * Positioning is handled automatically using fixed positioning relative to the trigger.
   */
  menuPortalTarget?: HTMLElement | null;
};

/**
 * Internal props for the Select Footer component.
 */
export type SelectFooterProps = {
  /** If `true`, the footer shows the "Add New Option" interface. */
  additionMode: boolean;
  /** Current term being typed in the add-new-option field. */
  additionTerm: string;
  /** Whether the component has a create option callback. */
  canCreateOption: boolean;
  /** Whether a new option is currently being created (loading state). */
  createLoading: boolean;
  /** Whether multiple selection is enabled. */
  multiple?: boolean;
  /** Callback to update the addition term. */
  onAdditionTermChange: (value: string) => void;
  /** Opens the add-new-option interface. */
  onAddModeOpen: () => void;
  /** Closes the add-new-option interface. */
  onAddModeClose: () => void;
  /** Triggers the creation of a new option. */
  onCreateOption: () => void;
  /** Resets the current selection. */
  onReset: () => void;
  /** Saves/Closes the dropdown. */
  onSave: () => void;
};
