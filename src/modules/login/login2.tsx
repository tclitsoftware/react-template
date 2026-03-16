import Input from "components/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { errorHandler } from "_services/errorHandler";
import { LoginReqI, LoginResI } from "_interfaces/auth-api.interfaces";
import { useAppDispatch } from "store";
import { saveTokenAuth } from "store/auth";
import { useNavigate } from "react-router-dom";

const LoginState = () => {
  const [payload, setPayload] = useState<LoginReqI>({ email: '', password: '' });
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setPayload(prev => ({ ...prev, email: e.target.value }))
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPayload(prev => ({ ...prev, password: e.target.value }))
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsloading(true);
      const response = await fetch(`${process.env.REACT_APP_REST_HOST}/auth/admin/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': "application/json"
        },
      });

      const result: LoginResI = await response.json();
      dispatch(saveTokenAuth(result));
      navigate("/dashboard");
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsloading(false);
    }
  }

  return (
    <div className="bg-white formLogin w-[450px] h-[424px] absolute mx-auto left-0 right-0 rounded-xl shadow-xl top-[22vh] z-[100]">
      <form
        onSubmit={handleLogin}
        className="p-[32px] font-poppins"
      >
        <h1 className="text-xl font-semibold text-shark">
          Welcome to Admin
        </h1>
        <small className="text-sm font-light text-[#7C7C7C]">
          Please login with your account
        </small>
        <div className="form-login flex flex-col pt-8 gap-4 w-full">
          <Input
            label="Email"
            onChange={handleChangeEmail}
            placeholder="Input Email"
            type="email"
            required
          />
          <Input
            label="Password"
            onChange={handleChangePassword}
            placeholder="Input Password"
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className="h-[44px] text-center bg-spix hover:bg-spix-300 w-full text-white mt-5 text-base font-semibold"
          disabled={isLoading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginState;
