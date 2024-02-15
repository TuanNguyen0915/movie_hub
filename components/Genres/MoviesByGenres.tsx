
import { fetchGenresMovies } from "@/actions/getMoviesData";
import { IGenre } from "@/types";
import MoviesEachGenre from "./MoviesEachGenre";

const MoviesByGenres = async () => {
  const moviesByGenres = await fetchGenresMovies();
  
  return (
    <div className="mt-10 flex w-full flex-col gap-20 px-4">
      {moviesByGenres.map((genre: IGenre) => (
        <div key={genre.id}>
          <p className="mb-4 text-3xl text-white md:text-4xl">{genre.name}</p>
          {genre.movies && <MoviesEachGenre movies={genre.movies} />}
        </div>
      ))}
    </div>
  );
};

export default MoviesByGenres;
