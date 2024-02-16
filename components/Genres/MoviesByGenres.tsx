"use client";
import { fetchGenresMovies } from "@/actions/getMoviesData";
import MoviesEachGenre from "./MoviesEachGenre";
import { useRouter } from "next/navigation";
import { IGenre } from "@/types/types";
import { useEffect, useState } from "react";

const MoviesByGenres = () => {
  const router = useRouter();

  const [moviesByGenres, setMoviesByGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGenresMovies();
      setMoviesByGenres(data);
    };
    fetchData();
  });
  return (
    <div className="mt-10 flex w-full flex-col gap-20 px-4">
      {moviesByGenres.map((genre: IGenre) => (
        <div key={genre.id}>
          <p
            className="mb-4 cursor-pointer text-3xl text-white duration-500 hover:text-red-500 md:text-4xl"
            onClick={() => {
              router.push(`/genres/${genre.id}`);
            }}
          >
            {genre.name}
          </p>
          {genre.movies && <MoviesEachGenre movies={genre.movies} />}
        </div>
      ))}
    </div>
  );
};

export default MoviesByGenres;
