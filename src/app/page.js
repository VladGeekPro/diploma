
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />

      <div id="aboutUs" className="mt-8">
        <SectionHeaders subHeader="Откройте для себя" mainHeader="О нас" />
      </div>

      <section  className=" mt-4  bg-gradient-to-b from-blue-600  to-orange-400 p-6 rounded-lg text-center relative overflow-hidden">
        <div className="text-white max-w-3xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            Наш интернет-магазин предлагает широкий ассортимент телефонов, от
            лидеров рынка до эксклюзивных новинок. Мы заботимся о том, чтобы
            каждый клиент нашел своё идеальное устройство.
          </p>
          <p>
            Обращая особое внимание на качество и сервис, мы предлагаем не
            только продукцию, но и поддержку на всех этапах выбора и
            использования.
          </p>
          <p>
            Здесь вы найдете не только телефоны, но и уникальные предложения —
            аксессуары, гаджеты для дома и многое другое.
          </p>
          <button className="mt-6 py-2 px-4 bg-orange-400 rounded hover:bg-orange-300 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg">
            Узнать больше
          </button>
        </div>
      </section>

      <div className="mt-8">
        <SectionHeaders
          subHeader="Не упусти шанс"
          mainHeader="Свяжись с нами сейчас!"
        />
      </div>
      <section className=" mt-4  bg-gradient-to-t from-blue-600  to-orange-400 p-6 rounded-lg text-center relative overflow-hidden">
          <a
            className="text-4xl font-bold text-white hover:text-orange-400 transition duration-300 ease-in-out transform hover:scale-110"
            href="tel:+37368943589"
          >
            +373 689 43 589
          </a>
      </section>

    </>
  );
}
