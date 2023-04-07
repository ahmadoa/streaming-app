import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import SimilarMovies from "@/components/oneMediaDetails/postersSlider";
import Cast from "@/components/oneMediaDetails/castSlider";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/app/loading";
import AnimateUp from "@/components/animateUp";

/*turn runtime of movie into hours + minutes*/
function time_convert(num) {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  return hours + "h " + minutes + "m";
}

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

export default async function Movie({ params }) {
  /*Get id of the movie*/
  let path = String(params.id);
  const movieID = path.slice(path.indexOf(",") + 1);

  /*Note: title of page not set*/

  /*Get data of the movie*/
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  const res = await data.json();

  /*Get posters of media*/
  const posterData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  const resData = await posterData.json();

  /*get trailers of movie*/
  const TrailerData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${process.env.API_KEY}&language=en-US`
  );
  const TrailerDataRes = await TrailerData.json();

  /*images path start*/
  const imagePath = "https://image.tmdb.org/t/p/original";

  /*youtube*/
  const youtubePath = "https://www.youtube.com/watch?v=";

  /*get the latest dropped trailer of tvshow*/
  const Trailer = closestDate(TrailerDataRes.results);

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full  min-h-full flex overflow-y-auto overflow-x-hidden md:overflow-hidden relative">
        <div
          className="w-full md:h-full h-40 absolute top-0 left-0 md:after:vignette bg-cover bg-center filter brightness-50 md:brightness-75 rounded-2xl md:rounded-tl-3xl md:rounded-tr-3xl overflow-hidden"
          style={{
            backgroundImage: `url(${imagePath + res.backdrop_path})`,
          }}
        ></div>

        {res && (
          <div className="flex flex-col justify-between pl-3 md:pl-10 absolute top-0  left-0 right-0 bottom-0 py-2 md:py-5 gap-3 md:gap-0">
            {/*details of movie section*/}
            <AnimateUp>
              <div className="w-full flex flex-col gap-3 md:gap-0">
                <div className="w-full flex flex-row justify-between items-center">
                  <div className="font-bold text-xl md:text-3xl text-secondary">
                    {res.title}
                  </div>
                  {Trailer != null && (
                    <Link
                      href={youtubePath + Trailer.key}
                      target="_blank"
                      className="bg-primary text-white text-xs md:text-base font-medium px-2 md:px-4 py-1 md:py-2 rounded-md md:rounded-xl w-min whitespace-nowrap hover:scale-110 duration-300 ease-in-out transition-all mr-3 md:mr-10"
                    >
                      Watch Trailer
                    </Link>
                  )}
                </div>
                <div className="w-full md:w-[60%] flex flex-col md:flex-row mb-3">
                  <div className="flex flex-row items-center text-secondary">
                    <AiFillStar className="fill-yellow-500 starMVTV pr-1 mb-0 selection:md:-mb-1" />
                    <div className="text-xs md:text-lg font-medium pr-1">
                      {Number(res.vote_average).toFixed(1)}
                    </div>
                    |
                    <div className="text-xs md:text-base pl-1">
                      {res.vote_count}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center ml-0 md:ml-5 mt-1 md:mt-0 text-neutral-300 text-xs md:text-base">
                    <div className="flex flex-row">
                      <span className="block md:hidden pr-2 font-medium text-primary">
                        Duration :
                      </span>
                      {time_convert(res.runtime)}
                    </div>
                    <div className="scale-[2.5] hidden md:flex mb-1 mx-1 md:mx-2">
                      &#183;
                    </div>
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
                    <div className="scale-[2.5] hidden md:flex  mb-1 mx-1 md:mx-2">
                      &#183;
                    </div>
                    <div className="flex flex-row">
                      <span className="block md:hidden pr-2 font-medium text-primary">
                        Release year :
                      </span>
                      {getYear(res.release_date)}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[60%] pr-3 md:pr-0 text-sm text-neutral-300">
                  {res.overview}
                </div>
              </div>
            </AnimateUp>
            {/*cast component*/}
            {resData.cast.length > 0 && (
              <div className="w-fit max-w-[70%] md:max-w-[50%] flex flex-col">
                <div className="w-full">
                  <Cast data={resData} />
                </div>
              </div>
            )}

            {/*similar movies section*/}
            <div className="w-full flex flex-row">
              <div className="w-full">
                <SimilarMovies id={movieID} category="movie" />
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
