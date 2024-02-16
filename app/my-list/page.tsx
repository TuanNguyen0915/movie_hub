import { fetchMovieDetails } from "@/actions/getMoviesData";
import { fetchMyList } from "@/actions/userMyList";
import Image from "next/image";
import Link from "next/link";

const MyList = async () => {
  const myList = await fetchMyList();

  const myListDetails = await Promise.all(
    myList.map(async (movieId: number) => {
      const movieDetails = await fetchMovieDetails(movieId);
      return movieDetails;
    }),
  );
  return (
    <div className="mt-24 flex w-full flex-col gap-10">
      {myListDetails && (
        <>
          <div className="flex flex-wrap items-center gap-10">
            {myListDetails.map((movie) => (
              <Link
                href="/movies/[movieId]"
                as={`/movies/${movie.id}`}
                key={movie.id}
              >
                <div className="group mx-auto flex h-[150px] w-[150px] flex-col justify-between gap-10 rounded-lg border border-transparent hover:border-white 2xl:h-[300px] 2xl:w-[300px]">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${
                      movie?.backdrop_path
                        ? movie.backdrop_path
                        : movie.poster_path
                    }`}
                    width={1000}
                    height={1000}
                    alt={
                      movie.title ||
                      movie.name ||
                      movie.original_title ||
                      movie.original_name
                    }
                    className="flex-1 rounded-lg"
                  />
                  <p className="px-4 pb-4 font-semibold duration-500 group-hover:text-red-500 group-hover:lg:text-xl">
                    {movie.title ||
                      movie.name ||
                      movie.original_title ||
                      movie.original_name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyList;
