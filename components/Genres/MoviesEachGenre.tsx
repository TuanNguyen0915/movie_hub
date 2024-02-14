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

const MoviesEachGenre = ({ movies }: { movies: IMovie[] }) => {
  return (
    <div className="w-full">
      <div className="flex">
        <Swiper
          slidesPerView={1}
          spaceBetween={50}
          breakpoints={{
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1366: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
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

export default MoviesEachGenre;
