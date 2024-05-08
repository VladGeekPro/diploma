'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then(res => res.json())
      .then(categories => setCategories(categories));

    fetch('/api/menu-items').then(res => res.json())
      .then(menuItems => setMenuItems(menuItems));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  // Custom arrow components with full-width adjustment
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} nextArrow`}
        style={{ ...style, display: "block", right: "-25px" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} prevArrow`}
        style={{ ...style, display: "block", left: "-25px", zIndex: 1 }}
        onClick={onClick}
      />
    );
  }

  return (
    <section className="mt-8">
      {categories?.length > 0 && categories.map(c => (
        <div key={c._id} className="my-12 mx-4">
          <div className="text-center my-4">
            <SectionHeaders mainHeader={c.name} />
          </div>
          <div className="relative">
            <Slider {...settings}>
              {menuItems.filter(item => item.category === c._id).map(item => (
                <MenuItem key={item._id} {...item} />
              ))}
            </Slider>
          </div>
        </div>
      ))}
    </section>
  );
}





// 'use client';
// import SectionHeaders from "@/components/layout/SectionHeaders";
// import MenuItem from "@/components/menu/MenuItem";
// import {useEffect, useState} from "react";

// export default function MenuPage() {
//   const [categories, setCategories] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   useEffect(() => {
//     fetch('/api/categories').then(res => {
//       res.json().then(categories => setCategories(categories))
//     });
//     fetch('/api/menu-items').then(res => {
//       res.json().then(menuItems => setMenuItems(menuItems));
//     });
//   }, []);
//   return (

    

//     <section className="mt-8">
      
//       {categories?.length > 0 && categories.map(c => (
//         <div key={c._id}>
//           <div className="text-center">
//             <SectionHeaders mainHeader={c.name}  />
//           </div>
//           <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
//             {menuItems.filter(item => item.category === c._id).map(item => (
//               <MenuItem key={item._id} {...item} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

