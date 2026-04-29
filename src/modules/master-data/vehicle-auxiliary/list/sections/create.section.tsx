import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import Button from "components/button";
import Input from "components/input";
import Select from "components/select";
import Typography from "components/typography";

import { useAppTranslation } from "locale/useAppTranslation";
import { useKresnaWrapperServiceV1CreateVehicleAuxiliaryMutation } from "_services/modules/wrapperApi";

type SelectOption = {
  value: string;
  label: string;
};

type CreateVehicleAuxiliarySectionProps = {
  onSuccess?: () => void;
  categoryOptions: SelectOption[];
};

type CreateVehicleAuxiliaryForm = {
  category_id: string;
  auxiliary_name: string;
  status: string;
};

const CreateVehicleAuxiliarySection = ({
  onSuccess,
  categoryOptions,
}: CreateVehicleAuxiliarySectionProps) => {
  const { t } = useAppTranslation("vehicleAuxiliary");

  const [createVehicleAuxiliary, { isLoading }] =
    useKresnaWrapperServiceV1CreateVehicleAuxiliaryMutation();

  const statusOptions = useMemo(
    () => [
      { value: "active", label: t("active") },
      { value: "inactive", label: t("inactive") },
    ],
    [t],
  );

  const vehicleAuxiliarySchema = useMemo(
    () =>
      yup.object({
        category_id: yup
          .string()
          .required(t("validationCategoryRequired")),

        auxiliary_name: yup
          .string()
          .required(t("validationAuxiliaryNameRequired")),

        status: yup
          .string()
          .required(t("validationStatusRequired")),
      }),
    [t],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVehicleAuxiliaryForm>({
    resolver: yupResolver(vehicleAuxiliarySchema),
    defaultValues: {
      category_id: "",
      auxiliary_name: "",
      status: "active",
    },
  });

  const onSubmit = async (values: CreateVehicleAuxiliaryForm) => {
    try {
      await createVehicleAuxiliary({
        kresnaWrapperKresnaWrapperCreateVehicleAuxiliaryRequest: {
          vehicle_auxiliaries: [
            {
              category_id: values.category_id,
              auxiliary_name: values.auxiliary_name,
              status: values.status,
            },
          ],
        },
      }).unwrap();

      toast(t("createPublishSuccess"));

      reset({
        category_id: "",
        auxiliary_name: "",
        status: "active",
      });

      onSuccess?.();
    } catch (error) {
      console.log(error);
      toast(t("createFailed"));
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-1">
        <Typography variant="heading3">
          {t("createTitle")}
        </Typography>

        <Typography variant="bodySmall" tone="muted">
          {t("createDescription")}
        </Typography>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 md:grid-cols-3"
      >
        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <Select
              label={t("categoryId")}
              options={categoryOptions}
              value={field.value}
              error={errors.category_id}
              onValueChange={(next) =>
                field.onChange(
                  Array.isArray(next) ? next[0] ?? "" : next ?? "",
                )
              }
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
              error={errors.auxiliary_name}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              label={t("status")}
              options={statusOptions}
              value={field.value}
              error={errors.status}
              onValueChange={(next) =>
                field.onChange(
                  Array.isArray(next) ? next[0] ?? "" : next ?? "",
                )
              }
            />
          )}
        />

        <div className="flex justify-end md:col-span-3">
          <Button
            type="submit"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? t("saving") : t("create")}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateVehicleAuxiliarySection;