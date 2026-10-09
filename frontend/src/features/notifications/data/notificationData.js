/**
 * Workplace Notifications Center Mock Data
 * Contains realistic operational notifications across Tasks, Meetings, Emails, Tickets, and System categories.
 */

export const initialNotifications = [
  {
    id: "NOTIF-101",
    title: "⚡ Critical Ticket SLA Warning: VPN Access Timeout",
    message: "Ticket #TCK-401 (VPN Authentication Timeout) is approaching its SLA expiration window in 2 hours.",
    category: "tickets", // 'tasks', 'meetings', 'emails', 'tickets', 'system'
    priority: "urgent", // 'urgent', 'high', 'normal', 'low'
    isRead: false,
    timestamp: "10 mins ago",
    date: "2026-10-10",
    actionUrl: "/tickets",
    sender: {
      name: "IT Support Bot",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      role: "System Monitor",
    },
  },
  {
    id: "NOTIF-102",
    title: "📅 Upcoming Video Sync: Q4 Roadmap Alignment",
    message: "Your scheduled video call 'Executive Sprint 14 Alignment' is starting in 15 minutes.",
    category: "meetings",
    priority: "high",
    isRead: false,
    timestamp: "25 mins ago",
    date: "2026-10-10",
    actionUrl: "/meetings",
    sender: {
      name: "Priya Sengupta",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      role: "Product Manager",
    },
  },
  {
    id: "NOTIF-103",
    title: "📧 Urgent Message from CEO: Q4 Strategic Objectives",
    message: "Sourasish Ghosh broadcasted a company-wide announcement regarding Q4 milestones and AI automation suite.",
    category: "emails",
    priority: "high",
    isRead: false,
    timestamp: "1 hour ago",
    date: "2026-10-10",
    actionUrl: "/emails",
    sender: {
      name: "Sourasish Ghosh",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      role: "CEO & Admin",
    },
  },
  {
    id: "NOTIF-104",
    title: "📋 Task Assigned: Implement Dark/Light Theme Engine",
    message: "Aarav Sharma assigned you to task #TSK-804: Verify pure white surfaces across Light Mode panels.",
    category: "tasks",
    priority: "normal",
    isRead: true,
    timestamp: "2 hours ago",
    date: "2026-10-10",
    actionUrl: "/tasks",
    sender: {
      name: "Aarav Sharma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      role: "VP of Engineering",
    },
  },
  {
    id: "NOTIF-105",
    title: "🎨 Figma Design Tokens & Component Specs Updated",
    message: "Ananya Roy updated shared design assets for Apple Liquid Glass UI Library.",
    category: "tasks",
    priority: "normal",
    isRead: true,
    timestamp: "4 hours ago",
    date: "2026-10-10",
    actionUrl: "/projects",
    sender: {
      name: "Ananya Roy",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      role: "Head of Design",
    },
  },
  {
    id: "NOTIF-106",
    title: "🔒 Security Alert: New Login Session Detected",
    message: "A new administrative session was authenticated from Kolkata, India (Chrome / Windows).",
    category: "system",
    priority: "urgent",
    isRead: true,
    timestamp: "Yesterday",
    date: "2026-10-09",
    actionUrl: "/profile",
    sender: {
      name: "Security Sentinel",
      avatar: null,
      role: "Auth Engine",
    },
  },
  {
    id: "NOTIF-107",
    title: "🌱 HR Announcement: Annual Wellness Registration Open",
    message: "Sneha Mukherjee opened registration for Workplace Wellness Week. Confirm dietary preferences by Wednesday.",
    category: "emails",
    priority: "low",
    isRead: true,
    timestamp: "2 days ago",
    date: "2026-10-08",
    actionUrl: "/emails",
    sender: {
      name: "Sneha Mukherjee",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      role: "HR Lead",
    },
  },
];

export default initialNotifications;
