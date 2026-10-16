const CalendarDay = ({
  day,
  isToday,
  isSelected,
  hasEvent,
  onClick,
}) => {
  if (!day) {
    return <div className="h-10 w-10" />;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? "bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105 ring-2 ring-cyan-300"
            : isToday
            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm font-bold"
            : "text-slate-200 hover:bg-white/10 hover:text-white border border-transparent"
        }
      `}
    >
      <div className="relative flex flex-col items-center">
        <span>{day}</span>

        {hasEvent && !isSelected && (
          <span
            className={`
              absolute -bottom-1.5 h-1.5 w-1.5 rounded-full
              ${isToday ? "bg-cyan-300" : "bg-emerald-400"}
              shadow-[0_0_6px_rgba(52,211,153,0.8)]
            `}
          />
        )}
        {hasEvent && isSelected && (
          <span className="absolute -bottom-1.5 h-1.5 w-1.5 rounded-full bg-slate-900" />
        )}
      </div>
    </button>
  );
};

export default CalendarDay;