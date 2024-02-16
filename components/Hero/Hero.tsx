"use client";
import { fetchTrendingMovies } from "@/actions/getMoviesData";
import { IMovie } from "@/types/types";

import {
  IoPlayCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css";
import HeroCard from "./HeroCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const Hero = () => {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetchTrendingMovies();
        setTrending(data);
      };
      fetchData();
    } catch (error) {
      toast.error("something wrong");
    }
  }, []);
  return (
    <section className="relative w-full">
      <Swiper
        autoplay={{ delay: 4000 }}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {trending.slice(0, 10).map((movie: IMovie) => (
          <SwiperSlide key={movie.id}>
            <div
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original${
                  movie?.backdrop_path ? movie.backdrop_path : movie.poster_path
                }')`,
              }}
              className="relative h-[40vh] w-full rounded-lg bg-cover bg-center bg-no-repeat max-md:mt-[10vh] md:h-[90vh]"
            >
              {/* MASK */}
              <div className="absolute z-10 flex h-[40vh] w-full flex-col items-center rounded-lg bg-[rgba(0,0,0,0.6)] px-5 md:h-[90vh] md:px-20">
                <div className="group flex w-full flex-1 flex-col max-md:mt-10 md:justify-center">
                  <div className="h-[100px]">
                    <p className="flex items-center text-3xl text-red-500 duration-500 md:text-5xl md:group-hover:text-7xl">
                      {movie.title ||
                        movie.name ||
                        movie.original_title ||
                        movie.original_name}
                    </p>
                  </div>
                  <p className=" text-sm text-white duration-500 max-lg:hidden md:text-xl 2xl:w-1/2">
                    {movie.overview.length > 200
                      ? `${movie.overview.slice(0, 200)}...`
                      : movie.overview}
                  </p>
                  <div className="mt-10 flex w-full gap-4 md:gap-10">
                    <button className="flex min-w-[100px] items-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-base font-semibold text-black duration-500 hover:bg-red-500 hover:text-white md:px-8 md:py-4 md:text-lg">
                      <IoPlayCircleOutline className="scale-[2]" />
                      <p>Play Now</p>
                    </button>
                    <button className="flex min-w-[100px] items-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-base font-semibold text-black duration-500 hover:bg-red-500 hover:text-white md:px-8 md:py-4 md:text-lg">
                      <IoInformationCircleOutline className="scale-[2]" />
                      <Link href="/movies/[movieId]" as={`/movies/${movie.id}`}>
                        <p>More Info</p>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* SMALL MOVIE LIST */}
      <div className="absolute bottom-5 z-40 hidden w-full lg:bottom-14 lg:block">
        <HeroCard trending={trending.slice(0, 10)} />
      </div>
    </section>
  );
};

export default Hero;
