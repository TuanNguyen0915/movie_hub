import { IMovie } from "@/types";
import MovieCard from "./MovieCard";

const MovieByGenre = ({ movies }: { movies: IMovie[] }) => {
  
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id}/>
      ))}
    </div>
  );
};

export default MovieByGenre;
