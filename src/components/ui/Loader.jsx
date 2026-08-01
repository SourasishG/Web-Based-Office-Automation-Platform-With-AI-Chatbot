const sizes = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4",
};

const Loader = ({
  size = "md",
  text,
  fullScreen = false,
  className = "",
}) => {
  const content = (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-4
        ${className}
      `}
    >
      <div
        className={`
          animate-spin
          rounded-full
          border-cyan-500
          border-t-transparent
          ${sizes[size]}
        `}
      />

      {text && (
        <p className="text-sm text-slate-400">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-black
        "
      >
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;