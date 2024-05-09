import AddToCartButton from "@/components/menu/AddToCartButton";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className=" bg-gradient-to-r from-[#00c6ff] to-[#0072ff] mx-2 p-4 rounded-lg text-center hover:bg-blue-500 shadow-xl hover:shadow-orange-600/80 transition-all flex flex-col items-center justify-between height-full">
      <div className="flex justify-center items-center flex-1">
        <img src={image} className="h-64" alt="телефон"></img>
      </div>

      <h4 className="text-orange-500 text-xl font-semibold my-2">{name}</h4>

      <p className="text-[#FFFFFF] text-sm my-4 h-64 text-left ">
        {description}
      </p>

      <div className="flex flex-1 justify-center items-end ">
        <AddToCartButton
          image={image}
          hasSizesOrExtras={hasSizesOrExtras}
          onClick={onAddToCart}
          basePrice={basePrice}
        />
      </div>
    </div>
  );
}

// import AddToCartButton from "@/components/menu/AddToCartButton";

// export default function MenuItemTile({onAddToCart, ...item}) {
//   const {image, description, name, basePrice,
//     sizes, extraIngredientPrices,
//   } = item;
//   const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;
//   return (
//     <div className="bg-gray-200 p-4 rounded-lg text-center
//       group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
//       <div className="text-center">
//         <img src={image} className="max-h-auto max-h-24 block mx-auto" alt="pizza"/>
//       </div>
//       <h4 className="font-semibold text-xl my-3">{name}</h4>
//       <p className="text-gray-500 text-sm line-clamp-3">
//         {description}
//       </p>
//       <AddToCartButton
//         image={image}
//         hasSizesOrExtras={hasSizesOrExtras}
//         onClick={onAddToCart}
//         basePrice={basePrice}
//       />
//     </div>
//   );
// }
