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
export const UpcomingDeadlines = ({ deadlines }) => {
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