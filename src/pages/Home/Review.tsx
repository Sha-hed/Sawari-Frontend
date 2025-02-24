import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import profile from "../../assets/images/profile.png";
import quote from "../../assets/images/quote.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

type Review = {
  name: string;
  address: string;
  review: string;
  image: string;
};

const Review = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("./Reviews.json");
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log("Review gula paisi:", reviews);

  return (
    <div className="w-full md:max-w-7xl mx-1 md:mx-auto mt-20 pb-20">
      <h1 className="font-bold text-3xl mb-20 text-center md:text-left">What our customer says!</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {reviews.map((review: Review, id: number) => (
          <SwiperSlide key={id}>
            <div className="bg-white p-6 rounded-lg shadow-md w-[95%] mx-auto md:w-96 h-72">
              <div className="flex flex-col w-full h-full justify-between">
                <p className="mt-5">{review.review}</p>
                <div className="flex items-center justify-between pb-5">
                  <div className="flex items-center space-x-5">
                    <div className="w-12">
                      <img src={profile} alt="" />
                    </div>
                    <div>
                      <h1>{review.name}</h1>
                      <h1>{review.address}</h1>
                    </div>
                  </div>
                  <div className="w-8">
                    <img src={quote} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
