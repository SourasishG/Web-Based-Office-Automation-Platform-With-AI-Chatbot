const variants = {
  online: {
    color: "bg-emerald-500",
    text: "Online",
  },

  away: {
    color: "bg-amber-500",
    text: "Away",
  },

  busy: {
    color: "bg-red-500",
    text: "Busy",
  },

  offline: {
    color: "bg-slate-500",
    text: "Offline",
  },
};

const StatusIndicator = ({
  status = "offline",
  showLabel = true,
  className = "",
}) => {
  const currentStatus =
    variants[status] || variants.offline;

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        ${className}
      `}
    >
      <span
        className={`
          h-2.5
          w-2.5
          rounded-full
          ${currentStatus.color}
        `}
      />

      {showLabel && (
        <span className="text-sm text-slate-300">
          {currentStatus.text}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;