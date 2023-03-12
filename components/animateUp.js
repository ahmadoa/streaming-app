"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function animateUp({ children }) {
  const uniq = Math.random().toString(36).substring(2, 7);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 70 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        key={uniq}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
