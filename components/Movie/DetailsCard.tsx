"use client";
import { IMovie } from "@/types";
import Image from "next/image";

import { IoPlayCircleOutline } from "react-icons/io5";

const DetailsCard = ({ movie }: { movie: IMovie }) => {
  const backgroundURL = `https://image.tmdb.org/t/p/original${
    movie?.backdrop_path ? movie.backdrop_path : movie.poster_path
  }`;
  let webLink = movie.homepage
    ? movie.homepage.split("https://")[1]
    : "not available";
  // webLink = webLink.length > 20 ? `${webLink.slice(0, 20)}...` : webLink;
  return (
    <div className="flex flex-col md:flex-row lg:h-[70vh] lg:gap-10 lg:p-8 xl:p-16">
      <div className="relative h-[200px] w-[200px] md:h-[300px] md:w-[300p] lg:h-[400px] lg:w-[400px] xl:h-[600px] xl:w-[600px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie?.poster_path ? movie.poster_path : movie.backdrop_path
          }`}
          fill
          alt={
            movie.original_title ||
            movie.title ||
            movie.name ||
            movie.original_name
          }
          className="rounded-lg"
        />
      </div>

      <div className="flex w-full flex-col gap-4 p-1 lg:w-1/2 lg:p-4">
        <p className="text-3xl font-extrabold text-white  lg:text-5xl xl:text-7xl">
          {movie.title || movie.name || movie.original_title}
        </p>

        <p>{movie.release_date.split("-")[0]}</p>
        <div className="flex items-center gap-4">
          {movie.genres.map((genre) => (
            <p key={genre.id}>{genre.name}</p>
          ))}
        </div>
        <p>
          {movie.vote_average} / 10{" "}
          <span className="font-semibold italic">
            ( {movie.vote_count} votes ){" "}
          </span>
        </p>
        {/* <p className="w-full">
          Website:{" "}
          <a
            href={movie.homepage}
            target="_blank"
            className="w-full text-red-300 duration-300 hover:text-red-500"
          >
            {webLink}
          </a>
        </p> */}
        <div className="flex w-full items-center gap-10 lg:w-1/2">
          <button className="flex items-center justify-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-base font-semibold text-black duration-500 hover:bg-red-500 hover:text-white md:px-8 md:py-4 md:text-lg">
            <IoPlayCircleOutline className="scale-[2]" />
            <p>Play Movie</p>
          </button>
          <button className="flex items-center justify-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-base font-semibold text-black duration-500 hover:bg-red-500 hover:text-white md:px-8 md:py-4 md:text-lg">
            <IoPlayCircleOutline className="scale-[2]" />
            <p>Play Trailer</p>
          </button>
        </div>
        <p className="w-full">{movie.overview}</p>
        <div className="w-full">
          <div className="flex items-center">
            <p className="text-gray-400 min-w-[150px]">Languages</p>
            <div className="flex w-full gap-4">
              {movie.spoken_languages.map((language) => (
                <p>{language.english_name}</p>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-gray-400 min-w-[150px]">Studios</p>
            <div className="flex w-full gap-4">
              {movie.production_companies.map((language) => (
                <p>{language.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
