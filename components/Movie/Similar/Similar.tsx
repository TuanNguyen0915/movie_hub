"use client";
import { getSimilar } from "@/actions/getMoviesData";
import HeroCard from "@/components/Hero/HeroCard";
import { IMovie } from "@/types/types";
import React, { useEffect, useState } from "react";

const Similar = ({ movieId }: { movieId: number | any }) => {
  const [movies, setMovies] = useState<IMovie[]>();
  useEffect(() => {
    const fetchData = async () => {
      const resData = await getSimilar(movieId);
      setMovies(resData);
    };
    fetchData();
  }, [movieId]);

  return <>{movies && <HeroCard trending={movies} />}</>;
};

export default Similar;
