import MediaCard from "../mediaCard";
import CarouselWrapper from "../carouselWrapper";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Animation from "../titleAnimation";

export default async function Popular() {
  const data = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1&sort_by=popularity.desc`,
    { next: { revalidate: 3600 } }
  );
  const res = await data.json();
  const category = "tvShows";
  const type = "discover";

  return (
    <div className="flex flex-col">
      <Animation>
        <div className="flex flex-row justify-between items-center">
          <h1 className="h-[5%] mt-4 md:mt-6 text-white font-semibold text-base md:text-xl">
            Popular
          </h1>
          <div className="h-[5%] mt-6 mr-3 md:mr-10 text-secondary transition-all duration-300 ease-in-out hover:scale-[1.1] hover:cursor-pointer font-medium md:font-semibold flex flex-row items-center justify-center">
            <div className="mb-0 md:mb-1 text-xs md:text-base">see more</div>
            <MdOutlineKeyboardDoubleArrowRight className="fill-secondary nextIcon" />
          </div>
        </div>
      </Animation>
      <div className="carouselContainer carousel-scrollbar-hide py-2 md:py-4">
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
