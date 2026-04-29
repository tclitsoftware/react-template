import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";
import { useAppTranslation } from "locale/useAppTranslation";

import {
  useKresnaMasterDataServiceV1GetVehicleAuxiliaryDetailQuery,
  useKresnaMasterDataServiceV1UpdateVehicleAuxiliaryMutation,
} from "_services/modules/masterDataVehicleAuxiliaryApi";

import { VehicleAuxiliaryEditForm } from "./sections/edit.section";

const useVehicleAuxiliaryEdit = (id: string) => {
  const { t } = useAppTranslation("vehicleAuxiliary");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = useMemo(
    () =>
      yup.object({
        category_id: yup
          .string()
          .required(t("validationCategoryRequired")),

        auxiliary_name: yup
          .string()
          .required(t("validationAuxiliaryNameRequired")),
      }),
    [t],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleAuxiliaryEditForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      category_id: "",
      auxiliary_name: "",
    },
  });

  const {
    data: detail,
    isFetching,
    isLoading,
  } = useKresnaMasterDataServiceV1GetVehicleAuxiliaryDetailQuery(
    { id },
    {
      skip: !id,
    },
  );

  const [updateVehicleAuxiliary, { isLoading: isUpdating }] =
    useKresnaMasterDataServiceV1UpdateVehicleAuxiliaryMutation();

  useEffect(() => {
    dispatch(
      setGlobalComponent({
        title: t("editTitle"),
        hasBackButton: true,
      }),
    );
  }, [dispatch, t]);

  useEffect(() => {
    if (!detail) return;

    reset({
      category_id: detail.category_id ?? "",
      auxiliary_name: detail.auxiliary_name ?? "",
    });
  }, [detail, reset]);

  const onSubmit = async (values: VehicleAuxiliaryEditForm) => {
    try {
      await updateVehicleAuxiliary({
        id,
        kresnaMasterDataServiceV1UpdateVehicleAuxiliaryBody: {
          category_id: values.category_id,
          auxiliary_name: values.auxiliary_name,
        },
      }).unwrap();

      toast(t("updateSuccess"));

      navigate("/master-data/vehicle-auxiliary", {
        state: {
          shouldRefetch: true,
        },
      });
    } catch (error) {
      console.log(error);
      toast(t("updateFailed"));
    }
  };

  const handleCancel = () => {
    navigate("/master-data/vehicle-auxiliary");
  };

  return {
    control,
    errors,
    isFetching: isFetching || isLoading,
    isUpdating,
    handleSubmit,
    onSubmit,
    handleCancel,
  };
};

export default useVehicleAuxiliaryEdit;