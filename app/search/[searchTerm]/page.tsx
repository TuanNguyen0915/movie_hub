"use client";

import { fetchSearchMovie } from "@/actions/getMoviesData";
import HeroCard from "@/components/Hero/HeroCard";
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
