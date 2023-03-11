import CarouselWrapper from "../carouselWrapper";
import Cast from "./cast";

export default async function posters({ id, category }) {
  /*Get posters of media*/
  const data = await fetch(
    `https://api.themoviedb.org/3/${category}/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  const res = await data.json();

  return (
    <div className="w-full flex flex-col">
      <h1 className="mt-2 text-secondary font-medium text-xl">Cast</h1>
      <div className="bg-[#061509] bg-opacity-70 carouselContainer carousel-scrollbar-hide p-1 mt-2  rounded-full">
        <CarouselWrapper childType="cast">
          {res.cast.map((actor) =>
            actor.profile_path != null ? <Cast actor={actor} /> : <></>
          )}
        </CarouselWrapper>
      </div>
    </div>
  );
}
