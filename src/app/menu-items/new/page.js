"use client";
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Сохранение...",
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
      <div className="flex mr-4" style={{ width: "55%" }}>
        <UserTabs isAdmin={true} />
      </div>

      <div>
        <div className="flex  ">
          <Link href={"/menu-items"} className="button-change ml-7">
            <div> ◀ Вернуться к списку товаров</div>
          </Link>
        </div>
        <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
      </div>
    </section>
  );
}
