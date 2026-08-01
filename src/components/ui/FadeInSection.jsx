import { motion } from "framer-motion";

const FadeInSection = ({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  once = true,
  className = "",
}) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once,
        amount: 0.2,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;