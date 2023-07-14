import All from "../../../components/movies/latestall";
import { useState } from "react";

export const metadata = {
  title: "All latest movies",
};

async function getData(page)
{
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } }
  );
  
  if (!data.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return data.json();
}

export default async function latestMoviesAll() {
  let currentPage = 1;

  const data = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=${currentPage}`,
    { next: { revalidate: 3600 } }
  );
  const res = await data.json();
  const category = "movies";
  const type = "latest";

  let totalPages = res.total_pages;
  return (
    <div className="w-full h-fit overflow-y-auto overflow-x-hidden">
      <All />
    </div>
  );
}
