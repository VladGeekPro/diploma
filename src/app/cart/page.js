"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }
  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Ваш заказ оформляется...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Корзина" />
        <p className="mt-4">Ваша корзина пуста</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mt-8 text-center text-2xl font-semibold text-orange-400 py-2 bg-blue-600 rounded-t-full shadow-orange-400 shadow-lg">
        Корзина
      </h2>
      <div className="bg-[#0072ff]  flex flex-col justify-center items-center text-white  px-4 mx-4 rounded-2xl my-4">
        <div className="mt-8">
          <div>
            {cartProducts?.length === 0 && <div>Ваша корзина пуста</div>}
            {cartProducts?.length > 0 &&
              cartProducts.map((product, index) => (
                <CartProduct
                  key={index}
                  product={product}
                  onRemove={removeCartProduct}
                  index={index}
                />
              ))}
            <div className="py-2 pr-16 flex justify-end items-center font-semibold">
              <div className="text-lg">
                {/* Subtotal:<br />
              Delivery:<br /> */}
                Сумма:
              </div>
              <div className="font-semibold pl-2 text-right text-lg ">
                {/* ${subtotal}<br />
              $5<br /> */}
                {/* ${subtotal + 5} */}
                {subtotal} лей
              </div>
            </div>
          </div>
          <div
            className=" p-4 rounded-lg my-6 border"
            style={{
              background: "#FFFFFF",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h1 className="text-center text-2xl font-semibold text-orange-400 ">
              Оформление заказа
            </h1>
            <form onSubmit={proceedToCheckout}>
              <AddressInputs
                addressProps={address}
                setAddressProp={handleAddressChange}
              />
              <button type="submit">Оплатить {subtotal} лей</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
