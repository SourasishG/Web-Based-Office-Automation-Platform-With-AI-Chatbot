import { useNavigate } from "react-router-dom";
import { Activity, Clock, ArrowRight } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * RecentActivity - Apple Liquid Glass Real-Time Operational Audit Feed
 * Displays live employee actions, task completions, and system events.
 * 
 * @param {Array<object>} activities - Array of activity log items
 */
export const RecentActivity = ({ activities, theme = "default" }) => {
  const navigate = useNavigate();

  // Fallback Activity Log Feed
  const defaultActivities = [
    {
      id: "act-1",
      user: { name: "Ananya Roy", avatar: null },
      action: "completed task",
      target: "Design Dashboard UI",
      time: "12m ago",
      type: "task",
    },
    {
      id: "act-2",
      user: { name: "Rahul Sharma", avatar: null },
      action: "merged pull request in",
      target: "Cloud Migration Pipeline",
      time: "45m ago",
      type: "code",
    },
    {
      id: "act-3",
      user: { name: "Priya Patel", avatar: null },
      action: "resolved support ticket",
      target: "#TK-1089 Email Sync Issue",
      time: "2h ago",
      type: "ticket",
    },
    {
      id: "act-4",
      user: { name: "Sourasish Ghosh", avatar: null },
      action: "scheduled meeting",
      target: "AI Roadmap Sync",
      time: "3h ago",
      type: "meeting",
    },
    {
      id: "act-5",
      user: { name: "Vikram Das", avatar: null },
      action: "uploaded document to",
      target: "Security Guidelines 2026",
      time: "5h ago",
      type: "file",
    },
  ];

  const logs = activities && activities.length > 0 ? activities : defaultActivities;

  // Type Tag Helper
  const getTypeBadge = (type) => {
    switch (type) {
      case "task":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C6F432] text-[#0B0B0C]">Task</span>;
      case "code":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">Dev</span>;
      case "ticket":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">Ticket</span>;
      case "meeting":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Sync</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">System</span>;
    }
  };

  if (theme === "light") {
    return (
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-xl text-[#0B0B0C] transition-all">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-zinc-700">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#0B0B0C]">
                Recent Activity
              </h2>
              <p className="text-xs text-zinc-500">Real-time workplace audit log</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/notifications")}
            aria-label="View Full Audit Log"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Activity Table / Rows */}
        <div className="divide-y divide-slate-100/80">
          {logs.map((log) => (
            <div
              key={log.id}
              className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3 group hover:bg-slate-50/50 px-1 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <GlassAvatar
                  src={log.user?.avatar}
                  name={log.user?.name || "User"}
                  size="sm"
                  className="shrink-0 ring-1 ring-slate-200"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#0B0B0C] truncate">
                    {log.user?.name}
                  </p>
                  <p className="text-[11px] text-zinc-500 truncate">
                    <span>{log.action}</span>{" "}
                    <span className="font-medium text-zinc-800">{log.target}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline-block">
                  {log.time}
                </span>
                {getTypeBadge(log.type)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <GlassPanel
      title="Recent Activity"
      subtitle="Real-time workplace operation log"
      icon={Activity}
      action={
        <GlassButton
          variant="ghost"
          size="sm"
          rightIcon={ArrowRight}
          onClick={() => navigate("/notifications")}
          title="View Audit Log & Notification Center"
        >
          Audit Log
        </GlassButton>
      }
      variant="default"
      padding="none"
      className="h-full flex flex-col justify-start"
    >
      <div className="p-4 sm:p-5 space-y-3.5 divide-y divide-white/5">
        {logs.map((log, idx) => (
          <div
            key={log.id || idx}
            className="pt-3.5 first:pt-0 flex items-start gap-3 group"
          >
            {/* User Avatar */}
            <GlassAvatar
              src={log.user?.avatar}
              name={log.user?.name || "User"}
              size="sm"
              className="mt-0.5 shrink-0"
            />

            {/* Log Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-white truncate">
                  {log.user?.name}
                </span>
                <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {log.time}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-0.5 truncate leading-relaxed">
                <span className="text-slate-400">{log.action}</span>{" "}
                <span className="font-medium text-cyan-300">{log.target}</span>
              </p>
            </div>

            {/* Type Badge */}
            <div className="shrink-0">{getTypeBadge(log.type)}</div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default RecentActivity;