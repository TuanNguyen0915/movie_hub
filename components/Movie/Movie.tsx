"use client";
import { useEffect, useState } from "react";
import DetailsCard from "./DetailsCard";
import { getReleaseDate } from "@/actions/getDate";
import { ICast, IMovie, IReview } from "@/types";
import Casts from "./Casts";
import Reviews from "./Reviews";

const Movie = ({ movieId }: { movieId: any }) => {
  const [movieDetails, setMovieDetails] = useState<IMovie>();
  const [casts, setCasts] = useState<ICast[] | []>([]);
  const [reviews, setReviews] = useState<IReview[] | []>([]);

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
    <main className="h-full w-full">
      {movieDetails && (
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movieDetails.backdrop_path ? movieDetails.backdrop_path : movieDetails.poster_path})`,
          }}
          className="relative mt-10 min-h-screen rounded-lg bg-cover bg-no-repeat"
        >
          <div className="absolute top-0 z-10 flex min-h-screen w-full flex-col gap-5 rounded-lg bg-gradient-to-r from-indigo-800/30 via-[rgb(0,0,0,0.7)] to-indigo-800/30  p-4 backdrop-blur-[1px]">
            <DetailsCard movie={movieDetails} />
            {/* CASTS */}
            <div className="w-full">
              <p className="mb-10 mt-4 text-3xl">
                Cast of {movieDetails.name || movieDetails.title}
              </p>
              <Casts casts={casts} />
            </div>
            {/* REVIEWS */}
            <div className="w-full">
              <p className="mb-10 mt-4 text-3xl">
                {movieDetails.name || movieDetails.title} Reviews
                <Reviews reviews={reviews} />
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Movie;
