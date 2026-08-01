import {
  FolderKanban,
  CheckSquare,
  CalendarDays,
  Ticket,
} from "lucide-react";

import ProfileData from "../data/ProfileData";

const ProfileStats = () => {
  const stats = [
    {
      title: "Projects",
      value: ProfileData.stats.projects,
      icon: FolderKanban,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Tasks",
      value: ProfileData.stats.tasks,
      icon: CheckSquare,
      color: "from-violet-500 to-purple-600",
    },
    {
      title: "Meetings",
      value: ProfileData.stats.meetings,
      icon: CalendarDays,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Tickets",
      value: ProfileData.stats.tickets,
      icon: Ticket,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
      "
    >
      <h2 className="mb-6 text-xl font-semibold text-white">
        Quick Stats
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-500/30
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-linear-to-br
                    ${stat.color}
                  `}
                >
                  <Icon size={22} className="text-white" />
                </div>

                <span className="text-3xl font-bold text-white">
                  {stat.value}
                </span>
              </div>

              <p className="mt-4 text-sm font-medium text-slate-400">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileStats;