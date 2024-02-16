"use client";
import Movie from "@/components/Movie/Movie";
import { useParams } from "next/navigation";
import React from "react";

const MoviePage = () => {
  const { movieId } = useParams();
  return <Movie movieId={movieId} />;
};

export default MoviePage;
