"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <div
      className="text-white bg-gradient-to-r from-[#00c6ff] to-[#0072ff]"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "start",
        width: "100%",
        padding: "40px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Link
        style={{
          display: "block",
          padding: "10px",
          marginBottom: "5px",
          color: path === "/profile" ? "#FFFFFF" : "#000000",
          background: path === "/profile" ? "#2563EB" : "transparent",
          borderRadius: "10px",
          textDecoration: "none",
          color: "white",
        }}
        href="/profile"
      >
        👔 Профиль
      </Link>
      {isAdmin && (
        <>
          <Link
            href="/categories"
            style={{
              display: "block",
              padding: "10px",
              marginBottom: "5px",
              color: path === "/categories" ? "#FFFFFF" : "#000000",
              background: path === "/categories" ? "#2563EB" : "transparent",
              borderRadius: "10px",
              textDecoration: "none",
              color: "white",
            }}
          >
            📑 Разделы
          </Link>
          <Link
            href="/menu-items"
            style={{
              display: "block",
              padding: "10px",
              marginBottom: "5px",
              color: path.includes("menu-items") ? "#FFFFFF" : "#000000",
              background: path.includes("menu-items")
                ? "#2563EB"
                : "transparent",
              borderRadius: "10px",
              textDecoration: "none",
              color: "white",
            }}
          >
            🧧 Каталог
          </Link>
          <Link
            href="/users"
            style={{
              display: "block",
              padding: "10px",
              marginBottom: "5px",
              color: path.includes("/users") ? "#FFFFFF" : "#000000",
              background: path.includes("/users") ? "#2563EB" : "transparent",
              borderRadius: "10px",
              textDecoration: "none",
              color: "white",
            }}
          >
            🤴 Пользователи
          </Link>
        </>
      )}
      {/* <Link
        href="/orders"
        style={{
          display: "block",
          padding: "10px",
          color: path === "/orders" ? "#FFFFFF" : "#000000",
          background: path === "/orders" ? "#2563EB" : "transparent",
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
       🍱 Заказы
      </Link> */}
    </div>
  );
}
