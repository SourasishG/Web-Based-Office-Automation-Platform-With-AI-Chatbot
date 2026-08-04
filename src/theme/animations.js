export const animations = {
  // Apple Liquid Glass Physics (Framer Motion springs)
  spring: {
    gentle: { type: "spring", stiffness: 120, damping: 14, mass: 0.8 },
    snappy: { type: "spring", stiffness: 300, damping: 22, mass: 0.5 },
    bouncy: { type: "spring", stiffness: 400, damping: 18, mass: 0.6 },
    float: { type: "spring", stiffness: 80, damping: 12, mass: 1 },
  },

  // Motion Variants
  cardHover: {
    rest: { y: 0, scale: 1 },
    hover: { y: -4, scale: 1.015 },
    tap: { y: -1, scale: 0.985 },
  },

  floating: {
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};