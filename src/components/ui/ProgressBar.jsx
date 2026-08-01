const ProgressBar = ({
  value = 0,
  max = 100,
  showValue = true,
  size = "md",
  color = "from-cyan-500 to-blue-600",
  className = "",
}) => {
  const percentage = Math.min(
    Math.max((value / max) * 100, 0),
    100
  );

  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={className}>
      {showValue && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Progress
          </span>

          <span className="text-sm font-medium text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div
        className={`
          w-full
          overflow-hidden
          rounded-full
          bg-white/10
          ${heights[size]}
        `}
      >
        <div
          className={`
            h-full
            rounded-full
            bg-linear-to-r
            ${color}
            transition-all
            duration-700
            ease-out
          `}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;