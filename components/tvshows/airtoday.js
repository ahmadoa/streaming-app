import MediaCard from "../mediaCard";
import CarouselWrapper from "../carouselWrapper";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Animation from "../titleAnimation";

export default async function AiringToday() {
  const data = await fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 3600 } }
  );
  const res = await data.json();
  const category = "tvShows";
  const type = "airingToday";

  return (
    <div className="flex flex-col">
      <Animation>
        <div className="flex flex-row justify-between">
          <h1 className="h-[5%] mt-6 text-white font-semibold text-xl">
            Airing Today
          </h1>
          <div className="h-[5%] mt-6 mr-10 text-secondary transition-all duration-300 ease-in-out hover:scale-[1.1] hover:cursor-pointer font-semibold flex flex-row items-center justify-center">
            <div className="mb-1">see more</div>
            <MdOutlineKeyboardDoubleArrowRight
              size={20}
              className="fill-secondary"
            />
          </div>
        </div>
      </Animation>

      <div className="carouselContainer carousel-scrollbar-hide py-4">
        <CarouselWrapper childType="diff">
          {res.results.map((movie) => (
            <MediaCard
              media={movie}
              key={movie.id}
              category={category}
              type={type}
            />
          ))}
        </CarouselWrapper>
      </div>
    </div>
  );
}
