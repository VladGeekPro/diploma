"use client";
import { CartContext } from "@/components/AppContext";
import Bars2 from "@/components/icons/Bars2";
import ShoppingCart from "@/components/icons/ShoppingCart";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";

import { getServerSession } from "next-auth";

function 
AuthLinks({ status, userName }) {
  
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap">
          Привет, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-blue-600 rounded-full text-white px-8 py-2"
        >
          Выйти
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link href={"/login"}>Авторизоваться</Link>
        <Link
          href={"/register"}
          className="bg-blue-600 rounded-full text-white px-8 py-2"
        >
          Регистрация
        </Link>
      </>
    );
  }
}
export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // console.log("MONGO_URL:", process.env.MONGO_URL);
  // console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  // console.log("SECRET:", process.env.SECRET);
  // console.log("SESSION:", session);
  // console.log("userData:", userData);


  

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-blue-600 font-semibold text-2xl" href={"/"}>
        ВЖ ТЕЛЕФОН
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
        >
          <Link href={"/"}>Главная</Link>
          <Link href={"/menu"}>Каталог</Link>
          <Link href={"/#aboutUs"}>О нас</Link>
          <Link href={"/#contact"}>Контакты</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-4 text-orange-400 font-semibold">
          <Link className="text-blue-600 font-semibold text-2xl" href={"/"}>
          ВЖ ТЕЛЕФОН
          </Link>
          <Link href={"/"}>Главная</Link>
          <Link href={"/menu"}>Каталог</Link>
          <Link href={"/#aboutUs"}>О нас</Link>
          <Link href={"/#contact"}>Контакты</Link>
        </nav>
        <nav className="flex items-center gap-4 text-orange-400 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

