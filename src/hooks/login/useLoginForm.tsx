import { LoginReqI } from "_interfaces/auth-api.interfaces";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "store";
import { useLoginMutation } from "_services/modules/auth";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { saveTokenAuth } from "store/auth";
import { ChangeEvent, useState } from "react";

const useLoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }).required();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginReqI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const submit = async (data: LoginReqI) => {
    try {
      const res = await login(data).unwrap();
      dispatch(saveTokenAuth(res));
      navigate("/dashboard");
    } catch (error) {
      errorHandler(error);
    }
  };

  const rememberMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  }

  const loginHandler = handleSubmit(submit)

  return {
    loginHandler,
    register,
    errors,
    isLoading,
    rememberMeHandler,
    rememberMe,
  };
};

export default useLoginForm;
