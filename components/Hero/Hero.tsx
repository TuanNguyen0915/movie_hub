import { fetchTrendingMovies } from "@/actions/trendingMovie";
import { IMovie } from "@/types";

const Hero = async () => {
  const trending = await fetchTrendingMovies();
  const randomNumber = Math.floor(Math.random() * trending.length);
  const selectedMovie: IMovie = trending[randomNumber];
  console.log(selectedMovie);
  return (
    <div
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path || selectedMovie.poster_path}')`,
      }}
      className={`h-[40vh] w-full bg-cover bg-center bg-no-repeat max-md:mt-[10vh] md:h-[90vh]`}
    >
      <div className="absolute z-10 flex h-[40vh] w-full items-center bg-[rgba(0,0,0,0.8)] bg-black px-5 md:h-[90vh] md:px-20">
        <div className="group flex flex-col">
          <div className="h-[100px]">
            <p className="flex items-center text-3xl text-red-500 duration-500 md:text-5xl md:group-hover:text-7xl">
              {selectedMovie.name
                ? selectedMovie.name
                : selectedMovie.original_title}
            </p>
          </div>
          <p className="text-white duration-500 max-lg:hidden md:w-1/2">
            {selectedMovie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
