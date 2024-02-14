"use client";
import { useEffect, useState } from "react";
import DetailsCard from "./DetailsCard";
import { getReleaseDate } from "@/actions/getReleaseDate";
import { ICast, IMovie } from "@/types";
import Casts from "./Casts";



const Details = ({ movieId }: { movieId: any }) => {
  const [movieDetails, setMovieDetails] = useState<IMovie>();
  const [releaseDate, setReleaseDate] = useState("");
  const [casts, setCasts] = useState<ICast[] | []>([]);
  const [reviews, setReviews] = useState([]);

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
        // get releaseDate
        const resRelease = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/release_dates`,
          options,
        );
        const dateData = await resRelease.json();
        const formatDate = getReleaseDate(dateData);
        setReleaseDate(formatDate.toString());
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
        const reviewsData = await resReviews.json();
        setReviews(reviewsData.results);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [movieId]);
  return (
    <>
      {movieDetails && (
        <main className="flex flex-col gap-10">
          <DetailsCard
            movie={movieDetails}
            releaseDate={releaseDate}
          />
          {/* CASTS */}
          <div className="w-full">
            <p className="mb-10 mt-4 text-3xl">
              Cast of {movieDetails.name || movieDetails.title}
            </p>
            <Casts casts={casts} />
          </div>
        </main>
      )}
    </>
  );
};

export default Details;
