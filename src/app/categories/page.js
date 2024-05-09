"use client";
import DeleteButton from "@/components/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Обновление раздела..."
        : "Создание нового раздела...",
      success: editedCategory ? "Раздел обновлён" : "Раздел создан",
      error: "Ошибка...",
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Удаление...",
      success: "Удалено",
      error: "Ошибка",
    });

    fetchCategories();
  }

  if (profileLoading) {
    return "Загрузка данных профиля...";
  }

  if (!profileData.admin) {
    return "Не администратор";
  }

  return (
    <section className="mt-8  flex">
      <div className="flex mr-4" style={{ width: "30%" }}>
        <UserTabs isAdmin={true} />
      </div>
      <div className="flex-1  ">
        <form className="mt-8 " onSubmit={handleCategorySubmit}>
          <div className="grow ">
            <h2 className="  text-center text-2xl font-semibold text-orange-400 py-2 bg-blue-600 rounded-t-full mb-4 shadow-orange-400 shadow-lg">
              <label className="  text-center text-2xl font-semibold text-orange-400 py-2 bg-blue-600 rounded-t-full ">
                {editedCategory ? "Обновление раздела" : "Создать раздел"}
                {editedCategory && (
                  <>
                    : <b>{editedCategory.name}</b>
                  </>
                )}
              </label>
            </h2>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />

            {/* style={{
                      background:
                        "linear-gradient(to right, #FDC830 0%, #F37335 100%)",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "20px",
                      border: "none",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      setEditedCategory(c);
                      setCategoryName(c.name);
                    }} */}
          </div>
          <div className="pb-2 flex gap-6">
            <button className="button-create" type="submit">
              {editedCategory ? "Обновить" : "Создать"}
            </button>
            <button
              type="button"
              className="button-delete"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Отмена
            </button>
          </div>
        </form>
        <div>
          <h2 className="mt-8 text-center text-2xl font-semibold text-orange-400 py-2 bg-blue-600 rounded-t-full shadow-orange-400 shadow-lg">
            Список разделов
          </h2>
          <div className=" grid grid-cols-2 gap-4 mx-4 mt-4">
            {categories?.length > 0 &&
              categories.map((c) => (
                <div
                  key={c._id}
                  className="  bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-xl p-2 px-4  gap-1 mb-1 items-center"
                >
                  <div className="grow text-white text-center text-xl font-semibold mb-2 ">
                    {c.name}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="button-change"
                      onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name);
                      }}
                    >
                      Изменить
                    </button>

                    <DeleteButton
                      label="Удалить"
                      onDelete={() => handleDeleteClick(c._id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
