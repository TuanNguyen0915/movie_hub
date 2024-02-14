import { fetchGenresMovies } from "@/actions/getMoviesData";
import { IGenre } from "@/types";

import MovieByGenre from "./MoviesEachGenre";

const MoviesByGenres = async () => {
  const moviesByGenres = await fetchGenresMovies();
  return (
    <div className="flex w-full flex-col gap-20 px-4 mt-10">
      {moviesByGenres.map((genre: IGenre) => (
        <div key={genre.id}>
          <p className="mb-4 text-3xl text-white md:text-4xl">
            {genre.name}
          </p>
          {genre.movies && <MovieByGenre movies={genre.movies} />}
        </div>
      ))}
    </div>
  );
};

export default MoviesByGenres;
