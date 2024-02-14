"use client";
import { IMovie } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IProps {
  movie: IMovie;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
}

const Details = ({ movie, setShowDetails }: IProps) => {
  const [movieDetails, setMovieDetails] = useState(null);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
          },
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movie.id}?append_to_response=videos`,
          options,
        );
        const data = await res.json();
        setMovieDetails(data);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [movie.id]);

  return (
    <div className="relative z-10 flex h-screen w-screen items-center justify-center bg-black">
    </div>
  );
};

export default Details;
