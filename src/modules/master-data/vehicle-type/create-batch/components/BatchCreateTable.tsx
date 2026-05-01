import { useMemo } from "react";
import { Control, UseFormRegister, Controller } from "react-hook-form";
import { BatchFormValue, VehicleTypeItemValue } from "../../types";
import { Table, Columns } from "components/table/table";
import Input from "components/input";
import Select from "components/select";
import Button from "components/button";
import Icon from "components/icon";
import { useAppTranslation } from "locale/useAppTranslation";
import Switch from "components/switch";

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

  const getIndex = (row: any) => fields.findIndex((f) => f.id === row.id);

  const renderVehicleType = (row: any) => {
    const index = getIndex(row);
    return (
      <Input
        {...register(`items.${index}.vehicle_type` as const)}
        placeholder={t("field-name-placeholder")}
        className="border-none bg-transparent"
        reserveHelperSpace={false}
        // error={errors.items?.[index]?.vehicle_type} <--- This is Phase 2
      />
    );
  };

  const renderCategoryId = (row: any) => {
    const index = getIndex(row);
    return (
      <Controller
        name={`items.${index}.category_id` as const}
        control={control}
        render={({ field }) => (
          <Select
            options={categoryOptions}
            value={field.value}
            onValueChange={field.onChange}
            reserveHelperSpace={false}
            menuPortalTarget={document.body}
          />
        )}
      />
    );
  };

  const renderTempTypeId = (row: any) => {
    const index = getIndex(row);
    return (
      <Controller
        name={`items.${index}.temp_type_id` as const}
        control={control}
        render={({ field }) => (
          <Select
            options={tempTypeOptions}
            value={field.value}
            onValueChange={field.onChange}
            reserveHelperSpace={false}
            menuPortalTarget={document.body}
          />
        )}
      />
    );
  };

  const renderSwitch = (row: any, fieldName: keyof VehicleTypeItemValue) => {
    const index = getIndex(row);
    return (
      <Controller
        name={`items.${index}.${fieldName}` as const}
        control={control}
        render={({ field }) => (
          <div className="flex justify-center">
            <Switch checked={!!field.value} onChange={field.onChange} />
          </div>
        )}
      />
    );
  };

  const renderActions = (row: any) => {
    const index = getIndex(row);
    return (
      <div className="flex items-center justify-center">
        <Button
          variant="outline"
          color="error"
          size="small"
          onClick={() => remove(index)}
          disabled={fields.length === 1}
        >
          <Icon name="trash" size={14} />
        </Button>
      </div>
    );
  };

  const columns = useMemo<Columns<any>[]>(
    () => [
      {
        fieldId: "index",
        label: "#",
        align: "center",
        width: "60px",
        render: (row) => <span className="text-sm font-medium">{getIndex(row) + 1}</span>,
      },
      {
        fieldId: "vehicle_type",
        label: t("field-name"),
        render: renderVehicleType,
      },
      {
        fieldId: "category_id",
        label: t("field-category"),
        minWidth: "200px",
        render: renderCategoryId,
      },
      {
        fieldId: "temp_type_id",
        label: t("field-temp-type"),
        minWidth: "200px",
        render: renderTempTypeId,
      },
      {
        fieldId: "is_chassis",
        label: t("field-is-chassis"),
        align: "center",
        render: (row) => renderSwitch(row, "is_chassis"),
      },
      {
        fieldId: "is_container",
        label: t("field-is-container"),
        align: "center",
        render: (row) => renderSwitch(row, "is_container"),
      },
      {
        fieldId: "is_active",
        label: t("field-is-active"),
        align: "center",
        render: (row) => renderSwitch(row, "is_active"),
      },
      {
        fieldId: "id" as any,
        label: "",
        width: "60px",
        align: "center",
        render: renderActions,
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
