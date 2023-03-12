"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import loadingIMG from "../../public/no-image.png";

export default function searchResults({ search, reset }) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const router = useRouter();

  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, [search]);

  async function getData() {
    await axios(
      `https://api.themoviedb.org/3/search/multi?api_key=fbacaa2d57976070dd0980f670065cb3&page=1&query=${search}`
    )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="absolute w-[25rem] h-fit max-h-80 right-0 rounded-lg overflow-y-auto top-10 px-2 bg-[#3b4240] customScrollBar grid grid-cols-3 gap-2">
      {data != null &&
        data.results.map((media) =>
          media.poster_path && (media.title || media.name) ? (
            <div
              className=" h-[10rem] text-sm rounded-lg flex items-center justify-center text-center  relative overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out"
              key={media.id}
              onClick={() => {
                router.push(
                  `${media.media_type == "movie" ? "movies" : "tvShows"}/${
                    media.media_type == "movie" ? media.title : media.name
                  }/${media.id}`
                );
                reset("");
              }}
            >
              <div className="absolute text-primary inset-0 z-10 bg-[#1c2a24] bg-opacity-60 font-semibold text-center flex flex-col items-center justify-center text-sm">
                {media.title ? media.title : media.name}
              </div>
              <Image
                src={
                  media.backdrop_path
                    ? imagePath + media.backdrop_path
                    : loadingIMG
                }
                fill
                alt={media.title + " poster"}
                style={{ objectFit: "cover", pointerEvents: "none" }}
                quality={80}
                priority
              />
            </div>
          ) : (
            <></>
          )
        )}
    </div>
  );
}
