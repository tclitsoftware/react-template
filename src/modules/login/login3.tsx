import { FormEvent, useRef, useState } from "react";
import { errorHandler } from "_services/errorHandler";
import { LoginResI } from "_interfaces/auth-api.interfaces";
import { useAppDispatch } from "store";
import { saveTokenAuth } from "store/auth";
import { useNavigate } from "react-router-dom";
import Input from "components/input";

const LoginRef = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsloading(true);
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      const response = await fetch(`${process.env.REACT_APP_REST_HOST}/auth/admin/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
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
            ref={emailRef}
            placeholder="Input Email"
            type="email"
            required
          />
          <Input
            label="Password"
            ref={passwordRef}
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

export default LoginRef;
