"use client";

import { fetchGenresMovies } from "@/actions/getMoviesData";
import { IMovie } from "@/types";
import { set } from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IMovies {
  name: string;
  id: number;
  movies: IMovie[];
}

const GenderById = () => {
  const [movies, setMovies] = useState<IMovies>();
  const { genreId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const dataName = await fetchGenresMovies();

      const selectedGenre = dataName.find(
        (data: IMovie) => data.id.toString() === genreId,
      );
      setMovies(selectedGenre);
    };
    fetchData();
  }, [genreId]);
  return (
    <div className="mt-24 flex w-full flex-col gap-10">
      {movies && (
        <>
          <p className="text-3xl text-white xl:text-7xl">
            {movies.name}{" "}
            <span className="text-2xl text-red-500 xl:text-5xl">Movies</span>
          </p>
          <div className="flex flex-wrap items-center gap-10">
            {movies.movies.map((movie) => (
              <Link
                href="/movies/[movieId]"
                as={`/movies/${movie.id}`}
                key={movie.id}
              >
                <div className="group mx-auto flex h-[150px] w-[150px] flex-col justify-between gap-10 rounded-lg border border-transparent hover:border-white 2xl:h-[300px] 2xl:w-[300px]">
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
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GenderById;
