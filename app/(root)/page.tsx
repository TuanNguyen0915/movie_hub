"use client"
import { fetchGenresMovies } from "@/actions/getMoviesData";
import MoviesByGenres from "@/components/Genres/MoviesByGenres";
import Hero from "@/components/Hero/Hero";
import { IGenre } from "@/types/types";
import { useEffect, useState } from "react";

const Home = () => {
 
  return (
    <main className="flex flex-col gap-10 text-white">
      <Hero />
      <MoviesByGenres />
    </main>
  );
};

export default Home;
