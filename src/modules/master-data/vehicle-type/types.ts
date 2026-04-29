import * as yup from "yup";

export const vehicleTypeItemSchema = yup.object({
  id: yup.string(), // optional for create, required for edit
  category_id: yup.string().required("Category required"),
  vehicle_type: yup.string().required("type name is required"),
  temp_type_id: yup.string(),
  is_chassis: yup.boolean().default(false),
  is_container: yup.boolean().default(false),
  is_active: yup.boolean().default(true),
});

export const vehicleTypeBatchSchema = yup.object({
  items: yup.array().of(vehicleTypeItemSchema).min(1).required(),
});

export type BatchFormValue = yup.InferType<typeof vehicleTypeBatchSchema>;
export type VehicleTypeItemValue = yup.InferType<typeof vehicleTypeItemSchema>;
