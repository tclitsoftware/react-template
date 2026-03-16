import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "store";
import { ProfileI, saveProfileInfo } from "store/example";

const useProfileForm = () => {
  const dispatch = useAppDispatch();

  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().email().required(),
    }).required();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<ProfileI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const submit = async (data: ProfileI) => {
    dispatch(saveProfileInfo(data));
    reset();
  };

  const saveProfileHandler = handleSubmit(submit)

  return {
    saveProfileHandler,
    register,
    errors,
  };
};

export default useProfileForm;
