import { getBlurEffect } from "@/actions/getBlurEffect";
import { IMovie } from "@/types";
import Image from "next/image";

const MovieCard = async ({ movie }: { movie: IMovie }) => {
  const movieBackground = `https://image.tmdb.org/t/p/w500${
    movie?.backdrop_path ? movie.backdrop_path : movie.poster_path
  }`;
  const base64 = await getBlurEffect(movieBackground)
  return (
    <div className="group flex h-[300px] w-[300px] flex-col justify-between gap-4 rounded-lg border border-[#131116] duration-500 hover:border-white">
      <Image
        src={movieBackground}
        blurDataURL={base64}
        placeholder="blur"
        width={1000}
        height={1000}
        alt="movie poster"
        className="flex-1 rounded-lg"
      />
      <p className="px-4 pb-2 duration-500 group-hover:font-semibold group-hover:text-red-500">
        {movie.name || movie.title}
      </p>
    </div>
  );
};

export default MovieCard;
