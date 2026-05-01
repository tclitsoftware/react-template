import Button from "components/button";
import Icon from "components/icon";
import Typography from "components/typography";
import { useAppTranslation } from "locale/useAppTranslation";

interface SelectionActionBarProps {
  selectedCount: number;
  onActivate: () => void;
  onDeactivate: () => void;
  onAdd: () => void;
  onBatchAdd: () => void;
  isProcessing: boolean;
  onBatchEdit: () => void;
}

export const SelectionActionBar = ({
  selectedCount,
  onActivate,
  onDeactivate,
  isProcessing,
  onAdd,
  onBatchAdd,
  onBatchEdit,
}: SelectionActionBarProps) => {
  const { t } = useAppTranslation("vehicleType");
  const isSelectionMode = selectedCount > 0;

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm min-h-[100px] flex items-center">
      <div className="flex w-full items-center justify-between">
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
            <Typography variant="heading3">
              {isSelectionMode ? t("selection-mode") : t("list-title")}
            </Typography>
            <Typography variant="body" tone="muted" className="font-semibold text-text-primary">
              {isSelectionMode
                ? t("items-selected", { count: selectedCount })
                : t("list-description")}
            </Typography>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isSelectionMode ? (
            <>
              <Button
                variant="outline"
                color="primary"
                onClick={onActivate}
                disabled={isProcessing}
                iconLeft={<Icon name="check" size={16} />}
              >
                {t("action-activate")}
              </Button>
              <Button
                variant="outline"
                color="error"
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
                onClick={onBatchEdit}
                iconLeft={<Icon name="edit-2" size={18} />}
              >
                {t("action-batch-edit")}
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                color="primary"
                onClick={onBatchAdd}
                iconLeft={<Icon name="files" size={16} />}
              >
                {t("action-batch-add")}
              </Button>
              <Button
                variant="fill"
                color="primary"
                onClick={onAdd}
                iconLeft={<Icon name="plus" size={16} />}
              >
                {t("action-add")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// removed default export
