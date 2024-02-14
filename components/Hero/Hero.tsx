"use client";
import { fetchTrendingMovies } from "@/actions/getMoviesData";
import { IMovie } from "@/types";

import {
  IoPlayCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css";

const Hero = async () => {
  const trending = await fetchTrendingMovies();

  return (
    <section className="w-full">
      <Swiper
        autoplay={{ delay: 2000 }}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {trending.map((movie: IMovie) => (
          <SwiperSlide key={movie.id}>
            <div
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original${
                  movie?.backdrop_path ? movie.backdrop_path : movie.poster_path
                }')`,
              }}
              className={`relative h-[40vh] w-full rounded-lg bg-cover bg-center bg-no-repeat max-md:mt-[10vh] md:h-[90vh]`}
            >
              {/* MASK */}
              <div className="absolute z-10 flex h-[40vh] w-full flex-col items-center rounded-lg bg-[rgba(0,0,0,0.8)] px-5 md:h-[90vh] md:px-20">
                <div className="group flex w-full flex-1 flex-col justify-center">
                  <div className="h-[100px]">
                    <p className="flex items-center text-3xl text-red-500 duration-500 md:text-5xl md:group-hover:text-7xl">
                      {movie.title ? movie.title : movie.name}
                    </p>
                  </div>
                  <p className=" text-[12px] text-white duration-500 max-md:hidden md:w-1/2 lg:text-xl">
                    {movie.overview}
                  </p>
                  <div className="mt-10 flex w-full gap-4 md:gap-10">
                    <button className="flex min-w-[100px] items-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-base font-semibold text-black duration-500 hover:bg-red-500 hover:text-white md:px-8 md:py-4 md:text-lg">
                      <IoPlayCircleOutline className="scale-[2]" />
                      <p>Play Now</p>
                    </button>
                    <button className="flex min-w-[100px] items-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-base font-semibold text-black duration-500 hover:bg-red-500 hover:text-white md:px-8 md:py-4 md:text-lg">
                      <IoInformationCircleOutline className="scale-[2]" />
                      <p>More Info</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;