"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Card = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export default function mediaCard({ media, category, type }) {
  const router = useRouter();

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <AnimatePresence key={media.id}>
      <motion.div
        variants={Card}
        whileHover={{
          scale: 1.05,
          transition: {
            duration: 0.4,
            ease: "easeInOut",
          },
        }}
        transition={{
          default: { ease: "easeInOut" },
        }}
        className="item h-[10rem] w-[7rem] md:min-h-[15rem] md:min-w-[10rem] bg-card rounded-lg p-1 md:p-2 flex flex-col relative cursor-pointer"
        onClick={() =>
          router.push(
            `/${category}/${
              type == "airingToday" || type == "discover" || type == "trending"
                ? media.name
                : media.title
            }/${media.id}`
          )
        }
      >
        <div className="poster_container w-full h-[85%] relative rounded-lg overflow-hidden">
          <Image
            src={imagePath + media.poster_path}
            fill
            alt={media.title + " poster"}
            style={{ objectFit: "cover", pointerEvents: "none" }}
            quality={80}
            priority
          />
        </div>
        <div className="text-secondary pt-1 font-medium whitespace-nowrap text-xs md:text-base text-ellipsis overflow-hidden max-w-[20rem]">
          {type == "airingToday" || type == "discover" || type == "trending"
            ? media.name
            : media.title}
        </div>

        {type != "upcoming" ? (
          <div className="absolute top-1 right-1 bg-yellow-500 text-xs md:text-base flex flex-row items-center gap-1 py-[2px] md:py-0 px-1 rounded-md">
            <div className="mb-0 md:mb-1">
              {Number(media.vote_average).toFixed(1)}
            </div>
            <AiFillStar className="starIcon" />
          </div>
        ) : (
          <div className="absolute top-1 right-1 bg-yellow-500 flex flex-row items-center gap-1 py-[2px] md:py-0 px-1 rounded-md text-xs md:text-sm font-medium">
            <div className="mb-0 md:mb-1">{media.release_date}</div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
