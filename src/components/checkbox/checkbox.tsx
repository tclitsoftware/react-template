import Icon from "components/icon";
import React, {
  forwardRef,
  MutableRefObject,
  Ref,
  useEffect,
  useRef,
} from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  indeterminate?: boolean;
}

const CheckboxInner = (
  {
    className,
    indeterminate,
    disabled,
    ...rest
  }: CheckboxProps,
  ref: Ref<HTMLInputElement>,
) => {
  const innerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  const setRef = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      (ref as MutableRefObject<HTMLInputElement | null>).current = node;
    }
  };

  return (
    <label
      className={`h-[15px] w-[15px] relative inline-flex ${disabled ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-center rounded bg-white p-0 transition focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-200 ${className ?? ""
        }`}
      data-indeterminate={indeterminate ? "true" : undefined}
    >
      <input
        type="checkbox"
        ref={setRef}
        disabled={disabled}
        className={`peer absolute inset-0 h-full w-full ${disabled ? "cursor-not-allowed" : "cursor-pointer"} opacity-0`}
        {...rest}
      />
      <span
        className={`
          h-[15px] w-[15px] absolute inset-0 flex items-center justify-center rounded border transition
          ${disabled ? "border-whiteScale-80 bg-tertiary-200" : "bg-white"}
          peer-checked:border-primary-600 peer-checked:bg-primary-600 peer-disabled:bg-tertiary-200 peer-disabled:border-tertiary-200
          data-[indeterminate=true]:border-primary-600 data-[indeterminate=true]:bg-primary-600
        `}
      />
      <span
        className={`h-[15px] w-[15px] pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 ${indeterminate ? "hidden" : ""}`}
      >
        <Icon name="check" size={13} className={disabled ? "text-divider" : "text-white"} />
      </span>
      {indeterminate && (
        <span className="h-[15px] w-[15px] pointer-events-none absolute inset-0 flex items-center justify-center">
          <Icon name="minus" size={13} className="text-white" />
        </span>
      )}
    </label>
  );
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(CheckboxInner);
Checkbox.displayName = "Checkbox";

export default Checkbox;
