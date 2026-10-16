import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import CalendarDay from "./CalendarDay";

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const MiniCalendar = ({
  title = "Calendar",
  events = [],
  selectedDate,
  onSelectDate,
}) => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate) : new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();

  const totalDays = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const eventDays = events
    .filter((event) => {
      if (!event.date) return false;
      const d = new Date(event.date);
      return (
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    })
    .map((event) => new Date(event.date).getDate());

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(day);
  }

  const previousMonth = () => {
    setCurrentMonth(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(year, month + 1, 1)
    );
  };

  const jumpToToday = () => {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    if (onSelectDate) {
      onSelectDate(today.toISOString().split("T")[0]);
    }
  };

  const isDaySelected = (day) => {
    if (!day || !selectedDate) return false;
    const sel = new Date(selectedDate);
    return (
      sel.getFullYear() === year &&
      sel.getMonth() === month &&
      sel.getDate() === day
    );
  };

  const handleDayClick = (day) => {
    if (!day) return;
    const dStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (onSelectDate) {
      onSelectDate(dStr);
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            {monthName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={jumpToToday}
            className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition"
          >
            Today
          </button>

          <button
            type="button"
            onClick={previousMonth}
            className="rounded-xl bg-white/5 p-1.5 text-slate-400 hover:text-white transition hover:bg-white/10 border border-white/10"
            title="Previous Month"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={nextMonth}
            className="rounded-xl bg-white/5 p-1.5 text-slate-400 hover:text-white transition hover:bg-white/10 border border-white/10"
            title="Next Month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-7 text-center text-xs font-semibold text-slate-400">
        {weekDays.map((day) => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 place-items-center">
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            isToday={
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear()
            }
            isSelected={isDaySelected(day)}
            hasEvent={day && eventDays.includes(day)}
            onClick={() => handleDayClick(day)}
          />
        ))}
      </div>
    </section>
  );
};

export default MiniCalendar;