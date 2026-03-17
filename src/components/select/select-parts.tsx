import Button from "components/button";
import Checkbox from "components/checkbox";
import Icon from "components/icon";
import Input from "components/input";
import Typography from "components/typography";

import { DEFAULT_CREATE_LABEL } from "./constants";
import { SelectFooterProps, SelectOption } from "./types";

export const SelectLabel = ({
  label,
  inputId,
  required,
}: {
  label?: string;
  inputId?: string;
  required?: boolean;
}) => {
  if (!label) {
    return null;
  }

  return (
    <label
      className="flex items-center gap-1 text-sm text-text-primary"
      htmlFor={inputId}
    >
      {label}
      {required ? <span className="text-error">*</span> : null}
    </label>
  );
};

export const SelectedChip = ({
  option,
  onRemove,
}: {
  option: SelectOption;
  onRemove: () => void;
}) => (
  <span className="flex flex-row items-center gap-2 rounded-full bg-tertiary-100 px-3 py-2 text-xs">
    <div className="flex-col">
      <span className="text-primary-700">{option.label}</span>
      {option.subtitle ? (
        <Typography variant="code" className="text-greyScale-60" as="div">
          {option.subtitle}
        </Typography>
      ) : null}
    </div>
    <span
      role="button"
      tabIndex={0}
      onClick={(event) => {
        event.stopPropagation();
        onRemove();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          onRemove();
        }
      }}
      className="text-primary-500 focus:outline-none"
    >
      <Icon name="close-circle" size={12} />
    </span>
  </span>
);

export const OptionRow = ({
  option,
  multiple,
  active,
  onSelect,
}: {
  option: SelectOption;
  multiple?: boolean;
  active: boolean;
  onSelect: () => void;
}) => (
  <button
    type="button"
    disabled={option.disabled}
    onClick={onSelect}
    className={[
      "flex w-full flex-row items-center gap-1.5 rounded-md px-3 py-2 text-left transition hover:bg-primary-50",
      active ? "bg-primary-50" : "",
      option.disabled ? "cursor-not-allowed text-blackScale-40" : "",
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {multiple ? <Checkbox checked={active} readOnly /> : null}
    <div>
      <Typography variant="bodyMedium" className="text-greyScale-60">
        {option.label}
      </Typography>
      {option.subtitle ? (
        <Typography variant="code" className="text-greyScale-60 text-xs">
          {option.subtitle}
        </Typography>
      ) : null}
    </div>
  </button>
);

export const SelectFooter = ({
  additionMode,
  additionTerm,
  canCreateOption,
  createLoading,
  multiple,
  onAdditionTermChange,
  onAddModeOpen,
  onAddModeClose,
  onCreateOption,
  onReset,
  onSave,
}: SelectFooterProps) => {
  if (!canCreateOption && !multiple) {
    return null;
  }

  if (additionMode) {
    return (
      <div className="sticky bottom-0 flex w-full flex-col gap-2 border-t border-border bg-white px-3 py-2">
        <Input
          type="text"
          value={additionTerm}
          onChange={(event) => onAdditionTermChange(event.target.value)}
          placeholder={DEFAULT_CREATE_LABEL}
          reserveHelperSpace={false}
        />
        <div className="flex flex-row gap-1.5 self-end">
          <Button
            type="button"
            variant="outline"
            color="tertiary"
            size="small"
            onClick={onAddModeClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            color="secondary"
            size="small"
            onClick={onCreateOption}
            disabled={createLoading}
          >
            Add Data
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 flex w-full flex-row items-center justify-between border-t border-border bg-white px-3 py-2">
      <div>
        {canCreateOption ? (
          <button
            type="button"
            className="flex flex-row gap-1.5 text-info-600"
            onClick={onAddModeOpen}
          >
            <Icon name="add-circle" size={13} />
            <Typography variant="bodyMedium" className="text-info-600">
              {DEFAULT_CREATE_LABEL}
            </Typography>
          </button>
        ) : null}
      </div>
      <div className="flex flex-row gap-1.5">
        <Button
          type="button"
          variant="outline"
          color="tertiary"
          size="small"
          onClick={onReset}
        >
          Reset
        </Button>
        <Button type="button" color="secondary" size="small" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
