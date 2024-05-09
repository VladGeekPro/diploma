"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return "Загрузка данных пользователей...";
  }

  if (!data.admin) {
    return "Вы не администратор";
  }

  return (
    <section className="mt-8 flex">
      
      <div className="flex mr-4" style={{ width: "28%" }}>
        <UserTabs isAdmin={true} />
      </div>
      <div className="mx-auto">
      <h2 className="mb-4 text-center text-2xl font-semibold text-orange-400 py-2 bg-blue-600 rounded-t-full shadow-orange-400 shadow-lg">
            Список пользователеи
          </h2>
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className=" bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-xl p-2 px-4  gap-1 mb-1 items-center"
            >
              
              <div className="grid grid-cols-2  gap-4 grow">
              <div className=" text-white text-center text-lg font-semibold my-auto ">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="font-semibold">Без имени</span>}
                </div>
                <span className= "text-white text-center text-sm font-semibold my-auto ">{user.email}</span>
              </div>
              <div className="my-4 flex text-center justify-center " >
                <Link className="button-change" href={"/users/" + user._id}>
                  Отредактировать
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
