const GlassCard = ({
  children,
  className = "",
  hover = true,
  padding = "p-6",
}) => {
  return (
    <section
      className={`
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        transition-all
        duration-300
        ${padding}
        ${
          hover
            ? "hover:border-cyan-500/30 hover:bg-white/10 hover:-translate-y-1"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </section>
  );
};

export default GlassCard;