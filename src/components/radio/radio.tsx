import React, { forwardRef, Ref } from "react";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> { }

const RadioInner = (
  { className, disabled, ...rest }: RadioProps,
  ref: Ref<HTMLInputElement>,
) => (
  <label
    className={`relative h-[15px] w-[15px] cursor-pointer ${className ?? ""}`}
  >
    <input
      type="radio"
      ref={ref}
      disabled={disabled}
      className="peer absolute hidden"
      {...rest}
    />
    <div
      className={`
        absolute inset-0 h-[15px] w-[15px] rounded-full border transition
        ${disabled ? "bg-whiteScale-80 peer-checked:border-divider" : "bg-white peer-checked:border-primary-600"}
      `}
    />
    <div className="absolute h-[15px] w-[15px] inset-0 flex justify-center items-center opacity-0 peer-checked:opacity-100">
      <div
        className={`
          h-[9px] w-[9px] rounded-full transition duration-150
          peer-checked:ring-2 peer-checked:ring-primary-500/30
          ${disabled ? "bg-divider" : "bg-primary-600"}
        `}
      />
    </div>
  </label>
);

const Radio = forwardRef<HTMLInputElement, RadioProps>(RadioInner);
Radio.displayName = "Radio";

export default Radio;
