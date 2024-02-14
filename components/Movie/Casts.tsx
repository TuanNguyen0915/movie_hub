import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css";
import Image from "next/image";
import { ICast } from "@/types";

const Casts = ({ casts }: { casts: ICast[] }) => {
  return (
    <div className="mb-20 w-full">
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
          1366: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        scrollbar={{ draggable: true }}
        navigation={true}
        loop
        modules={[Navigation]}
      >
        {casts.map((cast: ICast) => (
          <SwiperSlide key={cast.id}>
            <div className="mx-auto flex flex-col items-center justify-center gap-4">
              <div className="relative h-[150px] w-[150px] rounded-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w400/${cast.profile_path}`}
                  alt={cast.name}
                  // width={200}
                  // height={200}
                  // className="rounded-full object-contain"
                  fill
                  className="rounded-full"
                />
              </div>

              <div className="flex w-full flex-col items-center justify-center gap-2">
                <p className="font-bold">{cast.name}</p>
                <p className="text-sm italic">{cast.character}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Casts;
