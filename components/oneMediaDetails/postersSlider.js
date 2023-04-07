import CarouselWrapper from "../carouselWrapper";
import Poster from "./poster";
import Animate from "../titleAnimation";

export default async function posters({ id, category }) {
  /*Get posters of media*/
  const data = await fetch(
    `https://api.themoviedb.org/3/${category}/${id}/similar?api_key=${process.env.API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  const res = await data.json();

  return (
    <div className="flex flex-col mb-2 md:mb-0">
      {res.results.length > 0 && (
        <Animate>
          <h1 className="mt-2 text-primary font-medium text-base md:text-xl">
            Similar {category == "movie" ? "Movies" : "TVShows"}
          </h1>
          <div className="carouselContainer carousel-scrollbar-hide py-1 md:py-3">
            <CarouselWrapper childType="diff">
              {res.results.map((movie) =>
                movie.backdrop_path != null ? (
                  <Poster post={movie} category={category} key={movie.id} />
                ) : (
                  <></>
                )
              )}
            </CarouselWrapper>
          </div>
        </Animate>
      )}
    </div>
  );
}
