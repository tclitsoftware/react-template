import { useVehicleTypeBatchCreate } from "./useVehicleTypeBatchCreate";
import VehicleTypeFormCard from "../components/VehicleTypeFormCard";
import Button from "components/button";
import Icon from "components/icon";
import { ExcelImporter } from "./ExcelImporter";
import { useAppTranslation } from "locale/useAppTranslation";
import { BatchCreateTable } from "./BatchCreateTable";
import Typography from "components/typography";

export const vehicleTypeBatchCreatePageRouteName = "/master-data/vehicle-type/batch-add";

const VehicleTypeBatchCreatePage = () => {
  const { t } = useAppTranslation("vehicleType");
  const {
    form,
    fields,
    append,
    remove,
    onSave,
    onHandleImport,
    isSaving,
    categoryOptions,
    tempTypeOptions,
  } = useVehicleTypeBatchCreate();

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div
              className={
                "flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600"
              }
            >
              <Icon name={"add-square"} size={26} />
            </div>
            <div className="flex flex-col">
              <Typography variant="heading3">{t("batch-add-title")}</Typography>
              <Typography variant="body" tone="muted" className="font-semibold text-text-primary">
                {t("batch-add-description")}
              </Typography>
            </div>
          </div>
          <div className="flex gap-4 align-middle">
            <ExcelImporter onImport={onHandleImport} />
            <Button
              onClick={onSave}
              disabled={isSaving}
              iconLeft={<Icon name="save-add" size={16} />}
            >
              {t("button-save-all")}
            </Button>
          </div>
        </div>
      </section>
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          <BatchCreateTable
            fields={fields}
            register={form.register}
            control={form.control}
            remove={remove}
            categoryOptions={categoryOptions}
            tempTypeOptions={tempTypeOptions}
          />
        </div>
      </section>
    </div>
  );
};

export default VehicleTypeBatchCreatePage;
