"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Card = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export default function posterSlider({ post, category }) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const router = useRouter();
  
  return (
    <AnimatePresence key={post.id}>
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
        className="item min-h-[9rem] min-w-[14rem] rounded-lg brightness-[0.8] relative cursor-pointer overflow-hidden"
        onClick={() =>
          router.push(
            `/${category == "movie" ? "movies" : "tvShows"}/${
              post.name ? post.name : post.title
            }/${post.id}`
          )
        }
      >
        <div className="absolute text-primary inset-0 z-10 bg-[#03100c] opacity-0 hover:opacity-100 bg-opacity-90 duration-300 font-semibold text-center flex flex-col items-center justify-center text-sm">
          {category == "movie" ? post.title : post.name}
        </div>
        <Image
          src={imagePath + post.backdrop_path}
          fill
          alt={post.title + " poster"}
          style={{ objectFit: "cover", pointerEvents: "none" }}
          quality={80}
          priority
        />
      </motion.div>
    </AnimatePresence>
  );
}
