"use client";
import { IMovie } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoPlayCircleOutline } from "react-icons/io5";

interface IProps {
  movie: IMovie;
  trailerKey: string;
}

interface IUser {
  email: string;
  username: string;
  favoriteMovies: number[];
}

const DetailsCard = ({ movie, trailerKey }: IProps) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | {}>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playTrailer, setPlayTrailer] = useState<boolean>(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      try {
        const getUser = async () => {
          const res = await fetch(`/api/user/${session?.user?.email}`);
          const data = await res.json();
          setUser(data);
          if (data.favoriteMovies.includes(movie.id)) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        };
        getUser();
      } catch (error: any) {
        console.log(error);
      }
    }
  }, [session]);

  const addToMyList = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/user/${session?.user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: movie.id }),
      });
      const data = await res.json();
      setUser(data);
      if (data.favoriteMovies.includes(movie.id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
      setIsLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:h-[100vh] lg:gap-10 lg:p-8 xl:p-16">
      <div className="max-lg:hidden relative h-[200px] w-[200px] rounded-lg border border-black md:h-[300px] md:w-[300p] lg:h-[400px] lg:w-[400px] xl:h-[600px] xl:w-[600px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie?.poster_path ? movie.poster_path : movie.backdrop_path
          }`}
          fill
          alt={
            movie.original_title ||
            movie.title ||
            movie.name ||
            movie.original_name
          }
          className="rounded-lg"
        />
      </div>

      <div className="flex w-full flex-col gap-4 p-1 lg:w-1/2 lg:p-4">
        <p className="text-3xl font-extrabold text-white  lg:text-5xl xl:text-7xl">
          {movie.title || movie.name || movie.original_title}
        </p>

        <p>
          Release Date:
          <span className=" ml-4 font-semibold">{movie.release_date} </span>
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {movie.genres.map((genre) => (
            <Link
              key={genre.id}
              href="/genres/[genresId]"
              as={`/genres/${genre.id}`}
              className=" duration-500 hover:text-red-500"
            >
              <p className="text-base lg:text-xl">{genre.name}</p>
            </Link>
          ))}
        </div>
        <p>
          {movie.vote_average} / 10{" "}
          <span className="font-semibold italic">
            ( {movie.vote_count} votes ){" "}
          </span>
        </p>
        <div className="flex w-full flex-wrap items-center lg:gap-10 gap-4">
          <button className="flex items-center justify-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-base font-semibold text-black duration-500 hover:bg-red-500 hover:text-white md:px-8 md:py-4 md:text-lg">
            <IoPlayCircleOutline className="scale-[2]" />
            <p>Play Movie</p>
          </button>
          <button
            className="flex items-center justify-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-base font-semibold text-black duration-500 hover:bg-red-500 hover:text-white md:px-8 md:py-4 md:text-lg"
            onClick={() => {
              setPlayTrailer(true);
            }}
          >
            <IoPlayCircleOutline className="scale-[2]" />
            <p>Play Trailer</p>
          </button>
        </div>
        <p className="w-full">
          {movie.overview.length > 250
            ? `${movie.overview.slice(0, 250)}...`
            : movie.overview}
        </p>
        <div className="w-full">
          <div className="flex items-center max-lg:flex-col">
            <p className="min-w-[150px] text-gray-300">Languages</p>
            <div className="flex w-full flex-wrap gap-4">
              {movie.spoken_languages.map((language) => (
                <p key={language.english_name}>{language.english_name}</p>
              ))}
            </div>
          </div>
          <div className="flex items-center max-lg:flex-col">
            <p className="min-w-[150px] text-gray-300">Studios</p>
            <div className="flex w-full flex-wrap gap-4">
              {movie.production_companies.map((language) => (
                <p key={language.name}>{language.name}</p>
              ))}
            </div>
          </div>
        </div>

        {!isFavorite && (
          <button
            onClick={addToMyList}
            disabled={isLoading}
            className={`flex w-1/2 flex-wrap items-center justify-center gap-4 rounded-lg bg-red-500 px-4 py-2 font-semibold duration-500 hover:bg-white/50  md:px-8 md:py-4 md:text-lg ${isLoading ? "disabled:opacity-40" : ""}`}
          >
            {isLoading ? "Adding ..." : "Add to play list"}
          </button>
        )}
      </div>
      {playTrailer && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-20 mx-auto bg-[rgba(0,0,0,.8)]"
          onClick={() => {
            setPlayTrailer(false);
          }}
        >
          <div className="flex w-full items-center justify-center">
            <div className="mt-40 flex h-full w-full flex-col gap-5 lg:h-[500px] lg:w-[500px]">
              <div className="flex w-full justify-end">
                <IoIosCloseCircleOutline
                  className="scale-[2] text-end text-red-500"
                  onClick={() => {
                    setPlayTrailer(false);
                  }}
                />
              </div>
              <iframe
                className="h-[50vh] w-full lg:h-[515px] lg:w-[629px] "
                allowFullScreen
                loading="lazy"
                src={`https://www.youtube.com/embed/${trailerKey}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsCard;
