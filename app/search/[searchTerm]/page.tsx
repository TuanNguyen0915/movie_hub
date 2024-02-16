"use client";

import { fetchSearchMovie } from "@/actions/getMoviesData";
import { IMovie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const [searchMovies, setSearchMovies] = useState<IMovie[] | []>();
  const { searchTerm } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSearchMovie(searchTerm);
      setSearchMovies(data);
    };
    fetchData();
  }, [searchTerm]);

  if (searchMovies?.length === 0) {
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-10">
        <p className="text-2xl font-bold text-red-500 md:text-5xl xl:text-7xl">
          Sorry !!!
        </p>
        <p className="tex-xl text-white lg:text-3xl">
          We dont have data for{" "}
          <span className="text-red-500">{searchTerm}</span>
        </p>
        <p className="tex-xl text-white lg:text-3xl">
          Back to{" "}
          <Link
            href="/"
            className="cursor-pointer text-red-500 duration-500 hover:text-red-300"
          >
            Home
          </Link>
        </p>
      </div>
    );
  }
  return (
    <main>
      {searchMovies && (
        <div className="flex w-full flex-wrap items-center gap-5">
          {searchMovies.map((movie) => (
            <Link
              key={movie.id}
              href="/movies/[movieId]"
              as={`/movies/${movie.id}`}
              className={`${!movie.backdrop_path ? "hidden" : ""}`}
            >
              <div className="group mx-auto flex h-[150px] w-[150px] flex-col justify-between gap-10 rounded-lg border border-transparent hover:border-white 2xl:h-[300px] 2xl:w-[300px]">
                <Image
                  src={`https://image.tmdb.org/t/p/original${
                    movie.backdrop_path
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
                <p className=" px-4 pb-4 font-semibold duration-500 group-hover:text-red-500 group-hover:lg:text-xl">
                  {movie.title ||
                    movie.name ||
                    movie.original_title ||
                    movie.original_name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Search;
