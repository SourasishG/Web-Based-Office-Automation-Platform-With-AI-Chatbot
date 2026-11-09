import { useNavigate } from "react-router-dom";
import { Clock, AlertCircle, ArrowRight } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";
import { ProgressRing } from "../../../components/ui/ProgressRing";

/**
 * UpcomingDeadlines - Apple Liquid Glass Project & Milestone Tracker
 * Displays high-priority workspace deadlines with progress meters and priority badges.
 * 
 * @param {Array<object>} deadlines - Array of upcoming milestone deadline objects
 */
export const UpcomingDeadlines = ({ deadlines, theme = "default" }) => {
  const navigate = useNavigate();

  const defaultDeadlines = [
    {
      id: "dl-1",
      title: "AI Chatbot Assistant v1.0",
      project: "Automation Platform",
      dueDate: "30 Sep 2026",
      daysLeft: "In 2 weeks",
      progress: 65,
      priority: "high",
    },
    {
      id: "dl-2",
      title: "Cloud Infrastructure Migration",
      project: "DevOps",
      dueDate: "15 Oct 2026",
      daysLeft: "In 4 weeks",
      progress: 40,
      priority: "high",
    },
  ];

  const items = Array.isArray(deadlines) && deadlines.length > 0
    ? deadlines.map((d) => {
        const dueDateFormatted = d.dueDate
          ? new Date(d.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          : (d.dueDateFormatted || "Upcoming");

        return {
          id: d.id,
          title: d.title,
          project: d.project || d.department || "Active Sprint",
          dueDate: dueDateFormatted,
          daysLeft: d.daysLeft || "Active",
          progress: typeof d.progress === "number" ? d.progress : 50,
          priority: (d.priority || "medium").toLowerCase(),
        };
      })
    : defaultDeadlines;

  if (theme === "light") {
    return (
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xl text-[#0B0B0C] transition-all">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-zinc-700">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-[#0B0B0C]">
                Upcoming Deadlines
              </h2>
              <p className="text-[11px] text-zinc-500">Sprint deliverables</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/projects")}
            aria-label="View Projects"
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Deadlines List */}
        <div className="space-y-3 mt-2">
          {items.slice(0, 2).map((item) => (
            <div key={item.id} className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-[#0B0B0C] truncate max-w-[160px]">
                  {item.title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-[10px] font-extrabold">
                  {item.progress}%
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2">
                <span>{item.project}</span>
                <span className="font-mono text-zinc-400">{item.daysLeft}</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-[#0B0B0C] rounded-full transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Priority Badge Helper
  const getPriorityBadge = (priority) => {
    if (priority === "high" || priority === "urgent" || priority === "critical") {
      return (
        <GlassBadge variant="danger" size="sm" icon={AlertCircle}>
          High Priority
        </GlassBadge>
      );
    }
    return (
      <GlassBadge variant="warning" size="sm">
        Medium Priority
      </GlassBadge>
    );
  };

  return (
    <GlassPanel
      title="Upcoming Deadlines"
      subtitle={`${items.length} sprint milestones active`}
      icon={Clock}
      action={
        <GlassButton variant="ghost" size="sm" rightIcon={ArrowRight} onClick={() => navigate("/projects")}>
          All Projects
        </GlassButton>
      }
      variant="default"
      padding="none"
      className="h-full flex flex-col justify-between"
    >
      {/* Deadlines List Track */}
      <div className="p-4 sm:p-5 space-y-4 divide-y divide-white/5">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className="pt-3.5 first:pt-0 flex items-center justify-between gap-4 group"
          >
            {/* Left: Project Details & Due Date */}
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  {item.project}
                </span>
                {getPriorityBadge(item.priority)}
              </div>

              <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                {item.title}
              </h4>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono text-cyan-400/90">{item.dueDate}</span>
                <span>•</span>
                <span className="text-slate-500">{item.daysLeft}</span>
              </div>
            </div>

            {/* Right: Liquid Glass Progress Gauge */}
            <div className="shrink-0 flex items-center gap-2">
              <ProgressRing
                progress={item.progress}
                size={44}
                strokeWidth={4}
                variant={item.progress >= 60 ? "cyan" : "primary"}
              />
              <span className="text-xs font-mono font-bold text-slate-300">
                {item.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default UpcomingDeadlines;