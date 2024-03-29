"use client";
import { IMovie } from "@/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";

const HeroCard = ({ trending }: { trending: IMovie[] }) => {
  return (
    <div className="w-full">
      <Swiper
        autoplay={{ delay: 2000 }}
        slidesPerView={1.5}
        spaceBetween={10}
        breakpoints={{
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 50,
          },
          1366: {
            slidesPerView: 5.5,
            spaceBetween: 50,
          },
        }}
        scrollbar={{ draggable: true }}
        modules={[Autoplay]}
      >
        {trending.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href="/movies/[movieId]" as={`/movies/${movie.id}`}>
              <div className="mx-auto flex h-[150px] w-[150px] flex-col justify-between gap-10 rounded-lg border border-transparent hover:border-white 2xl:h-[300px] 2xl:w-[300px]">
                <Image
                  src={`https://image.tmdb.org/t/p/original${
                    movie?.backdrop_path
                      ? movie.backdrop_path
                      : movie.poster_path
                  }`}
                  width={1000}
                  height={1000}
                  alt={
                    movie.title ||
                    movie.name ||
                    movie.original_title ||
                    movie.original_name
                  }
                  className="flex-1 rounded-lg"
                />
                <p className="px-4 pb-4 font-semibold duration-500 group-hover:text-red-500 group-hover:lg:text-xl">
                  {movie.title ||
                    movie.name ||
                    movie.original_title ||
                    movie.original_name}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCard;
