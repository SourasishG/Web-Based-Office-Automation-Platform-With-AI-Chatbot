import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlassButton } from "../../components/ui/GlassButton";

/**
 * NotFound - Premium 404 Error Page
 * Displays a topographic dark background, massive serif 404, and a matching primary theme button.
 */
export const NotFound = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#090d16] text-white flex flex-col items-center justify-center p-6 select-none">
      {/* Topographic Organic Wave Lines SVG Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <svg
          className="absolute -top-20 -left-20 w-[140%] h-[140%] text-white/10"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 200 C200 100, 400 400, 700 200 C900 100, 1100 300, 1200 200"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M-100 350 C150 250, 450 500, 750 300 C950 200, 1050 450, 1200 350"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M-100 500 C100 400, 500 650, 800 450 C1000 350, 1100 600, 1200 500"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M-100 650 C250 550, 550 800, 850 600 C1050 500, 1150 750, 1200 650"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M-100 800 C300 700, 600 950, 900 750 C1100 650, 1200 900, 1300 800"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Top-Right Topographic Concentric Contour Shapes */}
          <g transform="translate(650, -100) scale(1.4)">
            <path
              d="M100,100 Q150,50 200,100 T300,100 T400,150 T450,250 T400,350 T300,400 T200,350 T100,250 Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M120,120 Q160,80 200,120 T280,120 T370,160 T410,240 T370,320 T280,360 T200,320 T120,240 Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M140,140 Q170,110 200,140 T260,140 T340,180 T370,230 T340,300 T260,330 T200,300 T140,230 Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M160,160 Q180,140 200,160 T240,160 T310,200 T330,230 T310,280 T240,300 T200,280 T160,230 Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
          </g>

          {/* Bottom-Left Topographic Concentric Contour Shapes */}
          <g transform="translate(-150, 450) scale(1.6)">
            <path
              d="M100,100 Q150,50 200,100 T300,100 T400,150 T450,250 T400,350 T300,400 T200,350 T100,250 Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M120,120 Q160,80 200,120 T280,120 T370,160 T410,240 T370,320 T280,360 T200,320 T120,240 Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
        {/* Massive Serif 404 Display */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif text-[120px] sm:text-[180px] md:text-[240px] font-normal leading-none tracking-tight text-white select-none drop-shadow-2xl"
        >
          404
        </motion.h1>

        {/* Serif Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="font-serif text-lg sm:text-2xl md:text-3xl text-slate-200 font-normal tracking-wide mt-2 mb-10 drop-shadow"
        >
          The page you’re looking for doesn’t exist
        </motion.p>

        {/* System Theme Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Link to="/">
            <GlassButton
              variant="primary"
              size="md"
              className="font-mono font-bold tracking-widest text-xs uppercase"
            >
              RETURN TO HOME
            </GlassButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
