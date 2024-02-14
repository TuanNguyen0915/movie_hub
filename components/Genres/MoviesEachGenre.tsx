"use client";
import { IMovie } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css";

import MovieCard from "./MovieCard";

const MovieByGenre = ({ movies }: { movies: IMovie[] }) => {
  return (
    <div className="w-full">
      <div className="hidden lg:flex">
        <Swiper
          autoplay={{ delay: 4000 }}
          spaceBetween={20}
          slidesPerView={4}
          scrollbar={{ draggable: true }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* MOBILE VIEW */}
      <div className="flex max-sm:hidden lg:hidden">
        <Swiper
          // autoplay={{ delay: 2000 }}
          spaceBetween={30}
          slidesPerView={'auto'}
          scrollbar={{ draggable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* MOBILE VIEW */}
      <div className="flex md:hidden">
        <Swiper
          // autoplay={{ delay: 2000 }}
          spaceBetween={30}
          slidesPerView={'auto'}
          scrollbar={{ draggable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieByGenre;
