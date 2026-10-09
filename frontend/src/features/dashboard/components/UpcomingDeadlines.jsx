import React from "react";
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
  // Fallback Deadline Items matching Office Aid Platform projects
  const defaultDeadlines = [
    {
      id: "dl-1",
      title: "AI Chatbot Assistant v1.0",
      project: "Automation Platform",
      dueDate: "30 Sep 2026",
      daysLeft: "In 8 weeks",
      progress: 65,
      priority: "high",
    },
    {
      id: "dl-2",
      title: "Cloud Infrastructure Migration",
      project: "DevOps",
      dueDate: "05 Nov 2026",
      daysLeft: "In 3 months",
      progress: 40,
      priority: "high",
    },
    {
      id: "dl-3",
      title: "Cyber Security Vulnerability Audit",
      project: "Security",
      dueDate: "25 Sep 2026",
      daysLeft: "In 7 weeks",
      progress: 25,
      priority: "medium",
    },
  ];

  const items = deadlines && deadlines.length > 0 ? deadlines : defaultDeadlines;

  // Priority Badge Helper
  const getPriorityBadge = (priority) => {
    if (priority === "high") {
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
      subtitle="Milestones & target project completions"
      icon={Clock}
      action={
        <GlassButton variant="ghost" size="sm" rightIcon={ArrowRight}>
          Projects
        </GlassButton>
      }
      variant="default"
      padding="none"
      className="h-full flex flex-col justify-between"
    >
      <div className="p-4 sm:p-5 space-y-3.5 divide-y divide-white/5">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className="pt-3.5 first:pt-0 flex items-center justify-between gap-3 group"
          >
            {/* Left Info Column */}
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                  {item.project}
                </span>
                {getPriorityBadge(item.priority)}
              </div>

              <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                {item.title}
              </h4>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Due: {item.dueDate}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-medium">{item.daysLeft}</span>
              </div>
            </div>

            {/* Right Progress Ring */}
            <div className="shrink-0 pl-2">
              <ProgressRing
                progress={item.progress}
                size={52}
                strokeWidth={5}
                variant={item.progress > 50 ? "cyan" : "purple"}
                glow={false}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default UpcomingDeadlines;