"use client";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {
  const { id } = useParams();

  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Сохранение товара",
      success: "Сохранено",
      error: "Ошибка",
    });

    setRedirectToItems(true);
  }



  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Загрузка данных пользователя...";
  }

  if (!data.admin) {
    return "Вы не администратор";
  }

  return (
    <section className="mt-8 flex">
      <div className="flex mr-4" style={{ width: "28%" }}>
        <UserTabs isAdmin={true} />
      </div>
      <div className="flex-1 max-w-2xl mx-auto">
        <div className="max-w-2xl mx-auto">
          <Link href={"/menu-items"} className="button-change ml-7">
            <span> ◀ Вернуться к списку товаров</span>
          </Link>
        </div>
        <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      </div>
    </section>
  );
}
