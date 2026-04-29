import { UseFormReturn, Controller } from "react-hook-form";
import Input from "components/input";
import Select from "components/select";
import Checkbox from "components/checkbox";
import Button from "components/button";
import Icon from "components/icon";
import Typography from "components/typography";
import { BatchFormValue } from "../types";
import { useMegaVehicleTypeServiceV1ListVehicleTypeCategoriesQuery } from "_services/modules/vehicleTypeApi";
import { useAppTranslation } from "locale/useAppTranslation";

interface VehicleTypeFormCardProps {
  index: number;
  form: UseFormReturn<BatchFormValue>;
  onRemove: () => void;
  showRemove: boolean;
  isEdit?: boolean;
}

const VehicleTypeFormCard = ({
  index,
  form,
  onRemove,
  showRemove,
  isEdit,
}: VehicleTypeFormCardProps) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const { t } = useAppTranslation("vehicleType");

  const { data: categoryData } = useMegaVehicleTypeServiceV1ListVehicleTypeCategoriesQuery();
  const categoryOptions = (categoryData?.vehicle_type_categories ?? []).map((cat) => ({
    label: cat.category_name ?? "",
    value: cat.id ?? "",
  }));

  const fieldPath = `items.${index}` as const;

  // I knowwww this is as bas as it gets but well...
  const tempTypeOptions = [
    { label: t("temp-type-frozen"), value: "d1ca3738-2db7-403a-994a-dc83feac7580" },
    { label: t("temp-type-dry"), value: "efe0c577-5abf-4010-8289-52bb3205d00d" },
  ];

  return (
    <section className="relative rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/** Card Header */}
      <div className="mb-6 flex items-center justify-between rounded-full  pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center bg-primary-100 justify-center rounded-full text-sm font-bold text-greyScale-500">
            {index + 1}
          </div>
          <Typography variant="body" className="font-semibold">
            {t("form-card-title")}
          </Typography>
        </div>

        {showRemove && (
          <Button
            variant="outline"
            color="error"
            size="small"
            onClick={onRemove}
            iconLeft={<Icon name="trash" size={14} />}
          >
            {t("form-remove-entry")}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Input
          label={t("field-name")}
          placeholder={t("field-name-placeholder")}
          {...register(`${fieldPath}.vehicle_type`)}
          error={errors.items?.[index]?.vehicle_type}
          required
        />
        {!isEdit && (
          <>
            <Controller
              name={`${fieldPath}.category_id`}
              control={control}
              render={({ field }) => (
                <Select
                  label={t("field-category")}
                  placeholder={t("field-category-placeholder")}
                  options={categoryOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.items?.[index]?.category_id}
                  required
                />
              )}
            />
            <Controller
              name={`${fieldPath}.temp_type_id`}
              control={control}
              render={({ field }) => (
                <Select
                  label={t("field-temp-type")}
                  placeholder={t("field-temp-type-placeholder")}
                  options={tempTypeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.items?.[index]?.temp_type_id}
                />
              )}
            />
          </>
        )}
        <div className="grid grid-cols-3 pb-10">
          <Controller
            name={`${fieldPath}.is_active`}
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-1">
                <Checkbox checked={field.value} onChange={field.onChange} disabled={isSubmitting} />
                <Typography variant="body">{t("field-is-active")}</Typography>
              </div>
            )}
          />
          {!isEdit && (
            <>
              <Controller
                name={`${fieldPath}.is_chassis`}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-1">
                    <Checkbox
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                    <Typography variant="body">{t("field-is-chassis")}</Typography>
                  </div>
                )}
              />
              <Controller
                name={`${fieldPath}.is_container`}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-1">
                    <Checkbox
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                    <Typography variant="body">{t("field-is-container")}</Typography>
                  </div>
                )}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default VehicleTypeFormCard;
