import React from "react";
import { Activity, Clock, CheckCircle2, GitCommit, Layers, Sparkles } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassCard } from "../../../components/ui/GlassCard";
import { GlassBadge } from "../../../components/ui/GlassBadge";

/**
 * RecentActivity - Apple Liquid Glass Executive Audit Timeline
 * Renders verified employee activity logs, deployment commits, and system milestones.
 * 
 * @param {Array<object>} activities - List of user activity log objects
 */
export const RecentActivity = ({ activities }) => {
  // Fallback Executive Activity Timeline
  const defaultActivities = [
    {
      id: "act-1",
      title: "Deployed Liquid Glass UI to Tasks Module",
      description: "Successfully upgraded 9 component files in Tasks feature to Apple visionOS design system.",
      timestamp: "15m ago",
      category: "Release",
      icon: Sparkles,
      badgeVariant: "cyan",
    },
    {
      id: "act-2",
      title: "Completed AI Assistant Architecture Review",
      description: "Finalized LLM tool calling schema and context window injection for Office Aid assistant.",
      timestamp: "2h ago",
      category: "Architecture",
      icon: Layers,
      badgeVariant: "purple",
    },
    {
      id: "act-3",
      title: "Merged PR #104: Framer Motion Spring Orchestration",
      description: "Enhanced dashboard entrance animations and smooth stagger physics across layout grids.",
      timestamp: "4h ago",
      category: "Git Commit",
      icon: GitCommit,
      badgeVariant: "primary",
    },
    {
      id: "act-4",
      title: "Organized Q3 All-Hands Engineering Townhall",
      description: "Scheduled interactive briefing with 112 engineering workforce members.",
      timestamp: "1d ago",
      category: "Executive Event",
      icon: CheckCircle2,
      badgeVariant: "success",
    },
  ];

  const logList = Array.isArray(activities) && activities.length > 0 ? activities : defaultActivities;

  return (
    <GlassPanel
      title="Recent Activity"
      subtitle="Executive operation & engineering audit timeline"
      icon={Activity}
      action={
        <GlassBadge variant="cyan" size="sm">
          Real-Time Log
        </GlassBadge>
      }
      variant="default"
      padding="md"
      className="h-full flex flex-col justify-between"
    >
      <div className="relative pl-3 sm:pl-6 space-y-4 my-2">
        {/* Continuous Vertical Liquid Timeline Line */}
        <div className="absolute left-3 sm:left-6 top-3 bottom-3 w-0.5 bg-linear-to-b from-cyan-500/40 via-purple-500/20 to-transparent -translate-x-1/2 pointer-events-none" />

        {logList.map((item, idx) => {
          const Icon = item.icon || Activity;
          return (
            <div key={item.id || idx} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* Timeline Node Icon Circle */}
              <div className="absolute -left-3 sm:-left-6 top-4 -translate-x-1/2 z-10 flex items-center justify-center p-1.5 rounded-full bg-slate-900 border border-cyan-400/40 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Activity Glass Tile */}
              <GlassCard
                variant="interactive"
                hoverable
                className="flex-1 p-4 relative overflow-hidden group-hover:border-white/20 transition-all duration-300"
              >
                {/* Header Row: Title & Category/Timestamp */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-2">
                    {item.category && (
                      <GlassBadge variant={item.badgeVariant || "cyan"} size="sm">
                        {item.category}
                      </GlassBadge>
                    )}
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {item.timestamp}
                    </span>
                  </div>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mt-1">
                    {item.description}
                  </p>
                )}
              </GlassCard>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
};

export default RecentActivity;