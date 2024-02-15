import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css";
import { IReview } from "@/types";
import { getCreateDate } from "@/actions/getDate";

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
        loop
        modules={[Navigation, Autoplay]}
      >
        {reviews.map((review: IReview) => (
          <SwiperSlide key={review.id}>
            <div className="mx-auto flex h-[300px] w-[300px] flex-col gap-4 rounded-lg bg-slate-400/10 p-4 backdrop-blur-sm">
              <div>
                <p className="w-full text-xl font-semibold">{review.author}</p>
                <p className="w-full text-base italic">
                  {getCreateDate(review.created_at)}
                </p>
              </div>
              <p className="w-full flex-1  text-sm italic text-gray-200 ">
                {review.content.length > 350
                  ? `${review.content.slice(0, 350)} ...`
                  : review.content}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
