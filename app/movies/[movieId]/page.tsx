"use client";
import Details from "@/components/Movie/Details";
import { useParams } from "next/navigation";
import React from "react";

const MoviePage = () => {
  const { movieId } = useParams();
  return (
    <div className="w-full">
      <Details movieId={movieId} />
    </div>
  );
};

export default MoviePage;
