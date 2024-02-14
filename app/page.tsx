import MoviesByGenres from "@/components/Genres/MoviesByGenres";
import Hero from "@/components/Hero/Hero";

const Home = () => {
  return (
    <div className="flex flex-col gap-10 text-white">
      <Hero />
      <MoviesByGenres />
    </div>
  );
};

export default Home;
