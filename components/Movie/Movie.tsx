"use client";
import { useEffect, useState } from "react";
import DetailsCard from "./DetailsCard";
import { ICast, IMovie, IReview, IVideo } from "@/types";
import Casts from "./Casts";
import Reviews from "./Reviews";
import Videos from "./Videos";
import Similar from "./Similar";

const Movie = ({ movieId }: { movieId: any }) => {
  const [movieDetails, setMovieDetails] = useState<IMovie>();
  const [casts, setCasts] = useState<ICast[] | []>([]);
  const [reviews, setReviews] = useState<IReview[] | []>([]);
  const [trailerKey, setTrailerKey] = useState("");
  useEffect(() => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
      };
      const fetchData = async () => {
        //get Details
        const resData = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}?append_to_response=videos`,
          options,
        );
        const detailsData = await resData.json();
        setMovieDetails(detailsData);
        const videos = detailsData.videos.results;
        const trailer = videos.find(
          (video: IVideo) => video.type === "Trailer",
        );
        if (trailer) setTrailerKey(trailer.key);
        //get casts
        const resCasts = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/credits`,
          options,
        );
        const castsData = await resCasts.json();
        setCasts(castsData.cast.slice(0, 10));

        const resReviews = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/reviews`,
          options,
        );
        let reviewsData = await resReviews.json();
        if (reviewsData.results.length > 10) {
          reviewsData = reviewsData.results.slice(0, 10);
        } else {
          reviewsData = reviewsData.results;
        }

        setReviews(reviewsData);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [movieId]);

  return (
    <main className="flex flex-col">
      {movieDetails && casts && reviews && (
        <div className="relative w-full">
          <div
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original${movieDetails.backdrop_path ? movieDetails.backdrop_path : movieDetails.poster_path})`,
            }}
            className="relative h-screen w-full rounded-t-lg bg-cover bg-center bg-no-repeat lg:h-[80vh]"
          >
            <div className="absolute z-10 flex h-screen w-full flex-col items-center rounded-t-lg bg-gradient-to-r from-indigo-800/50 via-[rgb(0,0,0,0.75)] to-indigo-800/50 p-10 md:px-20 lg:h-[80vh]">
              <DetailsCard
                movie={movieDetails}
                trailerKey={trailerKey && trailerKey}
              />
            </div>
          </div>
        </div>
      )}
      {movieDetails && (
        <div className=" w-full rounded-b-lg bg-gradient-to-b from-indigo-950/30 to-indigo-950/60 pb-8">
          {/* CASTS */}
          <div className="z-10 w-full">
            <p className="mb-10 mt-4 text-3xl">
              Cast of {movieDetails.name || movieDetails.title}
            </p>
            <Casts casts={casts} />
          </div>
          {/* VIDEOS */}
          <div className="w-full">
            <p className="mb-10 mt-4 text-3xl">
              Watch {movieDetails.name} videos
            </p>
            <Videos videos={movieDetails.videos.results} />
          </div>
          {/* REVIEWS */}
          <div className="w-full">
            <p className="mb-10 mt-4 text-3xl">
              {movieDetails.name || movieDetails.title} Reviews
            </p>
            <Reviews reviews={reviews} />
          </div>
          {/* Similar */}

          <div className="w-full">
            <p className="mb-10 mt-4 text-3xl">
              {movieDetails.name || movieDetails.title} Similar
            </p>
            <Similar movieId={movieDetails.id} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Movie;
