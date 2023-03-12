import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import SimilarMovies from "@/components/oneMediaDetails/postersSlider";
import Cast from "@/components/oneMediaDetails/castSlider";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/app/loading";
import AnimateUp from "@/components/animateUp";

/*get only year from release date*/
function getYear(string) {
  return string.slice(0, 4);
}

function closestDate(obj) {
  // Get the current date as a Date object
  let currentDate = new Date();

  // Initialize a variable to store the closest date and its difference
  let closest = null;
  let minDiff = Infinity;

  // Loop through each result of mapping through obj
  for (let result of obj) {
    if (
      result.site == "YouTube" &&
      result.type == "Trailer" &&
      result.official == true
    ) {
      let date = new Date(result.published_at);

      // Calculate the absolute difference between the current date and the date property in milliseconds
      let diff = Math.abs(currentDate - date);

      // If the difference is smaller than the minimum difference, update the closest date and its difference
      if (diff < minDiff) {
        closest = result;
        minDiff = diff;
      }
    }
    // Convert the date property to a Date object
  }
  // Return the closest date or null if obj is empty
  return closest;
}

export default async function tvShow({ params }) {
  /*Get id of the tvshow*/
  let path = String(params.id);
  const tvID = path.slice(path.indexOf(",") + 1);

  /*Note: title of page not set*/

  /*Get data of the tvshow*/
  const data = await fetch(
    `https://api.themoviedb.org/3/tv/${tvID}?api_key=${process.env.API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  const res = await data.json();

  /*Get posters of tvshow*/
  const posterData = await fetch(
    `https://api.themoviedb.org/3/tv/${tvID}/credits?api_key=${process.env.API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  const resData = await posterData.json();

  /*get trailers of tvshow*/
  const TrailerData = await fetch(
    `https://api.themoviedb.org/3/tv/${tvID}/videos?api_key=${process.env.API_KEY}&language=en-US`
  );
  const TrailerDataRes = await TrailerData.json();

  /*images path start*/
  const imagePath = "https://image.tmdb.org/t/p/original";

  /*youtube path*/
  const youtubePath = "https://www.youtube.com/watch?v=";

  /*get the latest dropped trailer of tvshow*/
  const Trailer = closestDate(TrailerDataRes.results);

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full h-full flex flex-col overflow-hidden relative">
        <div className="w-full h-full after:vignette filter brightness-75 rounded-tl-3xl rounded-tr-3xl relative overflow-hidden">
          <Image
            src={imagePath + res.backdrop_path}
            fill
            alt={res.backdrop_path + " poster"}
            style={{ objectFit: "cover", pointerEvents: "none" }}
            quality={80}
            priority
          />
        </div>

        {res && (
          <div className="w-full h-full flex flex-col justify-between ml-10 absolute top-0 py-5">
            {/*details of tvshow section*/}
            <AnimateUp>
              <div className="w-full flex flex-row">
                <div className="overview w-[60%] flex flex-col">
                  <div className="font-bold text-3xl text-secondary mb-5">
                    {res.name}
                  </div>
                  <div className="flex flex-row justify-between mb-3">
                    <div className="flex flex-row items-center text-secondary">
                      <AiFillStar
                        size={21}
                        className="fill-yellow-500 pr-1 -mb-1"
                      />
                      <div className="text-lg font-medium pr-1">
                        {Number(res.vote_average).toFixed(1)}
                      </div>
                      |<div className="pl-1">{res.vote_count}</div>
                    </div>
                    <div className="flex flex-row items-center justify-center pr-5 text-neutral-200">
                      <div>
                        {res.genres.map((genre, i) => {
                          if (i + 1 === res.genres.length) {
                            return <span key={genre.id}>{genre.name}</span>;
                          } else {
                            return (
                              <span key={genre.id}>{genre.name + ", "}</span>
                            );
                          }
                        })}
                      </div>
                      <div className="scale-[2.5] mb-1 mx-2">&#183;</div>
                      <div>{getYear(res.first_air_date)}</div>
                    </div>
                  </div>
                  <div className="text-sm text-neutral-300">{res.overview}</div>
                </div>
                {Trailer != null && (
                  <div className="w-[40%] flex flex-col text-white items-end mr-20">
                    <Link
                      href={youtubePath + Trailer.key}
                      target="_blank"
                      className="bg-primary font-medium px-4 py-2 rounded-xl w-min whitespace-nowrap hover:scale-110 duration-300 ease-in-out transition-all"
                    >
                      Watch Trailer
                    </Link>
                  </div>
                )}
              </div>
            </AnimateUp>
            {/*cast component*/}
            {resData.cast.length > 0 && (
              <div className="w-fit max-w-[50%] flex flex-col">
                <div className="w-full">
                  <Cast data={resData} />
                </div>
              </div>
            )}
            {/*similar tvShows Section*/}
            <div className="w-full flex flex-row">
              <div className="w-full">
                <SimilarMovies id={tvID} category="tv" />
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
