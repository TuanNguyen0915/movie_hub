import { IMovie } from "@/types";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: IMovie }) => {

  const movieBackground = `https://image.tmdb.org/t/p/w400${
    movie?.backdrop_path ? movie.backdrop_path : movie.poster_path
  }`;

  return (
    <>
      <Link
        href="/movies/[movieId]"
        as={`/movies/${movie.id}`}
        className="group mx-auto flex h-[300px] w-[300px] flex-col justify-between gap-4 rounded-lg border border-slate-900 duration-500 hover:border-white"
      >
        <Image
          src={movieBackground}
          placeholder="empty"
          width={1000}
          height={1000}
          alt="movie poster"
          className="flex-1 rounded-lg"
        />
        <p className="px-4 pb-2 duration-500 group-hover:font-semibold group-hover:text-red-500">
          {movie.name || movie.title}
        </p>
      </Link>
    </>
  );
};

export default MovieCard;
