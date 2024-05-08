import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold ">
          Ваш новый мир в одном{" "}
          <span className="text-blue-600">устройстве</span>
        </h1>
        <p className="my-6 text-orange-400 text-sm">
          Откройте для новую коллекцию смартфонов.
          <br/>Каждый телефон — возможность,
          удобства и связи.
        </p>
        <div className="flex gap-6 items-center text-sm">
          <button
            className="flex gap-2 bg-blue-600  text-white rounded-full  px-4 py-1 "
            style={{ whiteSpace: "nowrap" }}
          >
            Заказать сейчас
            <Right />
          </button>
          <button
            className="flex gap-2 bg-orange-600 text-white rounded-full px-4 py-1 "
            style={{ whiteSpace: "nowrap" }}
          >
            Узнать больше
            <Right />
          </button>
        </div>
      </div>

      <div className="relative gap-8">
        <Image
          src={"/PhoneLogo.webp"}
          layout={"fill"}
          objectFit={"cover"}
          alt={"phone"}
        />
      </div>
    </section>
  );
}
