import React, { useCallback, useEffect, useRef, useState } from "react";
import Icon from "components/icon";

export interface ActionMenuItem {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
  testId?: string;
}

interface ActionMenuProps {
  items: ActionMenuItem[];
  testId?: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ items, testId }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-greyScale-90 transition-colors cursor-pointer"
        data-testid={testId}
      >
        <Icon name="more" size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[160px] rounded-xl border border-border bg-white py-1 shadow-lg">
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-greyScale-90 transition-colors cursor-pointer ${
                item.variant === "danger"
                  ? "text-error-500"
                  : "text-text-primary"
              }`}
              data-testid={item.testId}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
