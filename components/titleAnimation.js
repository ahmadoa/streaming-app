"use client";

import { motion, AnimatePresence } from "framer-motion";
import { uuid } from "uuidv4";

export default function TitleAnimation({ children }) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={uuid()}
          transition={{
            default: { ease: "easeInOut" },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
