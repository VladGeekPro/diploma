"use client";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Загрузка каталога товаров...";
  }

  if (!data.admin) {
    return "Не администротор";
  }

  return (
    <section className=" flex mt-4">
      <div className="flex mr-4" style={{ width: "30%" }}>
        <UserTabs isAdmin={true} />
      </div>

      <div>
        <h2 className="  mt-4 text-center text-2xl font-semibold text-orange-400 py-2 bg-blue-600 rounded-t-full mb-4 shadow-orange-400 shadow-lg">
          Добавить новый товар
        </h2>
        <div className="flex mt- justify-center items-center gap-8">
          <Image
            src="/AddPhone.webp"
            alt="Photo"
            width={250}
            height={24}
            className="rounded-xl mr-4"
          />

          <div>
            <Link
              className="button flex gap-4 h-24 justify-center items-center"
              href={"/menu-items/new"}
            >
              <span>Добавить новый товар</span>
              <Right />
            </Link>
          </div>
        </div>
        <div>
          <h2 className="  mt-8 text-center text-2xl font-semibold text-orange-400 py-2 bg-blue-600 rounded-t-full mb-4 shadow-orange-400 shadow-lg">
            Изменить товар:
          </h2>
          {/* <div className="grid grid-cols-3 gap-2">
            {menuItems?.length > 0 &&
              menuItems.map((item) => (
                <Link
                  key={item._id}
                  href={"/menu-items/edit/" + item._id}
                  className="bg-gray-200 rounded-lg p-4"
                >
                  <div className="relative">
                    <Image
                      className="rounded-md"
                      src={item.image}
                      alt={""}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="text-center">{item.name}</div>
                </Link>
              ))}
          </div> */}
          <div className="grid grid-cols-3 gap-2">
            {menuItems?.length > 0 &&
              menuItems.map((item) => (
                <Link
                  key={item._id}
                  href={"/menu-items/edit/" + item._id}
                  className="bg-blue-600 mx-2 p-4 rounded-lg text-center hover:bg-blue-500 shadow-xl hover:shadow-orange-600/80 transition-all flex flex-col items-center justify-between height-full"
                >
                  <div className="flex justify-center items-center flex-1">
                    <img src={item.image} className="h-40" alt="телефон"></img>
                  </div>
                  <h4 className="text-orange-500 t-4 ">{item.name}</h4>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
