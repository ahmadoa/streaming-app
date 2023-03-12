import CarouselWrapper from "../carouselWrapper";
import Cast from "./cast";
import Animate from "../titleAnimation";

export default async function posters({ data }) {
  return (
    <div className="w-full flex flex-col">
      <Animate>
        <h1 className="mt-2 text-secondary font-medium text-xl">Cast</h1>

        <div className="bg-[#061509] bg-opacity-70 carouselContainer carousel-scrollbar-hide p-1 mt-2  rounded-full">
          <CarouselWrapper childType="cast">
            {data.cast.map((actor) =>
              actor.profile_path != null ? (
                <Cast actor={actor} key={actor.id} />
              ) : (
                <></>
              )
            )}
          </CarouselWrapper>
        </div>
      </Animate>
    </div>
  );
}
