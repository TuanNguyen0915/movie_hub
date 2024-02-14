import { fetchGenresMovies } from "@/actions/getMoviesData";
import { IGenre } from "@/types";

import MovieByGenre from "./MoviesEachGenre";

const MoviesByGenres = async () => {
  const moviesByGenres = await fetchGenresMovies();
  return (
    <div className="flex w-full flex-col gap-4 px-4">
      {moviesByGenres.map((genre: IGenre) => (
        <div key={genre.id}>
          <p className="mb-4 text-3xl text-white md:text-4xl">
            Top 10 {genre.name}{" "}
            <span className="duration-500 hover:text-red-500 cursor-pointer">(more ...)</span>
          </p>
          {genre.movies && <MovieByGenre movies={genre.movies.slice(0, 10)} />}
        </div>
      ))}
    </div>
  );
};

export default MoviesByGenres;
