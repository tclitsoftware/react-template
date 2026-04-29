import { forwardRef } from "react";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, disabled, ...props }, ref) => {
    return (
      <label
        className={`inline-flex items-center gap-3 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className ?? ""}`}
      >
        <div className="relative inline-flex items-center">
          {/* me when switches are just a checkbox in a trenchcoat */}
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          {/* switches needs track no? */}
          <div className="h-6 w-11 rounded-full border-2 bg-greyScale-60 transition-all duration-200 peer-checked:bg-primary-400 peer-focus:ring-primary-100" />

          {/* the thumb */}
          <div className="absolute left-1 h-4 w-4 transform rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5" />
        </div>
        {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
      </label>
    );
  },
);

Switch.displayName = "Switch";
export default Switch;
