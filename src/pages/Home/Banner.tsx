
import { Swiper, SwiperSlide } from "swiper/react";
import b1 from "../../assets/images/b1.jpg";
import b2 from "../../assets/images/b2.png";
import b3 from "../../assets/images/b3.png";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Pagination, Navigation } from "swiper/modules";
const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="h-[500px] w-full" src={b1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[500px] w-full" src={b2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[500px] w-full" src={b3} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
