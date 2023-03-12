"use client";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import SearchResults from "./searchResults";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  return (
    <div className="absolute top-8 right-10 w-72 h-8 bg-white rounded-xl px-2 flex-row justify-center">
      <input
        type={"text"}
        placeholder="Find Movies, TV Shows..."
        className="w-[90%] h-full text-sm border-hidden outline-none text-black"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <BiSearch className="fill-black inline-flex" size={20} />
      <SearchResults search={query} reset={setQuery} />
    </div>
  );
}
