import { fetchGenresMovies } from "@/actions/getMoviesData";
import { IGenre, IMovie } from "@/types";
import MovieCard from "./MovieCard";

const MoviesByGenres = async () => {
  const moviesByGenres = await fetchGenresMovies();
  return (
    <div className="flex w-full flex-col gap-5 px-4">
      {moviesByGenres.map((genre: IGenre) => (
        <div key={genre.id}>
          <p className="text-2xl text-white">{genre.name}</p>
          {/* {genre.movies?.map((movie: IMovie) => (
            <div key={movie.id}>
              <p className="text-red-200">{movie.name || movie.title}</p>
            </div>
          ))} */}
          {genre.movies && <MovieCard movie={genre.movies[0]} />}
        </div>
      ))}
    </div>
  );
};

export default MoviesByGenres;
