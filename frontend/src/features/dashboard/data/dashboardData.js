import {
  Users,
  Briefcase,
  Calendar,
  Mail,
  Ticket,
  CheckSquare,
} from "lucide-react";

/**
 * dashboardData - Master Data Layer for Office Aid Executive Dashboard
 */
export const dashboardData = {
  // Hero User Identity
  user: {
    name: "Sourasish Ghosh",
    role: "Administrator",
    department: "Engineering",
    email: "sourasishghosh062@gmail.com",
    location: "Kolkata, India",
    avatar: null,
  },

  // Live Weather Metrics
  weather: {
    city: "Kolkata, India",
    location: "Kolkata, India",
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 68,
    windSpeed: "12 km/h",
    wind: "12 km/h",
  },

  // Executive KPI Deck
  stats: [
    {
      id: "employees",
      title: "Employees",
      value: "248",
      change: "+12% this month",
      changeType: "positive",
      icon: Users,
      glow: "cyan",
    },
    {
      id: "projects",
      title: "Projects",
      value: "38",
      change: "+8% this month",
      changeType: "positive",
      icon: Briefcase,
      glow: "none",
    },
    {
      id: "meetings",
      title: "Meetings",
      value: "12",
      change: "+4% this week",
      changeType: "positive",
      icon: Calendar,
      glow: "none",
    },
    {
      id: "emails",
      title: "Unread Emails",
      value: "86",
      change: "+21% today",
      changeType: "neutral",
      icon: Mail,
      glow: "blue",
    },
    {
      id: "tickets",
      title: "Open Tickets",
      value: "19",
      change: "+6% this week",
      changeType: "neutral",
      icon: Ticket,
      glow: "none",
    },
  ],

  // Today's Operational Schedule
  schedule: [
    {
      id: "sch-1",
      title: "Daily Engineering Stand-up",
      time: "10:00 AM - 10:30 AM",
      status: "in-progress",
      location: "Google Meet",
      type: "video",
      attendees: [
        { name: "Sourasish Ghosh" },
        { name: "Ananya Roy" },
        { name: "Rahul Sharma" },
      ],
    },
    {
      id: "sch-2",
      title: "AI Chatbot Architecture Review",
      time: "11:30 AM - 12:30 PM",
      status: "upcoming",
      location: "Conference Room B",
      type: "room",
      attendees: [
        { name: "Sourasish Ghosh" },
        { name: "Priya Patel" },
      ],
    },
    {
      id: "sch-3",
      title: "Product Roadmap & Design Sync",
      time: "03:00 PM - 04:00 PM",
      status: "upcoming",
      location: "Google Meet",
      type: "video",
      attendees: [
        { name: "Vikram Das" },
        { name: "Sourasish Ghosh" },
        { name: "Neha Sen" },
        { name: "Amit Kumar" },
      ],
    },
  ],

  // Upcoming Milestones & Deadlines
  deadlines: [
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
  ],

  // AI Assistant Quick Prompts
  aiAssistant: {
    suggestions: [
      "Summarize unread emails",
      "Schedule 30-min team sync",
      "Generate project status report",
      "Check open support tickets",
    ],
  },

  // Team Real-Time Presence
  teamAvailability: [
    {
      id: "emp-1",
      name: "Sourasish Ghosh",
      role: "Administrator",
      department: "Engineering",
      status: "online",
    },
    {
      id: "emp-2",
      name: "Ananya Roy",
      role: "Senior UI Architect",
      department: "Product Design",
      status: "online",
    },
    {
      id: "emp-3",
      name: "Rahul Sharma",
      role: "DevOps Lead",
      department: "Infrastructure",
      status: "busy",
    },
    {
      id: "emp-4",
      name: "Priya Patel",
      role: "AI Engineer",
      department: "R&D",
      status: "away",
    },
    {
      id: "emp-5",
      name: "Vikram Das",
      role: "Product Manager",
      department: "Management",
      status: "offline",
    },
  ],

  // Workforce Headcount Distribution
  departmentStats: [
    { name: "Engineering", count: 112, percentage: 45, color: "from-cyan-500 to-blue-600" },
    { name: "Product & Design", count: 48, percentage: 19, color: "from-blue-500 to-indigo-600" },
    { name: "Operations & HR", count: 38, percentage: 15, color: "from-purple-500 to-pink-600" },
    { name: "Sales & Marketing", count: 32, percentage: 13, color: "from-emerald-500 to-teal-600" },
    { name: "R&D & Security", count: 18, percentage: 8, color: "from-amber-500 to-orange-600" },
  ],

  // Real-Time System & User Audit Logs
  recentActivities: [
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
  ],

  // Company Notice Board
  announcements: [
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
  ],

  // Immediate Workplace Actions
  quickActions: [
    {
      id: "qa-1",
      title: "Create Task",
      description: "Assign task to project team",
      icon: CheckSquare,
      glow: "cyan",
    },
    {
      id: "qa-2",
      title: "Schedule Sync",
      description: "Calendar & video meeting",
      icon: Calendar,
      glow: "none",
    },
    {
      id: "qa-3",
      title: "Compose Email",
      description: "Internal message dispatch",
      icon: Mail,
      glow: "none",
    },
    {
      id: "qa-4",
      title: "Submit Ticket",
      description: "IT & HR desk request",
      icon: Ticket,
      glow: "purple",
    },
  ],
};

export default dashboardData;