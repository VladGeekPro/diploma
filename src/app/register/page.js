"use client";
import {signIn} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <div className="hero flex mt-10  ">
      <div className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff]">
        <h2 className="text-orange-400 font-bold text-3xl mb-5 ">
          Добро пожаловать!
        </h2>
        <div className="font-semibold text-center p-4">
        Пожалуйста, войдите, чтобы оставаться на связи.
        </div>
        <div className="text-center my-4 bg-orange-400 p-2 rounded-xl w-1/2">
          <Link href={'/login'}>Войти </Link>
        </div>
      </div>
      <div className="form-container shadow-2xl">
        <h1 className="text-orange-500 font-bold text-4xl ">Создать аккаунт</h1>
        <div className="social-logins text-center ">
          <button onClick={() => signIn("google", { callbackUrl: "/" })}>
            <Image src="/google.png" alt="Google" width={24} height={24} />
            <div className="ml-2 ">Google</div>
          </button>
        </div>
        <div className="mb-4">Или зарегистрируйтесь с помощью:</div>

        {userCreated && (
          <div className="my-4 text-center">
            Аккаунт создан.
            <br />
            Теперь вы можете{" "}
            <Link className="underline" href={"/login"}>
              войти &raquo;
            </Link>
          </div>
        )}
        {error && <p>Произошла ошибка. Попробуйте позже.</p>}
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Эл. почта"
            value={email}
            disabled={creatingUser}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <div className="text-center">
            <button type="submit" disabled={creatingUser}>
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

