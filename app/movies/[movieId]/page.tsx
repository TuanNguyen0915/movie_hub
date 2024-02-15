"use client";
import Details from "@/components/Movie/Movie";
import { useParams } from "next/navigation";
import React from "react";

const MoviePage = () => {
  const { movieId } = useParams();
  return <Details movieId={movieId} />;
};

export default MoviePage;
