import { IMovie } from "@/types";
import Image from "next/image";

const MovieCard = ({ movie }: { movie: IMovie }) => {
  const movieBackground = movie?.backdrop_path
    ? movie.backdrop_path
    : movie.poster_path;
  return (
    <div className="group flex h-[200px] w-[200px] flex-col justify-between gap-4 rounded-lg border border-[#131116] duration-500 hover:border-white">
      <Image
        src={`https://image.tmdb.org/t/p/original${movieBackground}`}
        width={1000}
        height={1000}
        alt="movie poster"
        className="flex-1 rounded-lg"
      />
      <p className="px-4 pb-2 duration-500 group-hover:text-red-500 group-hover:font-semibold">
        {movie.name || movie.title}
      </p>
    </div>
  );
};

export default MovieCard;
