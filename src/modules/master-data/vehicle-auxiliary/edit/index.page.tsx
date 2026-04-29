import { useParams } from "react-router-dom";

import Typography from "components/typography";

import { useAppTranslation } from "locale/useAppTranslation";
import useVehicleAuxiliaryEdit from "./useVehicleAuxiliaryEdit";
import EditVehicleAuxiliarySection from "./sections/edit.section";

export const vehicleAuxiliaryEditPageRouteName =
  "/master-data/vehicle-auxiliary/edit/:id";

const VehicleAuxiliaryEditPage = () => {
  const { t } = useAppTranslation("vehicleAuxiliary");
  const { id = "" } = useParams();

  const {
    control,
    errors,
    isFetching,
    isUpdating,
    handleSubmit,
    onSubmit,
    handleCancel,
  } = useVehicleAuxiliaryEdit(id);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Typography variant="heading3">
          {t("editTitle")}
        </Typography>

        <Typography variant="bodySmall" tone="muted">
          {t("editDescription")}
        </Typography>
      </section>

      <EditVehicleAuxiliarySection
        control={control}
        errors={errors}
        loading={isFetching}
        isUpdating={isUpdating}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default VehicleAuxiliaryEditPage;