import { motion } from "framer-motion";
import {
  CalendarClock,
  Sparkles,
  Bell,
  Pin,
  Users,
  ArrowRight
} from "lucide-react";

const notifications = [
  {
    title: "Meeting Rescheduled",
    desc: "Marketing Team • 3:00 PM",
  },
  {
    title: "New Ticket Assigned",
    desc: "UI Bug #241",
  },
  {
    title: "Weekly Report Ready",
    desc: "Download Available",
  },
];

const onlineTeam = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
];

export default function RightSidebar() {
  return (
    <motion.aside
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 hidden h-screen w-80 border-l border-white/10 bg-white/5 p-6 backdrop-blur-3xl 2xl:flex flex-col gap-6"
    >

      {/* Upcoming Meeting */}

      <div className="rounded-3xl border border-cyan-500/20 bg-linear-to-br from-cyan-500/10 to-indigo-600/10 p-5">

        <div className="flex items-center justify-between">

          <h2 className="font-semibold text-lg">

            Upcoming

          </h2>

          <CalendarClock className="text-cyan-400" />

        </div>

        <h3 className="mt-5 text-xl font-bold">

          Design Review

        </h3>

        <p className="mt-2 text-sm text-slate-400">

          Today • 2:30 PM

        </p>

        <button className="mt-5 flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:scale-105">

          Join Meeting

          <ArrowRight size={16} />

        </button>

      </div>

      {/* AI Suggestions */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">

        <div className="mb-5 flex items-center gap-2">

          <Sparkles className="text-cyan-400" />

          <h2 className="font-semibold">

            AI Suggestions

          </h2>

        </div>

        <div className="space-y-3">

          <button className="w-full rounded-xl bg-white/5 p-3 text-left transition hover:bg-cyan-500/10">

            Summarize today's emails

          </button>

          <button className="w-full rounded-xl bg-white/5 p-3 text-left transition hover:bg-cyan-500/10">

            Generate weekly report

          </button>

          <button className="w-full rounded-xl bg-white/5 p-3 text-left transition hover:bg-cyan-500/10">

            Schedule project meeting

          </button>

        </div>

      </div>

      {/* Notifications */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">

        <div className="mb-5 flex items-center gap-2">

          <Bell className="text-yellow-400" />

          <h2 className="font-semibold">

            Notifications

          </h2>

        </div>

        <div className="space-y-4">

          {notifications.map((item, index) => (

            <div
              key={index}
              className="rounded-xl bg-white/5 p-3 hover:bg-white/10 transition"
            >

              <h4 className="font-medium">

                {item.title}

              </h4>

              <p className="mt-1 text-sm text-slate-400">

                {item.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Team Online */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">

        <div className="mb-4 flex items-center gap-2">

          <Users className="text-green-400" />

          <h2 className="font-semibold">

            Team Online

          </h2>

        </div>

        <div className="flex">

          {onlineTeam.map((img, index) => (

            <img
              key={index}
              src={img}
              alt=""
              className="-ml-2 h-11 w-11 rounded-full border-2 border-[#060B14] first:ml-0"
            />

          ))}

        </div>

      </div>

      {/* Notes */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">

        <div className="mb-4 flex items-center gap-2">

          <Pin className="text-pink-400" />

          <h2 className="font-semibold">

            Pinned Note

          </h2>

        </div>

        <p className="text-sm leading-6 text-slate-400">

          Remember to review the AI chatbot training dataset before tomorrow's
          sprint planning meeting.

        </p>

      </div>

    </motion.aside>
  );
}