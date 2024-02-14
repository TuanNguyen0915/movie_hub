import { getMoviesApi } from "@/services/getMoviesApi";

export const fetchTrendingMovies = async () => {
  const data = await getMoviesApi("trending/all/week?language=en-US");
  return data.results;
};

export const fetchGenresMovies = async () => {
  const data = await getMoviesApi("/genre/movie/list?language=en");
  const genres = data.genres;

  for (const genre of genres) {
    const data = await getMoviesApi(`/discover/movie?with_genres=${genre.id}`);
    genre.movies = data.results;
  }
  return genres;
};

