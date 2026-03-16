import { useLoginMutation } from "_services/rtk-query";
import { FormEvent, useRef } from "react";

const LoginRTKQuery = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [login, { isLoading, data }] = useLoginMutation();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await login({
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      }).unwrap();
    } catch (error) {
      // handle error
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input ref={emailRef} type="email" required />
        <input ref={passwordRef} type="password" required />
        <button disabled={isLoading}>Login</button>
      </form>
      {data ?
        <div>
          <h1>User Data</h1>
          <div>{data.user.name}</div>
          <div>{data.user.email}</div>
        </div>
        : null
      }
    </div>
  )
}

export default LoginRTKQuery;
