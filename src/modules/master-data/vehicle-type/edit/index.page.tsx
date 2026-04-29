import { useNavigate } from "react-router-dom";
import Button from "components/button";
import Icon from "components/icon";
import Typography from "components/typography";
import { useVehicleTypeBatchEdit } from "./useVehicleTypeBatchEdit";
import VehicleTypeFormCard from "../components/VehicleTypeFormCard";
import { useAppTranslation } from "locale/useAppTranslation";

export const vehicleTypeEditPageRouteName = "/master-data/vehicle-type/edit";

const VehicleTypeBatchEdit = () => {
  const { t } = useAppTranslation("vehicleType");
  const navigate = useNavigate();
  const { form, fields, remove, onSave, isSaving } = useVehicleTypeBatchEdit();

  return (
    <div className="flex flex-col gap-6">
      {/** Header here */}
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Icon name="edit-2" size={24} />
              </div>
              <div className="flex flex-col justify-center">
                <Typography variant="heading3" className="leading-none">
                  {t("edit-title")}
                </Typography>
                <Typography variant="body" tone="muted">
                  {t("edit-description", { count: fields.length })}
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pb-1">
            <Button
              variant="outline"
              color="tertiary"
              onClick={() => navigate(-1)}
              disabled={isSaving}
            >
              {t("action-cancel")}
            </Button>
            <Button
              variant="fill"
              color="primary"
              onClick={onSave}
              disabled={isSaving}
              iconLeft={
                isSaving ? (
                  <Icon name="loader" size={18} className="animate-spin" />
                ) : (
                  <Icon name="save-2" size={18} />
                )
              }
            >
              {t("action-update-all", { count: fields.length })}
            </Button>
          </div>
        </div>
      </section>

      {/** this is the section for form */}
      <section className="rounded-2xl border border-border bg-white p-8 shadow-sm">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {fields.map((field, index) => (
            <VehicleTypeFormCard
              key={field.id}
              index={index}
              form={form}
              onRemove={() => remove(index)}
              showRemove={fields.length > 1}
              isEdit
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default VehicleTypeBatchEdit;
