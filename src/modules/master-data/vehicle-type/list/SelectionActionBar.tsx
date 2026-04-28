import { isAction } from "@reduxjs/toolkit";
import Button from "components/button";
import Icon from "components/icon";
import Typography from "components/typography";

interface SelectionActionBarProps {
  selectedCount: number;
  onActivate: () => void;
  onDeactivate: () => void;
  onAdd: () => void;
  isProcessing: boolean;
}

// the react cheatseet (https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)
// said that React.FC is discouraged now, so i'm trying this new style
const SelectionActionBar = ({
  selectedCount,
  onActivate,
  onDeactivate,
  isProcessing,
  onAdd,
}: SelectionActionBarProps) => {
  const isSelectionMode = selectedCount > 0;

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm min-h-[100px] flex items-center">
      <div className="flex w-full items-center justify-between">
        {/* Left Side: Dynamic Info */}
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 ${
              isSelectionMode
                ? "bg-primary-100 text-primary-600"
                : "bg-greyScale-90 text-greyScale-500"
            }`}
          >
            <Icon name={isSelectionMode ? "check" : "settings"} size={20} />
          </div>
          <div className="flex flex-col">
            <Typography
              variant="bodyExtraSmall"
              tone="muted"
              className="uppercase tracking-[0.24em]"
            >
              {isSelectionMode ? "Selection Mode" : "Management"}
            </Typography>
            <Typography variant="bodySmall" className="font-semibold text-text-primary">
              {isSelectionMode
                ? `${selectedCount} items selected`
                : "Manage your vehicle type catalog"}
            </Typography>
          </div>
        </div>
        {/* Right Side: Dynamic Buttons */}
        <div className="flex items-center gap-3">
          {isSelectionMode ? (
            <>
              <Button
                variant="outline"
                color="primary"
                size="medium"
                onClick={onActivate}
                disabled={isProcessing}
                iconLeft={<Icon name="check" size={16} />}
              >
                Activate
              </Button>
              <Button
                variant="outline"
                color="error"
                size="medium"
                onClick={onDeactivate}
                disabled={isProcessing}
                iconLeft={<Icon name="close" size={16} />}
              >
                Deactivate
              </Button>
            </>
          ) : (
            <Button
              variant="fill"
              color="primary"
              size="medium"
              onClick={onAdd}
              iconLeft={<Icon name="plus" size={16} />}
            >
              Add New Vehicle Type
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SelectionActionBar;
