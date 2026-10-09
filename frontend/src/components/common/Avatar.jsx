const sizes = {
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-16 w-16 text-xl",
};

const Avatar = ({
  name = "User",
  src,
  size = "md",
  online = false,
  className = "",
}) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`
        relative
        inline-flex
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className={`
            ${sizes[size]}
            rounded-full
            object-cover
            border
            border-white/10
          `}
        />
      ) : (
        <div
          className={`
            ${sizes[size]}
            flex
            items-center
            justify-center
            rounded-full
            bg-linear-to-br
            from-cyan-500
            to-blue-600
            font-semibold
            text-white
            border
            border-white/10
          `}
        >
          {initials}
        </div>
      )}

      {online && (
        <span
          className="
            absolute
            bottom-0
            right-0
            h-3.5
            w-3.5
            rounded-full
            border-2
            border-slate-950
            bg-emerald-500
          "
        />
      )}
    </div>
  );
};

export default Avatar;