import CarouselWrapper from "../carouselWrapper";
import Poster from "./poster";

export default async function posters({ id, category }) {
  /*Get posters of media*/
  const data = await fetch(
    `https://api.themoviedb.org/3/${category}/${id}/similar?api_key=${process.env.API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  const res = await data.json();

  return (
    <div className="flex flex-col">
      <h1 className="mt-2 text-secondary font-medium text-xl">
        Similar {category == "movie" ? "Movies" : "TVShows"}
      </h1>
      <div className="carouselContainer carousel-scrollbar-hide py-3">
        <CarouselWrapper childType="diff">
          {res.results.map((movie) => (
            <Poster post={movie} category={category} key={movie.id} />
          ))}
        </CarouselWrapper>
      </div>
    </div>
  );
}
