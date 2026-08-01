const variants = {
  primary:
    "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90",

  secondary:
    "border border-white/10 bg-white/5 text-white hover:bg-white/10",

  success:
    "bg-emerald-500 text-white hover:bg-emerald-600",

  danger:
    "bg-red-500 text-white hover:bg-red-600",

  ghost:
    "text-slate-300 hover:bg-white/10 hover:text-white",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-4 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  icon,
  ...props
}) => {
  const Icon = icon;

  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        font-medium
        transition-all
        duration-300
        hover:scale-[1.02]
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <div
            className="
              h-4
              w-4
              animate-spin
              rounded-full
              border-2
              border-white/30
              border-t-white
            "
          />

          Loading...
        </>
      ) : (
        <>
          {Icon && <Icon size={18} />}

          {children}
        </>
      )}
    </button>
  );
};

export default Button;