import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import SimilarMovies from "@/components/oneMediaDetails/postersSlider";
import Cast from "@/components/oneMediaDetails/castSlider";
import Link from "next/link";

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

  /*get trailers of movie*/
  const TrailerData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${process.env.API_KEY}&language=en-US`
  );
  const TrailerDataRes = await TrailerData.json();

  /*images path start*/
  const imagePath = "https://image.tmdb.org/t/p/original";

  /*youtube*/
  const youtubePath = "https://www.youtube.com/watch?v=";

  const Trailer = closestDate(TrailerDataRes.results);

  return (
    <div className="w-full h-full overflow-hidden relative">
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

      <div className="w-full flex flex-col ml-10 absolute top-5">
        <div className="w-full flex flex-row">
          <div className="overview w-[50%] flex flex-col">
            <div className="font-bold text-3xl text-secondary mb-5">
              {res.title}
            </div>
            <div className="flex flex-row justify-between mb-3">
              <div className="flex flex-row items-center text-secondary">
                <AiFillStar size={21} className="fill-yellow-500 pr-1 -mb-1" />
                <div className="text-lg font-medium pr-1">
                  {Number(res.vote_average).toFixed(1)}
                </div>
                |<div className="pl-1">{res.vote_count}</div>
              </div>
              <div className="flex flex-row items-center justify-center pr-5 text-neutral-200">
                <div>{time_convert(res.runtime)}</div>
                <div className="scale-[2.5] mb-1 mx-2">&#183;</div>
                <div>
                  {res.genres.map((genre, i) => {
                    if (i + 1 === res.genres.length) {
                      return <span key={genre.id}>{genre.name}</span>;
                    } else {
                      return <span key={genre.id}>{genre.name + ", "}</span>;
                    }
                  })}
                </div>
                <div className="scale-[2.5] mb-1 mx-2">&#183;</div>
                <div>{getYear(res.release_date)}</div>
              </div>
            </div>
            <div className="text-sm text-neutral-300">{res.overview}</div>
          </div>
          <div className="w-[50%] flex flex-col text-white items-end mr-20">
            <Link
              href={youtubePath + Trailer.key}
              target="_blank"
              className="bg-primary font-medium px-4 py-2 rounded-xl w-min whitespace-nowrap hover:scale-110 duration-300 ease-in-out transition-all"
            >
              Watch Trailer
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col mt-4">
          <div className="w-[50%]">
            <Cast id={movieID} category="movie" />
          </div>
        </div>
      </div>
      <div className="flex flex-row ml-10 absolute bottom-5">
        <div className="w-full">
          <SimilarMovies id={movieID} category="movie" />
        </div>
      </div>
    </div>
  );
}
