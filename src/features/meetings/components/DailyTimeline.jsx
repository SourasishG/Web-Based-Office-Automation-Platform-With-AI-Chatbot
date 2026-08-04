import React from "react";
import { Clock, Calendar, Video, Inbox } from "lucide-react";
import {
  GlassPanel,
  GlassBadge,
  GlassButton,
} from "../../../components/ui";
import TimelineItem from "./TimelineItem";

/**
 * DailyTimeline - Apple Liquid Glass Hour-by-Hour Daily Schedule Timeline
 * Displays today's sequential meetings with live time indicators, status badges, and join triggers.
 * 
 * @param {Array<object>} schedule - Daily timeline events array
 * @param {string} searchTerm - Search query filter
 * @param {string} activeTab - Active filter tab ('all', 'today', 'upcoming', 'completed')
 */
export const DailyTimeline = ({ schedule = [], searchTerm = "", activeTab = "all" }) => {
  // Fallback Daily Timeline Events
  const defaultTimeline = [
    {
      id: "tl-1",
      time: "09:00 AM",
      duration: "30 min",
      title: "Executive Morning Operational Briefing",
      description: "Daily review of key workspace indicators, tickets, and operational health.",
      location: "Google Meet",
      type: "video",
      status: "completed",
      organizer: "Sourasish Ghosh",
      attendees: [{ name: "Sourasish Ghosh" }, { name: "Ananya Roy" }],
    },
    {
      id: "tl-2",
      time: "10:00 AM",
      duration: "30 min",
      title: "Daily Engineering & Sprint Stand-up",
      description: "Quick team sync on Liquid Glass UI migration, project blockers, and deployment targets.",
      location: "Google Meet",
      type: "video",
      status: "in-progress",
      organizer: "Ananya Roy",
      attendees: [
        { name: "Sourasish Ghosh" },
        { name: "Ananya Roy" },
        { name: "Rahul Sharma" },
      ],
    },
    {
      id: "tl-3",
      time: "11:30 AM",
      duration: "60 min",
      title: "AI Chatbot Assistant Architecture Review",
      description: "Deep dive into LLM function calling, context window injection, and UI integration.",
      location: "Conference Room B",
      type: "room",
      status: "upcoming",
      organizer: "Priya Patel",
      attendees: [
        { name: "Sourasish Ghosh" },
        { name: "Priya Patel" },
        { name: "Vikram Das" },
      ],
    },
    {
      id: "tl-4",
      time: "02:00 PM",
      duration: "45 min",
      title: "Product Roadmap & Design System Sync",
      description: "Reviewing Apple visionOS UI polish across Tasks, Meetings, and Profile features.",
      location: "Google Meet",
      type: "video",
      status: "upcoming",
      organizer: "Sourasish Ghosh",
      attendees: [
        { name: "Sourasish Ghosh" },
        { name: "Ananya Roy" },
        { name: "Neha Sen" },
      ],
    },
    {
      id: "tl-5",
      time: "04:00 PM",
      duration: "30 min",
      title: "Cyber Security Compliance Audit Briefing",
      description: "Quarterly review of JWT authentication security, encryption, and API tokens.",
      location: "Conference Room A",
      type: "room",
      status: "upcoming",
      organizer: "Rahul Sharma",
      attendees: [
        { name: "Rahul Sharma" },
        { name: "Sourasish Ghosh" },
      ],
    },
  ];

  const rawEvents = schedule.length > 0 ? schedule : defaultTimeline;

  // Filter events by tab and search query
  const filteredEvents = rawEvents.filter((event) => {
    // Tab Filter
    if (activeTab === "today" && event.status === "completed" && event.status === "cancelled") return false;
    if (activeTab === "upcoming" && event.status !== "upcoming" && event.status !== "in-progress") return false;
    if (activeTab === "completed" && event.status !== "completed") return false;

    // Search Query Filter
    if (!searchTerm) return true;
    const query = searchTerm.toLowerCase();
    return (
      event.title?.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query) ||
      event.organizer?.toLowerCase().includes(query)
    );
  });

  return (
    <GlassPanel
      title="Daily Timeline"
      subtitle="Today's hour-by-hour operational schedule"
      icon={Clock}
      action={
        <GlassBadge variant="cyan" size="sm" dot glow>
          Live Schedule
        </GlassBadge>
      }
      variant="default"
      padding="md"
      className="h-full flex flex-col justify-between"
    >
      {/* Timeline Stream */}
      <div className="relative pl-3 sm:pl-6 space-y-6 my-2">
        {/* Continuous Vertical Liquid Timeline Guide Line */}
        <div className="absolute left-3 sm:left-6 top-3 bottom-3 w-0.5 bg-linear-to-b from-cyan-500/40 via-blue-500/20 to-transparent -translate-x-1/2 pointer-events-none" />

        {filteredEvents.length > 0 ? (
          filteredEvents.map((item, idx) => (
            <TimelineItem key={item.id || idx} item={item} />
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center text-slate-400">
            <Inbox className="w-8 h-8 text-slate-500 mb-2 stroke-[1.5]" />
            <span className="text-xs font-medium">No meetings scheduled for this filter</span>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default DailyTimeline;