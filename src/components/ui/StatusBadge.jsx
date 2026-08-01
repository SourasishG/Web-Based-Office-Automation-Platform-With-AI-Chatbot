const statusStyles = {
  Active: "bg-cyan-500/20 text-cyan-400",
  Upcoming: "bg-blue-500/20 text-blue-400",
  Ongoing: "bg-green-500/20 text-green-400",
  Completed: "bg-emerald-500/20 text-emerald-400",
  Cancelled: "bg-red-500/20 text-red-400",
  Pending: "bg-yellow-500/20 text-yellow-400",
  Review: "bg-purple-500/20 text-purple-400",
  Draft: "bg-slate-500/20 text-slate-300",
  Archived: "bg-gray-500/20 text-gray-400",
};

const StatusBadge = ({
  status,
  className = "",
}) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${statusStyles[status] || "bg-slate-500/20 text-slate-300"}
        ${className}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;