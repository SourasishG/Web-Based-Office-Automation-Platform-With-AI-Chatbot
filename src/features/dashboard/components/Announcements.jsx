import React from "react";
import { Megaphone, Pin, Calendar, ArrowRight } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * Announcements - Apple Liquid Glass Company Notice Board
 * Displays company notices, system updates, and townhall event announcements.
 * 
 * @param {Array<object>} announcements - Array of announcement notice objects
 */
export const Announcements = ({ announcements }) => {
  // Fallback Notice Board Items
  const defaultAnnouncements = [
    {
      id: "ann-1",
      title: "Q3 All-Hands Townhall & Product AI Showcase",
      author: "Executive Team",
      date: "05 Aug 2026",
      category: "Company Event",
      isPinned: true,
      snippet: "Join us this Wednesday for our quarterly company townhall showcasing our new AI platform features.",
    },
    {
      id: "ann-2",
      title: "Liquid Glass UI System Upgrade Deployment",
      author: "Engineering Core",
      date: "03 Aug 2026",
      category: "Engineering",
      isPinned: true,
      snippet: "The new Apple visionOS-inspired Liquid Glass Design System is now live across Office Aid.",
    },
    {
      id: "ann-3",
      title: "Updated Workplace Security & Data Policy",
      author: "InfoSec Group",
      date: "28 Jul 2026",
      category: "Policy",
      isPinned: false,
      snippet: "Please review the updated 2026 data compliance guidelines for internal document handling.",
    },
  ];

  const notices = announcements && announcements.length > 0 ? announcements : defaultAnnouncements;

  // Category Tag Variant
  const getCategoryBadge = (category) => {
    switch (category) {
      case "Engineering":
        return <GlassBadge variant="cyan" size="sm">Engineering</GlassBadge>;
      case "Company Event":
        return <GlassBadge variant="purple" size="sm">Event</GlassBadge>;
      default:
        return <GlassBadge variant="default" size="sm">Policy</GlassBadge>;
    }
  };

  return (
    <GlassPanel
      title="Announcements"
      subtitle="Company updates & notice board"
      icon={Megaphone}
      action={
        <GlassButton variant="ghost" size="sm" rightIcon={ArrowRight}>
          Notice Board
        </GlassButton>
      }
      variant="default"
      padding="none"
      className="h-full flex flex-col justify-between"
    >
      <div className="p-4 sm:p-5 space-y-3.5 divide-y divide-white/5">
        {notices.map((notice, idx) => (
          <div
            key={notice.id || idx}
            className="pt-3.5 first:pt-0 space-y-1.5 group cursor-pointer"
          >
            {/* Category & Pin Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {notice.isPinned && (
                  <Pin className="w-3.5 h-3.5 text-cyan-400 rotate-45 shrink-0" />
                )}
                {getCategoryBadge(notice.category)}
              </div>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                {notice.date}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
              {notice.title}
            </h4>

            {/* Snippet */}
            {notice.snippet && (
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {notice.snippet}
              </p>
            )}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default Announcements;