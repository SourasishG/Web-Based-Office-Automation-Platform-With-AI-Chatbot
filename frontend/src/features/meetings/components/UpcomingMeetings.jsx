import React from "react";
import { Calendar, ArrowRight, Inbox } from "lucide-react";
import {
  GlassPanel,
  GlassBadge,
  GlassButton,
} from "../../../components/ui";
import MeetingCard from "./MeetingCard";

/**
 * UpcomingMeetings - Apple Liquid Glass Upcoming Events Sidebar Deck
 * Renders filtered upcoming meeting cards and calendar sync indicators.
 * 
 * @param {Array<object>} meetings - List of upcoming meeting objects
 * @param {string} searchTerm - Search query filter
 */
export const UpcomingMeetings = ({ meetings = [], searchTerm = "" }) => {
  // Fallback Upcoming Meetings Data
  const defaultMeetings = [
    {
      id: "meet-1",
      title: "Daily Stand-up & Sprint Planning",
      organizer: { name: "Sourasish Ghosh", role: "Admin" },
      time: "10:00 AM - 10:30 AM",
      date: "21 Jul 2026",
      type: "video",
      location: "Google Meet",
      status: "upcoming",
      category: "Stand-up",
      attendees: [
        { name: "Sourasish Ghosh" },
        { name: "Ananya Roy" },
        { name: "Rahul Sharma" },
      ],
    },
    {
      id: "meet-2",
      title: "AI Assistant Integration Architecture",
      organizer: { name: "Priya Patel", role: "AI Lead" },
      time: "02:00 PM - 03:00 PM",
      date: "22 Jul 2026",
      type: "room",
      location: "Conference Room B",
      status: "upcoming",
      category: "Architecture",
      attendees: [
        { name: "Sourasish Ghosh" },
        { name: "Priya Patel" },
        { name: "Vikram Das" },
      ],
    },
    {
      id: "meet-3",
      title: "Q3 Design System & UI Review",
      organizer: { name: "Ananya Roy", role: "Design Lead" },
      time: "04:30 PM - 05:30 PM",
      date: "24 Jul 2026",
      type: "video",
      location: "Google Meet",
      status: "upcoming",
      category: "Design Sync",
      attendees: [
        { name: "Ananya Roy" },
        { name: "Sourasish Ghosh" },
      ],
    },
  ];

  const rawMeetings = meetings.length > 0 ? meetings : defaultMeetings;

  // Filter meetings by search query
  const filteredMeetings = rawMeetings.filter((item) => {
    if (!searchTerm) return true;
    const query = searchTerm.toLowerCase();
    return (
      item.title?.toLowerCase().includes(query) ||
      item.location?.toLowerCase().includes(query) ||
      item.organizer?.name?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query)
    );
  });

  return (
    <GlassPanel
      title="Upcoming Meetings"
      subtitle={`${filteredMeetings.length} scheduled events`}
      icon={Calendar}
      action={
        <GlassBadge variant="cyan" size="sm">
          Calendar Sync
        </GlassBadge>
      }
      variant="default"
      padding="md"
      className="h-full flex flex-col justify-between"
    >
      {/* Meetings Card List */}
      <div className="space-y-3.5">
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((meeting, idx) => (
            <MeetingCard key={meeting.id || idx} meeting={meeting} />
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center text-slate-400">
            <Inbox className="w-8 h-8 text-slate-500 mb-2 stroke-[1.5]" />
            <span className="text-xs font-medium">No matching upcoming meetings</span>
          </div>
        )}
      </div>

      {/* Bottom Footer Action */}
      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">Auto-synced with Outlook</span>
        <GlassButton variant="ghost" size="sm" rightIcon={ArrowRight}>
          View Calendar
        </GlassButton>
      </div>
    </GlassPanel>
  );
};

export default UpcomingMeetings;