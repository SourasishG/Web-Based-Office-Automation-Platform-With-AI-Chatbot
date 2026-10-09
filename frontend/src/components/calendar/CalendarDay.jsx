const CalendarDay = ({
  day,
  isToday,
  hasEvent,
}) => {
  return (
    <button
      type="button"
      className={`
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        text-sm
        font-medium
        transition-all
        ${
          isToday
            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
            : "text-slate-300 hover:bg-white/10"
        }
      `}
    >
      <div className="relative">
        {day}

        {hasEvent && !isToday && (
          <span
            className="
              absolute
              -bottom-1
              left-1/2
              h-1.5
              w-1.5
              -translate-x-1/2
              rounded-full
              bg-emerald-400
            "
          />
        )}
      </div>
    </button>
  );
};

export default CalendarDay;