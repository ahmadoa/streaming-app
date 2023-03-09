import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

export default function trending({ trend }) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className="h-full relative CarouselItem transition-all ease-in-out duration-500 rounded-lg overflow-hidden">
      <Link
        href={
          trend.media_type == "movie"
            ? `/${trend.media_type}s/${trend.id}`
            : `/${trend.media_type}Shows/${trend.id}`
        }
      >
        <img
          src={imagePath + trend.poster_path}
          className="h-full w-full bg-cover"
        />
        <div className="absolute top-1 right-1 bg-yellow-500 flex flex-row items-center gap-1 px-1 rounded-md">
          <div>{Number(trend.vote_average).toFixed(1)}</div>
          <AiFillStar size={17} />
        </div>
      </Link>
    </div>
  );
}
