/**
 * IT Helpdesk & Support Tickets Initial Mock Data
 * Contains realistic support tickets with priority tiers, status indicators, assignees, and SLA timers.
 */

export const initialTickets = [
  {
    id: "TCK-401",
    title: "🔐 VPN Authentication Timeout & SSL Certificate Error",
    description: "Remote developers are experiencing intermittent SSL handshake timeouts when attempting to connect to the primary staging cluster via VPN gateway.",
    category: "Access & Security", // 'Access & Security', 'IT Infrastructure', 'Software & Tools', 'Facilities', 'HR Operations'
    priority: "Critical", // 'Critical', 'High', 'Medium', 'Low'
    status: "in-progress", // 'open', 'in-progress', 'review', 'resolved'
    requester: {
      name: "Rohan Varma",
      email: "rohan.varma@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      department: "Engineering",
    },
    assignee: {
      name: "Aarav Sharma",
      email: "aarav.sharma@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      role: "VP of Engineering",
    },
    slaTime: "2 hrs left",
    createdDate: "2026-10-09",
    createdTime: "10:15 AM",
    commentsCount: 4,
  },
  {
    id: "TCK-402",
    title: "💻 Figma Enterprise License Allocation for Design Interns",
    description: "Need to provision 3 new enterprise Figma design seats for our incoming UI/UX design specialists starting next week.",
    category: "Software & Tools",
    priority: "Medium",
    status: "open",
    requester: {
      name: "Ananya Roy",
      email: "ananya.roy@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      department: "Design",
    },
    assignee: {
      name: "Sourasish Ghosh",
      email: "sourasish.ghosh@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      role: "CEO & Admin",
    },
    slaTime: "24 hrs left",
    createdDate: "2026-10-09",
    createdTime: "09:30 AM",
    commentsCount: 1,
  },
  {
    id: "TCK-403",
    title: "⚡ Conference Room B Projector & Video Call Display Glitch",
    description: "The primary 4K display in Conference Room B intermittently flickers during video calls when connected via USB-C display port.",
    category: "Facilities",
    priority: "High",
    status: "in-progress",
    requester: {
      name: "Priya Sengupta",
      email: "priya.sengupta@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      department: "Product",
    },
    assignee: {
      name: "Vikram Das",
      email: "vikram.das@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400",
      role: "UI/UX Specialist",
    },
    slaTime: "5 hrs left",
    createdDate: "2026-10-08",
    createdTime: "04:45 PM",
    commentsCount: 3,
  },
  {
    id: "TCK-404",
    title: "🌐 Database Connection Pool Exhaustion on Staging Cluster",
    description: "Staging database environment reached max connections limit during automated integration test run.",
    category: "IT Infrastructure",
    priority: "Critical",
    status: "review",
    requester: {
      name: "Aarav Sharma",
      email: "aarav.sharma@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      department: "Engineering",
    },
    assignee: {
      name: "Sourasish Ghosh",
      email: "sourasish.ghosh@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      role: "CEO & Admin",
    },
    slaTime: "On Track",
    createdDate: "2026-10-08",
    createdTime: "02:10 PM",
    commentsCount: 6,
  },
  {
    id: "TCK-405",
    title: "📋 Q4 Employee Health Insurance Benefit Card Distribution",
    description: "Request to issue updated digital health insurance cards for newly onboarded team members.",
    category: "HR Operations",
    priority: "Low",
    status: "resolved",
    requester: {
      name: "Sneha Mukherjee",
      email: "sneha.mukherjee@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      department: "HR",
    },
    assignee: {
      name: "Sneha Mukherjee",
      email: "sneha.mukherjee@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      role: "HR Lead",
    },
    slaTime: "Completed",
    createdDate: "2026-10-07",
    createdTime: "11:00 AM",
    commentsCount: 2,
  },
];

export default initialTickets;
