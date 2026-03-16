import Input from "components/input";
import useLoginForm from "hooks/login/useLoginForm";

const LoginHookForm = () => {
  const {
    loginHandler,
    register,
    errors,
    isLoading,
    rememberMe,
    rememberMeHandler,
  } = useLoginForm();

  return (
    <form
      onSubmit={loginHandler}
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
          {...register("email")}
          placeholder="Input Email"
          error={errors.email}
        />
        <Input
          label="Password"
          {...register("password")}
          placeholder="Input Password"
          type="password"
          error={errors.password}
        />
        <div className="flex justify-end items-center gap-2">
          <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={rememberMeHandler} />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
      </div>
      <button
        type="submit"
        className="text-center w-full mt-5 text-base font-semibold"
        disabled={isLoading}
      >
        Login
      </button>
    </form>
  );
};

export default LoginHookForm;
