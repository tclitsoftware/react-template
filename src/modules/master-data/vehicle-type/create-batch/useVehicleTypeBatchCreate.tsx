import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useMegaWrapperServiceV1AsyncBatchCreateVehicleTypeMutation } from "_services/modules/vehicleTypeWrapper";
import {
  useMegaVehicleTypeServiceV1ListVehicleTypeCategoriesQuery,
  useMegaVehicleTypeServiceV1ListVehicleTypeTempTypesQuery,
} from "_services/modules/vehicleTypeApi";
import { useNavigate } from "react-router-dom";
import { vehicleTypeBatchSchema as schema, BatchFormValue } from "../types";
import { mapExcelToVehicleType, ExcelRow } from "./importMapper";
import { useAppTranslation } from "locale/useAppTranslation";
import * as XLSX from "xlsx";

export const useVehicleTypeBatchCreate = () => {
  const { t } = useAppTranslation("vehicleType");
  const navigate = useNavigate();

  // these three is what we're be calling
  const [createAsync, { isLoading: isSaving }] =
    useMegaWrapperServiceV1AsyncBatchCreateVehicleTypeMutation();
  const { data: categoryData } = useMegaVehicleTypeServiceV1ListVehicleTypeCategoriesQuery();
  const { data: tempTypeData } = useMegaVehicleTypeServiceV1ListVehicleTypeTempTypesQuery();

  const categoryOptions = useMemo(
    () =>
      (categoryData?.vehicle_type_categories ?? []).map((c) => ({
        label: c.category_name ?? "--",
        value: c.id ?? "",
      })),
    [categoryData],
  );

  const tempTypeOptions = useMemo(
    () =>
      (tempTypeData?.temp_types ?? []).map((t) => ({
        label: t.name ?? "--",
        value: t.id ?? "",
      })),
    [tempTypeData],
  );

  // form values
  const form = useForm<BatchFormValue>({
    resolver: yupResolver(schema),
    defaultValues: {
      items: [
        {
          vehicle_type: "",
          category_id: "",
          is_chassis: false,
          is_container: false,
          is_active: true,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  // excel import logic
  const onHandleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const rawRows = XLSX.utils.sheet_to_json<ExcelRow>(workbook.Sheets[sheetName]);

      const mappedData = mapExcelToVehicleType(
        rawRows,
        (categoryData?.vehicle_type_categories ?? []).map((c) => ({
          id: c.id!,
          name: c.category_name!,
        })),
        (tempTypeData?.temp_types ?? []).map((t) => ({
          id: t.id!,
          name: t.name!,
        })),
      );

      // if the first item is empty, remove it before appending
      if (fields.length === 1 && !form.getValues("items.0.vehicle_type")) {
        remove(0);
      }

      append(mappedData as any);
    };
    reader.readAsArrayBuffer(file);
  };

  const onSave = form.handleSubmit(async (values) => {
    try {
      await createAsync({
        megaWrapperAsyncBatchCreateVehicleTypeReq: {
          items: values.items.map((item) => {
            return {
              vehicle_type: item.vehicle_type,
              category_id: item.category_id,
              temp_type_id: item.temp_type_id,
              is_chassis: item.is_chassis,
              is_container: item.is_container,
              status: item.is_active ? "active" : "inactive",
            };
          }),
        },
      }).unwrap();
      navigate(-1);
    } catch (err) {
      console.error("Batch create failed", err);
    }
  });

  return {
    form,
    fields,
    append,
    remove,
    onSave,
    onHandleImport,
    isSaving,
    categoryOptions,
    tempTypeOptions,
  };
};
