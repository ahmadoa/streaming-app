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
  const todayDate = new Date();
  const releaseDate = new Date(media.release_date);

  const imagePath = "https://image.tmdb.org/t/p/original";

  if (releaseDate > todayDate && type === "upcoming") {
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
          className="item min-h-[15rem] min-w-[10rem] bg-card rounded-lg p-2 flex flex-col relative cursor-pointer"
          onClick={() => router.push(`/${category}/${media.id}`)}
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
          <div className="text-secondary pt-1 font-medium whitespace-nowrap text-ellipsis overflow-hidden max-w-[20rem]">
            {media.title}
          </div>

          {type != "upcoming" ? (
            <div className="absolute top-1 right-1 bg-yellow-500 flex flex-row items-center gap-1 px-1 rounded-md">
              <div className="mb-1">
                {Number(media.vote_average).toFixed(1)}
              </div>
              <AiFillStar size={17} />
            </div>
          ) : (
            <div className="absolute top-1 right-1 bg-yellow-500 flex flex-row items-center gap-1 px-1 rounded-md text-sm font-medium">
              <div className="mb-1">{media.release_date}</div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  } else if (type != "upcoming") {
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
          className="item min-h-[15rem] min-w-[10rem] bg-card rounded-lg p-2 flex flex-col relative cursor-pointer"
          onClick={() => router.push(`/${category}/${media.id}`)}
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
          <div className="text-secondary pt-1 font-medium whitespace-nowrap text-ellipsis overflow-hidden max-w-[20rem]">
            {type == "airingToday" || type == "discover" || type == "trending"
              ? media.name
              : media.title}
          </div>

          {type != "upcoming" ? (
            <div className="absolute top-1 right-1 bg-yellow-500 flex flex-row items-center gap-1 px-1 rounded-md">
              <div className="mb-1">
                {Number(media.vote_average).toFixed(1)}
              </div>
              <AiFillStar size={17} />
            </div>
          ) : (
            <div className="absolute top-1 right-1 bg-yellow-500 flex flex-row items-center gap-1 px-1 rounded-md text-sm font-medium">
              <div className="mb-1">{media.release_date}</div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  }
}
