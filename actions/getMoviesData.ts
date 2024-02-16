import { getMoviesApi } from "@/services/getMoviesApi";

export const fetchTrendingMovies = async () => {
  const data = await getMoviesApi("/trending/all/week?language=en-US");
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

export const getSimilar = async (collectionId: string | number) => {
  const data = await getMoviesApi(
    `/movie/${collectionId}/similar?language=en-US&page=1`,
  );
  return data.results;
};

export const fetchSearchMovie = async (searchTerm: string | string[]) => {
  const data = await getMoviesApi(
    `/search/movie?query=${searchTerm}&language=en-US&page=1`,
  );
  return data.results;
};

export const fetchMovieDetails = async (movieId: string | number) => {
  const data = await getMoviesApi(
    `/movie/${movieId}?append_to_response=videos`
  )
  return data
};
