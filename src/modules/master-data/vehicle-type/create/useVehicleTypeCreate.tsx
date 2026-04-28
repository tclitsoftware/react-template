import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMegaVehicleTypeServiceV1CreateVehicleTypesMutation } from "_services/modules/vehicleTypeApi";
import { useNavigate } from "react-router-dom";

const itemSchema = yup.object({
  category_id: yup.string().required("Category required"),
  vehicle_type: yup.string().required("type name is required"),
  temp_type_id: yup.string(),
  is_chassis: yup.boolean().default(false),
  is_container: yup.boolean().default(false),
  is_active: yup.boolean().default(false),
});

const schema = yup.object({
  items: yup.array().of(itemSchema).min(1).required(),
});

export type BatchFormValue = yup.InferType<typeof schema>;

export const useVehicleTypeCreate = () => {
  const navigate = useNavigate();
  const [create, { isLoading }] = useMegaVehicleTypeServiceV1CreateVehicleTypesMutation();

  const form = useForm<BatchFormValue>({
    resolver: yupResolver(schema),
    defaultValues: {
      items: [{ vehicle_type: "", category_id: "", is_chassis: false, is_container: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSave = form.handleSubmit(async (values) => {
    try {
      await create({
        megaVehicleTypeV1MegaCreateVehicleTypesReq: {
          items: values.items.map((item) => ({
            ...item,
            status: item.is_active ? "active" : "inactive",
          })),
        },
      }).unwrap();
      navigate(-1); // Go back on success
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
    isSaving: isLoading,
  };
};
