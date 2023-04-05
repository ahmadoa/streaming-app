"use client";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const Card = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export default function trending({ trend }) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <AnimatePresence key={trend.id}>
      <motion.div
        variants={Card}
        key={trend.id}
        transition={{
          default: { ease: "easeInOut" },
        }}
        className="sm:h-24 lg:h-full relative CarouselItem transition-all ease-in-out duration-500 rounded-lg overflow-hidden"
      >
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
          <div className="absolute top-1 right-1 py-[1px] md:py-0 bg-yellow-500 flex flex-row items-center gap-1 px-1 rounded-md">
            <div className="text-xs md:text-base">
              {Number(trend.vote_average).toFixed(1)}
            </div>
            <AiFillStar size={15} />
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
