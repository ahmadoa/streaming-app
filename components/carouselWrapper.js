"use client";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function carouselWrapper({ children, childType }) {
  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0 }}
        key={childType}
        transition={{
          default: { ease: "easeInOut" },
        }}
        className={
          childType != "cast"
            ? `h-full slider flex gap-5 flex-nowrap`
            : `h-full slider flex gap-2 flex-nowrap`
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
