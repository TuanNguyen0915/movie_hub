"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css";
import { IMovie } from "@/types";

const HeroSwipe = ({ trending }: { trending: IMovie[] }) => {
  return (
    <div className="hidden w-full xl:flex">
      <Swiper
        autoplay={{ delay: 4000 }}
        spaceBetween={30}
        slidesPerView={4}
        scrollbar={{ draggable: true }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {trending.map((movie: IMovie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="group mx-auto flex h-[400px] w-[400px] flex-col justify-between gap-4 rounded-lg border border-slate-900 duration-500 hover:border-white"
              key={movie.id}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${
                  movie?.backdrop_path ? movie.backdrop_path : movie.poster_path
                }`}
                alt="movie"
                width={1000}
                height={1000}
                className="flex-1 rounded-lg"
              />
              <p className="px-2 text-white">
                {movie.title ? movie.title : movie.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSwipe;
