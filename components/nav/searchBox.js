"use client";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import SearchResults from "./searchResults";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  return (
    <div className="absolute top-[1.6rem] md:top-8 right-[3.25rem] md:right-10 w-44 md:w-72 h-7 md:h-8 flex-nowrap bg-white rounded-lg md:rounded-xl px-2 flex-row justify-center">
      <input
        type={"text"}
        placeholder="Find Movies, TV Shows..."
        className="w-[90%] h-full text-xs md:text-sm border-hidden outline-none text-black"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <BiSearch className="fill-black inline-flex searchIcon" />
      <SearchResults search={query} reset={setQuery} />
    </div>
  );
}
