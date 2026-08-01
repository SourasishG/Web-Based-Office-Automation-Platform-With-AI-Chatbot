import {
  CheckCircle2,
  CalendarDays,
  FolderKanban,
  Ticket,
} from "lucide-react";

import ProfileData from "../data/ProfileData";

const activityIcons = [
  CheckCircle2,
  CalendarDays,
  FolderKanban,
  Ticket,
];

const RecentActivity = () => {
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
        Recent Activity
      </h2>

      <div className="space-y-4">
        {ProfileData.recentActivity.map((activity, index) => {
          const Icon = activityIcons[index % activityIcons.length];

          return (
            <div
              key={activity}
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-white/5
                bg-white/5
                p-4
                transition-all
                duration-300
                hover:border-cyan-500/30
                hover:bg-white/10
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-linear-to-br
                  from-cyan-500
                  to-blue-600
                "
              >
                <Icon
                  size={20}
                  className="text-white"
                />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {activity}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Just now
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentActivity;