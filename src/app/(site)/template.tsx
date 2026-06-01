"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Page transition wrapper. A `template` re-mounts on every navigation, so each
 * route fades and lifts in smoothly — a polished page-transition effect.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
