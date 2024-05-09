"use client";
import AddressInputs from "@/components/layout/AddressInputs";
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }

  return (
    <div className="md:flex gap-4  ">
      <form
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            admin,
            streetAddress,
            city,
            country,
            postalCode,
          })
        }
        style={{
          background: "#FFFFFF",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div className="w-1/2 mx-auto ">
          <EditableImage link={image} setLink={setImage} />
        </div>

        <div className="grow mt-4">
          <label className="text-orange-400">Имя и фамилия</label>
          <input
            type="text"
            placeholder="Введите имя и фамилию"
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
            style={{
              margin: "10px 0",
              padding: "10px",
              width: "calc(100% - 20px)",
            }}
          />
        </div>
        <div>
          <label className="text-orange-400">Эл. почта</label>
          <input
            type="email"
            disabled={true}
            value={user.email}
            placeholder="Электронная почта"
            style={{
              margin: "10px 0",
              padding: "10px",
              width: "calc(100% - 20px)",
            }}
          />
        </div>

        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span  className="text-orange-400" >Администратор</span>
            </label>
          </div>
        )}
        <button
          type="submit"
          style={{
            background: "#007BFF",
            color: "#FFFFFF",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}
