import Icon from "components/icon";
import Input from "components/input";
import Typography from "components/typography";
import React, { ForwardedRef, forwardRef } from "react";

import { SEARCH_PLACEHOLDER } from "./constants";
import { OptionRow, SelectedChip, SelectFooter, SelectLabel } from "./select-parts";
import { SelectProps } from "./types";
import { useSelect } from "./useSelect";
import { assignRef } from "./utils";

const SelectInner = (
  props: SelectProps,
  forwardedRef: ForwardedRef<HTMLDivElement>,
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

  const inputId = id ?? label;
  const {
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
  } = useSelect({
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
  });

  const wrapperClasses = "flex w-full flex-col gap-1";
  const buttonClasses = [
    "flex min-h-[38px] w-full items-center justify-between rounded border bg-white px-4 text-sm text-text-primary transition transition-all focus-visible:outline-none focus-visible:ring-offset-1",
    error
      ? "border-error focus-visible:border-error focus-visible:ring-error shadow-[0_0_0_3px] shadow-error-500/15"
      : "border-border focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200",
    disabled ? "border-whiteScale-60 bg-whiteScale-80 text-blackScale-40" : "",
    overrideClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const listClasses = [
    "absolute left-0 right-0 z-20 max-h-72 overflow-auto rounded-md border border-border bg-white shadow-lg",
    dropUp ? "bottom-full mb-2" : "top-full mt-2",
    open ? "block" : "hidden",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={(node) => {
        assignRef(forwardedRef, node);
        assignRef(wrapperRef, node);
      }}
      className={wrapperClasses}
      {...rest}
    >
      <SelectLabel label={label} inputId={inputId} required={required} />

      <div className="relative">
        <button
          type="button"
          className={buttonClasses}
          onClick={toggleOpen}
          disabled={disabled}
        >
          {multiple ? (
            <div className="flex flex-wrap gap-2 py-2">
              {selectedOptions.length ? (
                selectedOptions.map((option) => (
                  <SelectedChip
                    key={`chip-${option.value}`}
                    option={option}
                    onRemove={() => handleRemove(option.value)}
                  />
                ))
              ) : (
                <span className="text-sm font-normal text-text-primary">
                  {displayLabel}
                </span>
              )}
            </div>
          ) : (
            <span className="truncate text-sm font-normal text-text-primary">
              {displayLabel}
            </span>
          )}

          {multiple && selectedValue.length > 0 ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleRemoveAll();
              }}
            >
              <Icon name="close-circle" size={15} />
            </button>
          ) : (
            <Icon
              name="arrow-down-2"
              size={18}
              className={disabled ? "text-blackScale-40" : "text-tertiary"}
            />
          )}
        </button>

        <div className={listClasses}>
          <div className="relative flex flex-col gap-1">
            {searchable ? (
              <Input
                type="text"
                value={searchTerm}
                disabled={disabled}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder={SEARCH_PLACEHOLDER}
                reserveHelperSpace={false}
                leftIcon={<Icon name="search" size={14} />}
                parentClassName="sticky top-0 z-10 p-1"
              />
            ) : null}

            {loadingText ? (
              <div className="px-4 py-2">
                <Typography className="text-xs" tone="muted">
                  {loadingText}
                </Typography>
              </div>
            ) : null}

            {!loadingText && filteredOptions.length === 0 ? (
              <div className="px-4 py-3">
                <Typography className="text-xs" tone="muted">
                  {noResultsText}
                </Typography>
                {canCreateOption && searchTerm.trim() ? (
                  <button
                    type="button"
                    onClick={() => {
                      setAdditionTerm(searchTerm.trim());
                      setAdditionMode(true);
                    }}
                    className="mt-2 flex flex-row gap-1.5 text-info-600"
                  >
                    <Icon name="add-circle" size={13} />
                    <Typography variant="bodyMedium" className="text-info-600">
                      {createLabel}
                    </Typography>
                  </button>
                ) : null}
              </div>
            ) : null}

            {filteredOptions.map((option) => (
              <OptionRow
                key={option.value}
                option={option}
                multiple={multiple}
                active={selectedValue.includes(option.value)}
                onSelect={() => handleSelect(option)}
              />
            ))}

            <SelectFooter
              additionMode={additionMode}
              additionTerm={additionTerm}
              canCreateOption={canCreateOption}
              createLoading={createLoading}
              multiple={multiple}
              onAdditionTermChange={setAdditionTerm}
              onAddModeOpen={() => {
                setAdditionTerm(searchTerm.trim());
                setAdditionMode(true);
              }}
              onAddModeClose={() => {
                setAdditionMode(false);
                setAdditionTerm("");
                openDropdown();
              }}
              onCreateOption={handleCreate}
              onReset={handleRemoveAll}
              onSave={closeDropdown}
            />
          </div>
        </div>
      </div>

      {reserveHelperSpace || helperMessage ? (
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
