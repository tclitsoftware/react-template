import { useLocation, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useMegaVehicleTypeServiceV1UpdateVehicleTypeMutation,
  useMegaVehicleTypeServiceV1ActivateVehicleTypesMutation,
  useMegaVehicleTypeServiceV1DeactivateVehicleTypesMutation,
} from "_services/modules/vehicleTypeApi";
import { vehicleTypeBatchSchema as schema, BatchFormValue } from "../types";

export const useVehicleTypeBatchEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // grab the data from the list page state
  const initialItems = (location.state?.items ?? []).map((item: any) => ({
    id: item.id,
    vehicle_type: item.vehicle_type,
    category_id: item.category_id,
    temp_type_id: item.temp_type_id,
    is_chassis: item.is_chassis,
    is_container: item.is_container,
    is_active: item.status === "active",
  }));

  const form = useForm<BatchFormValue>({
    resolver: yupResolver(schema),
    defaultValues: { items: initialItems },
  });

  const { fields, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [updateName] = useMegaVehicleTypeServiceV1UpdateVehicleTypeMutation();
  const [activate] = useMegaVehicleTypeServiceV1ActivateVehicleTypesMutation();
  const [deactivate] = useMegaVehicleTypeServiceV1DeactivateVehicleTypesMutation();

  const onSave = form.handleSubmit(async (values) => {
    const tasks = values.items.map(async (item) => {
      // fire name update
      const namePromise = updateName({
        id: item.id!,
        megaVehicleTypeServiceV1UpdateVehicleTypeBody: { vehicle_type: item.vehicle_type },
      }).unwrap();

      // fire status update
      const statusPromise = item.is_active
        ? activate({
            megaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq: { ids: [item.id!] },
          }).unwrap()
        : deactivate({
            megaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq: { ids: [item.id!] },
          }).unwrap();

      return Promise.all([namePromise, statusPromise]);
    });

    try {
      await Promise.allSettled(tasks);
      navigate(-1);
    } catch (err) {
      console.error("Batch update failed", err);
    }
  });

  return {
    form,
    fields,
    onSave,
    remove,
    isSaving: form.formState.isSubmitting,
  };
};
