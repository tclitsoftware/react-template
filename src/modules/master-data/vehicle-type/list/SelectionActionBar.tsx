import { isAction } from "@reduxjs/toolkit";
import Button from "components/button";
import Icon from "components/icon";
import Typography from "components/typography";
import { useAppTranslation } from "locale/useAppTranslation";

interface SelectionActionBarProps {
  selectedCount: number;
  onActivate: () => void;
  onDeactivate: () => void;
  onAdd: () => void;
  isProcessing: boolean;
  onBatchEdit: () => void;
}

// the react cheatseet (https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)
// said that React.FC is discouraged now, so i'm trying this new style
const SelectionActionBar = ({
  selectedCount,
  onActivate,
  onDeactivate,
  isProcessing,
  onAdd,
  onBatchEdit,
}: SelectionActionBarProps) => {
  const { t } = useAppTranslation("vehicleType");
  const isSelectionMode = selectedCount > 0;

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm min-h-[100px] flex items-center">
      <div className="flex w-full items-center justify-between">
        {/** left side here */}
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 ${
              isSelectionMode
                ? "bg-primary-100 text-primary-600"
                : "bg-greyScale-90 text-greyScale-500"
            }`}
          >
            <Icon name={isSelectionMode ? "check" : "truck"} size={20} />
          </div>
          <div className="flex flex-col">
            <Typography variant="heading3" className="">
              {isSelectionMode ? t("selection-mode") : t("list-title")}
            </Typography>
            <Typography variant="body" tone="muted" className="font-semibold  text-text-primary">
              {" "}
              {isSelectionMode
                ? `${t("items-selected", { count: selectedCount })}`
                : t("list-description")}
            </Typography>
          </div>
        </div>
        {/**right side here? */}
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
                {t("action-activate")}
              </Button>
              <Button
                variant="outline"
                color="error"
                size="medium"
                onClick={onDeactivate}
                disabled={isProcessing}
                iconLeft={<Icon name="close" size={16} />}
              >
                {t("action-deactivate")}
              </Button>
              <Button
                variant="outline"
                color="primary"
                disabled={selectedCount === 0}
                onClick={onBatchEdit} // we'll pass this in
                iconLeft={<Icon name="edit-2" size={18} />}
              >
                {t("action-batch-edit")}
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
              {t("action-add-another")}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SelectionActionBar;
