"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginInProgress(false);
  }

  return (
    <div className="hero flex mt-10">
      <img
        src="/welcome.webp"
        alt="Welcome"
        className="rounded-xl mr-4 w-1/2"
      ></img>

      <div className="bg-white p-8 rounded-lg w-96 shadow-2xl ">
        <h1 className="text-center text-3xl font-bold text-orange-500 mb-6">
          Вход в аккаунт
        </h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Эл. почта"
            value={email}
            disabled={loginInProgress}
            onChange={(ev) => setEmail(ev.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            disabled={loginInProgress}
            onChange={(ev) => setPassword(ev.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button
            disabled={loginInProgress}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Войти
          </button>
          <div className="text-center text-sm text-gray-500 mt-4">
            или войти с помощью
          </div>
          <div className="social-logins text-center ">
            <button onClick={() => signIn("google", { callbackUrl: "/" })}>
              <Image src="/google.png" alt="Google" width={24} height={24} />
              <div className="ml-2 ">Google</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
