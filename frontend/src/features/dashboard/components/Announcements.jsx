import { Megaphone, Pin, Calendar, ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * Announcements - Apple Liquid Glass Company Notice Board
 * Displays company notices, system updates, and townhall event announcements.
 * 
 * @param {Array<object>} announcements - Array of announcement notice objects
 */
export const Announcements = ({ announcements, theme = "default" }) => {
  const navigate = useNavigate();

  const defaultAnnouncements = [
    {
      id: "ann-1",
      title: "Q4 Roadmap & AI Platform Showcase",
      authorName: "Executive Leadership",
      date: "Oct 12, 2026",
      category: "Company",
      isPinned: true,
      snippet: "Join us this Friday for our quarterly company roadmap showcase with live Herric AI demonstrations.",
    },
    {
      id: "ann-2",
      title: "Liquid Glass UI System Upgrade Deployment",
      authorName: "Engineering Core",
      date: "Oct 10, 2026",
      category: "Engineering",
      isPinned: true,
      snippet: "The new Apple visionOS-inspired Liquid Glass Design System is now live across Office Aid.",
    },
  ];

  const notices = Array.isArray(announcements) && announcements.length > 0
    ? announcements.map((n) => {
        const authorName = n.author
          ? `${n.author.firstName} ${n.author.lastName}`
          : (n.authorName || "Executive Team");
        const formattedDate = n.createdAt
          ? new Date(n.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : (n.date || "Recent");

        return {
          id: n.id,
          title: n.title,
          snippet: n.content || n.snippet,
          category: n.category || "Company",
          isPinned: !!n.isPinned,
          authorName,
          date: formattedDate,
        };
      })
    : defaultAnnouncements;

  if (theme === "light") {
    return (
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-xl text-[#0B0B0C] transition-all">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-zinc-700">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#0B0B0C]">
                Announcements
              </h2>
              <p className="text-xs text-zinc-500">Company notices & broadcast updates</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/notifications")}
            aria-label="View All Announcements"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Notices List */}
        <div className="space-y-3">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  {notice.isPinned && (
                    <span className="px-2 py-0.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-[10px] font-bold flex items-center gap-1">
                      <Pin className="w-2.5 h-2.5 fill-current" />
                      Pinned
                    </span>
                  )}
                  <span className="text-xs font-bold text-[#0B0B0C]">{notice.title}</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">{notice.date}</span>
              </div>
              <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                {notice.snippet}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Category Tag Variant
  const getCategoryBadge = (category) => {
    switch (category?.toLowerCase()) {
      case "engineering":
        return <GlassBadge variant="cyan" size="sm">Engineering</GlassBadge>;
      case "company":
      case "company event":
        return <GlassBadge variant="purple" size="sm">Company</GlassBadge>;
      case "policy":
        return <GlassBadge variant="warning" size="sm">Policy</GlassBadge>;
      default:
        return <GlassBadge variant="default" size="sm">{category || "General"}</GlassBadge>;
    }
  };

  return (
    <GlassPanel
      title="Announcements"
      subtitle="Company updates & broadcast notices"
      icon={Megaphone}
      action={
        <GlassButton variant="ghost" size="sm" rightIcon={ArrowRight} onClick={() => navigate("/notifications")}>
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

            {/* Author info */}
            {notice.authorName && (
              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                <User className="w-2.5 h-2.5 text-slate-500" />
                <span>By {notice.authorName}</span>
              </p>
            )}

            {/* Snippet / Content */}
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