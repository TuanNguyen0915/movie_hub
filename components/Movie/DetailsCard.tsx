"use client";
import { ICast, IMovie } from "@/types";
import Image from "next/image";
interface IProps {
  movie: IMovie;
  releaseDate: string;
}

const DetailsCard = ({ movie, releaseDate}: IProps) => {
  const backgroundURL = `https://image.tmdb.org/t/p/original${
    movie?.backdrop_path ? movie.backdrop_path : movie.poster_path
  }`;
  return (
    <main className="flex flex-col gap-10">
      <div
        style={{
          backgroundImage: `url(${backgroundURL})`,
        }}
        className="relative mt-10 h-[70vh] rounded-lg bg-cover bg-no-repeat"
      >
        <div className="absolute top-0 z-10 flex h-full w-full flex-col gap-5 bg-gradient-to-r from-[rgb(0,0,0)] via-[rgba(0,0,0,0.8)] to-indigo-800/60  p-4 backdrop-blur-[3px] md:flex-row lg:h-[70vh] lg:gap-10 lg:p-8 xl:p-16">
          <div className="relative h-[200px] w-[200px] md:h-[300px] md:w-[300p] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px]">
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
              className=" rounded-lg"
            />
          </div>

          <div className="flex w-full flex-col gap-4 p-1 lg:w-1/2 lg:p-4">
            <p className="text-3xl font-extrabold text-white  lg:text-5xl xl:text-7xl">
              {movie.title || movie.name || movie.original_title}
            </p>
            <div className="flex items-center gap-10 ">
              <p className="italic">{releaseDate}</p>
            </div>
            <p className="w-full lg:w-2/3">{movie.overview}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailsCard;
