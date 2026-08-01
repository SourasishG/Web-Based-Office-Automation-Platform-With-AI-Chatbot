const variants = {
  success:
    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",

  warning:
    "bg-amber-500/15 text-amber-400 border border-amber-500/30",

  danger:
    "bg-red-500/15 text-red-400 border border-red-500/30",

  info:
    "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",

  purple:
    "bg-purple-500/15 text-purple-400 border border-purple-500/30",

  gray:
    "bg-white/5 text-slate-300 border border-white/10",
};

const Badge = ({
  children,
  variant = "gray",
  className = "",
}) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        transition-all
        duration-300
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;