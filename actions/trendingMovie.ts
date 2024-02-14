import { getMoviesApi } from "@/services/getMoviesApi";

export const fetchTrendingMovies = async () => {
  const data = await getMoviesApi("trending/all/week?language=en-US");
  return data.results;
};


fetchTrendingMovies()