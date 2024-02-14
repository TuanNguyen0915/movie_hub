import {
  fetchTrendingMovies,
  fetchGenresMovies,
} from "@/actions/getMoviesData";
import { IMovie } from "@/types";
import {
  IoPlayCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

const Hero = async () => {
  const trending = await fetchTrendingMovies();
  const randomNumber = Math.floor(Math.random() * trending?.length);
  const selectedMovie: IMovie = trending[randomNumber];
  const movieBackground = selectedMovie?.backdrop_path
    ? selectedMovie.backdrop_path
    : selectedMovie.poster_path;
  return (
    <>
      {selectedMovie && movieBackground && (
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movieBackground}')`,
          }}
          className={`h-[40vh] w-full rounded-lg bg-cover bg-center bg-no-repeat max-md:mt-[10vh] md:h-[90vh]`}
        >
          {/* MASK */}
          <div className="absolute z-10 flex h-[40vh] w-full items-center rounded-lg bg-[rgba(0,0,0,0.8)] px-5 md:h-[90vh] md:px-20">
            <div className="group flex flex-col">
              <div className="h-[100px]">
                <p className="flex items-center text-3xl text-red-500 duration-500 md:text-5xl md:group-hover:text-7xl">
                  {selectedMovie.title
                    ? selectedMovie.title
                    : selectedMovie.name}
                </p>
              </div>
              <p className="text-lg text-white duration-500 max-lg:hidden md:w-1/2">
                {selectedMovie.overview}
              </p>
              <div className="mt-10 flex w-full gap-4 md:gap-10">
                <button className="flex min-w-[100px] items-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-base font-semibold text-black duration-500 hover:bg-red-500 hover:text-white md:px-8 md:py-4 md:text-lg">
                  <IoPlayCircleOutline className="scale-[2]" />
                  <p>Play Now</p>
                </button>
                <button className="flex min-w-[100px] items-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-base font-semibold text-black duration-500 hover:bg-red-500 hover:text-white md:px-8 md:py-4 md:text-lg">
                  <IoInformationCircleOutline className="scale-[2]" />
                  <p>More Info</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
