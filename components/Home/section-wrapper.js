"use client";
import { motion, AnimatePresence } from "framer-motion";
import { uuid } from "uuidv4";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SectionWrapper({ children }) {
  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0 }}
        key={uuid}
        transition={{
          default: { ease: "easeInOut" },
        }}
        className="h-full carouse flex gap-5 flex-nowrap"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
