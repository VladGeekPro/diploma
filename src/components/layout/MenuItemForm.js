import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import DeleteButton from "@/components/DeleteButton";
import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const { id } = useParams();
  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Удаление...",
      success: "Удалено",
      error: "Ошибка",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <div className="md:flex mt-4 grow px-8 pt-8 w-10/12 ">
      <form
        style={{
          background: "#FFFFFF",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
        onSubmit={(ev) =>
          onSubmit(ev, {
            image,
            name,
            description,
            basePrice,
            // sizes,
            // extraIngredientPrices,
            category,
          })
        }
        // className="mt-8 max-w-2xl mx-auto"
      >
        {/* <div
          className="md:grid items-start gap-4"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        > */}
        <div className="w-1/2 mx-auto ">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className=" mt-4">
          <label>Название телефона</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Описание</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Раздел</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Цена</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          {/* <MenuItemPriceProps name={'Sizes'}
                              addLabel={'Add item size'}
                              props={sizes}
                              setProps={setSizes} />
          <MenuItemPriceProps name={'Extra ingredients'}
                              addLabel={'Add ingredients prices'}
                              props={extraIngredientPrices}
                              setProps={setExtraIngredientPrices}/> */}

          <div className="flex gap-4 mx-2 mt-2 ">
            <button type="submit" className="button-create">
              Сохранить
            </button>
            <DeleteButton
              label="Удалить телефон"
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
        {/* </div> */}
      </form>
    </div>
  );
}
