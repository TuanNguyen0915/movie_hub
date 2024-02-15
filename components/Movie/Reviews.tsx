import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
import "swiper/css";
import { IReview } from "@/types";

import Review from "./Review";

const Reviews = ({ reviews }: { reviews: IReview[] }) => {
  return (
    <div className="mb-20 mt-10 w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 3000,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1366: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1688: {
            slidesPerView: 5,
            spaceBetween: 10,
          }
        }}
        scrollbar={{ draggable: true }}
        navigation={true}
        modules={[Navigation, Autoplay]}
      >
        {reviews.map((review: IReview) => (
          <SwiperSlide key={review.id}>
            <Review review={review}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
