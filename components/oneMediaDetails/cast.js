"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Card = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export default function posterSlider({ actor }) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <AnimatePresence key={actor.id}>
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
        className="castItem h-10 w-10 md:h-14 md:w-14 rounded-full brightness-[0.8] relative cursor-pointer overflow-hidden"
      >
        <Image
          src={imagePath + actor.profile_path}
          fill
          alt={actor.name + " picture"}
          style={{ objectFit: "cover", pointerEvents: "none" }}
          quality={80}
          priority
        />
      </motion.div>
    </AnimatePresence>
  );
}
