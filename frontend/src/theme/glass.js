export const glass = {
  // Apple Liquid Glass Surface Variants
  surface: {
    flat: "bg-slate-950/40 backdrop-blur-xl border border-white/5",
    standard: "bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50",
    floating: "bg-slate-900/50 backdrop-blur-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)]",
    inset: "bg-slate-950/60 backdrop-blur-md border border-white/5 shadow-inner",
    interactive: "bg-slate-900/40 hover:bg-slate-800/50 backdrop-blur-2xl border border-white/10 hover:border-white/20 transition-all duration-300",
  },

  // Specular Highlights (Top edge light reflection)
  specular: {
    subtle: "before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
    bright: "before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
    accent: "before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-cyan-400/50 before:to-transparent",
  },

  // Dynamic Liquid Reflection Sweeps
  reflection: "after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:pointer-events-none",
};