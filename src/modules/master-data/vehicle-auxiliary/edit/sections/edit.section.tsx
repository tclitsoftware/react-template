import { FormEventHandler } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";

import Button from "components/button";
import Input from "components/input";
import Typography from "components/typography";

import { useAppTranslation } from "locale/useAppTranslation";

export type VehicleAuxiliaryEditForm = {
  category_id: string;
  auxiliary_name: string;
};

type EditVehicleAuxiliarySectionProps = {
  control: Control<VehicleAuxiliaryEditForm>;
  errors: FieldErrors<VehicleAuxiliaryEditForm>;
  loading: boolean;
  isUpdating: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
};

const EditVehicleAuxiliarySection = ({
  control,
  errors,
  loading,
  isUpdating,
  onSubmit,
  onCancel,
}: EditVehicleAuxiliarySectionProps) => {
  const { t } = useAppTranslation("vehicleAuxiliary");

  if (loading) {
    return (
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Typography variant="body">
          {t("loadingDetail")}
        </Typography>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("categoryId")}
              disabled
              error={errors.category_id}
            />
          )}
        />

        <Controller
          name="auxiliary_name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("auxiliaryName")}
              placeholder={t("inputAuxiliaryName")}
              required
              error={errors.auxiliary_name}
            />
          )}
        />

        <div className="md:col-span-2 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            color="secondary"
            onClick={onCancel}
          >
            {t("cancel")}
          </Button>

          <Button
            type="submit"
            color="primary"
            disabled={isUpdating}
          >
            {isUpdating ? t("updating") : t("update")}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditVehicleAuxiliarySection;