import CarouselWrapper from "../carouselWrapper";
import Cast from "./cast";
import Animate from "../titleAnimation";

export default async function posters({ data }) {
  return (
    <div className="w-full flex flex-col">
      <Animate>
        <h1 className="mt-2 text-primary font-medium text-base md:text-xl">
          Cast
        </h1>

        <div className="bg-primary md:bg-[#061509] bg-opacity-20 md:bg-opacity-70 carouselContainer carousel-scrollbar-hide py-[2px] md:py-1 mt-1 md:mt-2 rounded-full">
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
