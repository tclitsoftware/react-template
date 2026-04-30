import React, { useMemo } from "react";
import { Control, UseFormRegister, Controller } from "react-hook-form";
import { BatchFormValue } from "../types";
import { Table, Columns } from "components/table/table";
import Input from "components/input";
import Select from "components/select";
import Checkbox from "components/checkbox";
import Button from "components/button";
import Icon from "components/icon";
import { useAppTranslation } from "locale/useAppTranslation";

interface BatchCreateTableProps {
  fields: any[];
  register: UseFormRegister<BatchFormValue>;
  control: Control<BatchFormValue>;
  remove: (index: number) => void;
  categoryOptions: { label: string; value: string }[];
  tempTypeOptions: { label: string; value: string }[];
}

export const BatchCreateTable = ({
  fields,
  register,
  control,
  remove,
  categoryOptions,
  tempTypeOptions,
}: BatchCreateTableProps) => {
  const { t } = useAppTranslation("vehicleType");

  const columns = useMemo<Columns<any>[]>(
    () => [
      { fieldId: "index", label: "#", align: "center", width: "60px" },
      {
        fieldId: "vehicle_type",
        label: t("field-name"),
        render: (row) => {
          const index = fields.findIndex((f) => f.id === row.id);
          return (
            <Input
              {...register(`items.${index}.vehicle_type` as const)}
              placeholder={t("field-name-placeholder")}
              className="border-none bg-transparent"
              reserveHelperSpace={false}
            />
          );
        },
      },
      {
        fieldId: "category_id",
        label: t("field-category"),
        render: (row) => {
          const index = fields.findIndex((f) => f.id === row.id);
          return (
            <Controller
              name={`items.${index}.category_id` as const}
              control={control}
              render={({ field }) => (
                <Select
                  options={categoryOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  overrideClassName="border-none bg-transparent"
                  reserveHelperSpace={false}
                  menuPortalTarget={document.body}
                />
              )}
            />
          );
        },
      },
      {
        fieldId: "temp_type_id",
        label: t("field-temp-type"),
        render: (row) => {
          const index = fields.findIndex((f) => f.id === row.id);
          return (
            <Controller
              name={`items.${index}.temp_type_id` as const}
              control={control}
              render={({ field }) => (
                <Select
                  options={tempTypeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  overrideClassName="border-none bg-transparent"
                  reserveHelperSpace={false}
                  menuPortalTarget={document.body}
                />
              )}
            />
          );
        },
      },
      {
        fieldId: "is_chassis",
        label: t("field-is-chassis"),
        align: "center",
        render: (row) => {
          const index = fields.findIndex((f) => f.id === row.id);
          return <Checkbox {...register(`items.${index}.is_chassis` as const)} />;
        },
      },
      {
        fieldId: "is_container",
        label: t("field-is-container"),
        align: "center",
        render: (row) => {
          const index = fields.findIndex((f) => f.id === row.id);
          return <Checkbox {...register(`items.${index}.is_container` as const)} />;
        },
      },
      {
        fieldId: "is_active",
        label: t("field-is-active"),
        align: "center",
        render: (row) => {
          const index = fields.findIndex((f) => f.id === row.id);
          return <Checkbox {...register(`items.${index}.is_active` as const)} />;
        },
      },
      {
        fieldId: "id" as any,
        label: "",
        width: "50px",
        render: (row) => {
          const index = fields.findIndex((f) => f.id === row.id);
          return (
            <Button
              variant="outline"
              color="error"
              size="small"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <Icon name="trash" size={14} />
            </Button>
          );
        },
      },
    ],
    [fields, register, control, categoryOptions, tempTypeOptions, t, remove],
  );

  return (
    <Table
      data={fields}
      columns={columns}
      rowKey="id"
      enableColumnDrag={false}
      enableColumnResize={false}
    />
  );
};
