// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules"; // Import Autoplay module

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';
import "swiper/css/navigation";
import "swiper/css/autoplay";
import 'swiper/css/scrollbar';

import { bannerList } from "../../utils";
import { Link } from "react-router-dom";

const colors = [
    "bg-banner-color1",
    "bg-banner-color2",
    "bg-banner-color3",
]

function HeroBanner() {
  return (
    <div className="py-2 rounded-md">
      <Swiper
        effect="fade"
        modules={[Pagination, EffectFade, Navigation ,Autoplay]}
        grabCursor={true}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false
        }}
        navigation={true}
        pagination={{clickable: true}}
        scrollbar={{draggable: true}}
        slidesPerView={1}
        
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {bannerList.map((item,i)=>{
            return (
                <SwiperSlide key={item.id}>
                    <div className={`carousel-item rounded-md sm:h-[500px] h-90  ${colors[i]}`}>
                        <div className="hidden h-full lg:flex justify-center p-8">
                            <div className="flex justify-center items-center">
                                <div className="text-center">
                                    <h3 className="text-3xl text-white font-bold">
                                        {item.title}
                                    </h3>
                                    <h3 className="text-5xl text-white font-bold mt-2">
                                        {item.subtitle}
                                    </h3>
                                    <p className="text-white font-bold mt-4">
                                        {item.description}
                                    </p>
                                    <Link 
                                        className="mt-6 inline-block bg-black text-white px-4 py-4 rounded hover:bg-gray-800"
                                        to={"/products"}
                                    >
                                        Shop
                                    </Link>
                                </div>
                            </div>
                            <div className="overflow-hidden w-full flex justify-center lg:w-1/2 p-4">
                                <img className="w-full h-full" src={item?.image} alt="" />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            )
        })}
      </Swiper>
    </div>
  );
}

export default HeroBanner;
