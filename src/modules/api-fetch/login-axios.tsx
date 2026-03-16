import { LoginResI } from "_interfaces/auth-api.interfaces";
import { login } from "_services/axios";
import { FormEvent, useRef, useState } from "react";

const LoginAxios = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState<LoginResI>();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsloading(true);
      const response = await login({
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      });
      setData(response.data);
    } catch (error) {
      // handle error
    } finally {
      setIsloading(false);
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

export default LoginAxios;
