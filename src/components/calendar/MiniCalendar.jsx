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
}) => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
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
      const date = new Date(event.date);

      return (
        date.getMonth() === month &&
        date.getFullYear() === year
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

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {title}
          </h2>

          <p className="text-slate-400">
            {monthName}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={previousMonth}
            className="rounded-xl bg-white/5 p-2 transition hover:bg-white/10"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={nextMonth}
            className="rounded-xl bg-white/5 p-2 transition hover:bg-white/10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-7 text-center text-sm font-medium text-slate-400">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            isToday={
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear()
            }
            hasEvent={
              day && eventDays.includes(day)
            }
          />
        ))}
      </div>
    </section>
  );
};

export default MiniCalendar;