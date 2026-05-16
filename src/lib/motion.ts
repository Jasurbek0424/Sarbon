import type { Transition } from "framer-motion";

export const easeOutSubtle: Transition["ease"] = [0.22, 1, 0.36, 1];

export const chipSpring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 26,
  mass: 0.6,
};
