/**
 * Internal Email & Communications Initial Mock Data
 * Contains realistic workplace emails with category tags, thread bodies, and timestamps.
 */

export const initialEmails = [
  {
    id: "MAIL-201",
    sender: {
      name: "Sourasish Ghosh",
      email: "sourasish.ghosh@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      role: "CEO & Admin",
    },
    recipients: ["all-staff@officeaid.com"],
    subject: "🚀 Q4 Strategic Objectives & Product Expansion Announcement",
    snippet: "Team, as we enter the fourth quarter, I am thrilled to share our key roadmap goals, including AI workspace automation...",
    body: `Team,

As we step into the fourth quarter, I am thrilled to share our key strategic roadmap goals for Office Aid. Over the past few months, our engineering and design teams have delivered incredible milestones across our core platform.

Here are our 3 key focus areas for Q4:
1. Complete rollout of the Intelligent Workplace Automation Suite.
2. Integration of real-time AI Assistant capabilities across all operational modules.
3. Enterprise security certification and performance optimizations.

Thank you for your continuous dedication and excellence. Let's make this quarter our most impactful yet!

Best regards,
Sourasish Ghosh
Chief Executive Officer`,
    category: "Announcement", // 'Announcement', 'Project Sync', 'HR Memo', 'IT Alert', 'Meeting Minutes'
    folder: "inbox", // 'inbox', 'sent', 'starred', 'drafts', 'trash'
    isRead: false,
    isStarred: true,
    timestamp: "10:30 AM",
    date: "2026-10-09",
  },
  {
    id: "MAIL-202",
    sender: {
      name: "Ananya Roy",
      email: "ananya.roy@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      role: "Head of Design",
    },
    recipients: ["design-team@officeaid.com", "sourasish.ghosh@officeaid.com"],
    subject: "🎨 Apple Liquid Glass Design System Guidelines & Figma Kit",
    snippet: "Attached is the finalized Liquid Glass component library specification including specular highlight tokens and dark/light color palettes...",
    body: `Hi Everyone,

We have finalized the core tokens for our Apple Liquid Glass Design System. The updated Figma UI Kit is now available in our shared workspace.

Key Highlights:
- Dual Theme Tokens: Optimized contrast for Dark and Light modes.
- Glass Panel Depth Presets: Flat, Standard, Floating, Inset, and Bordered.
- Micro-interactions: Framer Motion spring physics for tabs and card hover states.

Please review the design system documentation and update your feature components accordingly.

Warmly,
Ananya Roy`,
    category: "Project Sync",
    folder: "inbox",
    isRead: true,
    isStarred: true,
    timestamp: "09:15 AM",
    date: "2026-10-09",
  },
  {
    id: "MAIL-203",
    sender: {
      name: "Aarav Sharma",
      email: "aarav.sharma@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      role: "VP of Engineering",
    },
    recipients: ["engineering-all@officeaid.com"],
    subject: "⚡ Scheduled Backend API & Database Maintenance Window",
    snippet: "Please note that we will be running database migration updates this Saturday from 02:00 AM to 04:00 AM IST...",
    body: `Engineering Team,

Please be advised that we have scheduled routine database schema maintenance and API performance index optimization for this coming Saturday:

Time: Saturday, 02:00 AM IST - 04:00 AM IST
Impact: Backend API services may experience brief 5-minute connection pauses.

All live background jobs will automatically resume once the migration completes.

Regards,
Aarav Sharma`,
    category: "IT Alert",
    folder: "inbox",
    isRead: false,
    isStarred: false,
    timestamp: "Yesterday",
    date: "2026-10-08",
  },
  {
    id: "MAIL-204",
    sender: {
      name: "Sneha Mukherjee",
      email: "sneha.mukherjee@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      role: "Lead HR Specialist",
    },
    recipients: ["all-staff@officeaid.com"],
    subject: "🌱 Annual Employee Wellness Week & Team Outing Registration",
    snippet: "We are excited to announce our upcoming Workplace Wellness Week featuring health workshops and team activities...",
    body: `Dear Team,

Human Resources is excited to announce our upcoming Workplace Wellness Week! 

Schedule Overview:
- Monday: Mindfulness & Ergonomics Workshop
- Wednesday: Team Sports & Fitness Challenge
- Friday: Annual Workplace Dinner & Celebration

Please fill out the registration form by Wednesday evening to confirm your shirt size and dietary preferences.

Best regards,
Sneha Mukherjee`,
    category: "HR Memo",
    folder: "inbox",
    isRead: true,
    isStarred: false,
    timestamp: "Oct 07",
    date: "2026-10-07",
  },
  {
    id: "MAIL-205",
    sender: {
      name: "Priya Sengupta",
      email: "priya.sengupta@officeaid.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      role: "Principal Product Manager",
    },
    recipients: ["executive-board@officeaid.com"],
    subject: "📝 Executive Meeting Minutes: Sprint 14 Roadmap Alignment",
    snippet: "Summary of decisions reached during yesterday's product sprint planning session regarding Kanban and Meeting modules...",
    body: `Hi Team,

Here are the key takeaways from our Sprint 14 roadmap alignment session:

Decisions:
1. Kanban Task Command Center approved for deployment with custom status columns.
2. Video Meeting Scheduler integrated with Google Meet and Zoom deep links.
3. Employee Directory multi-view layout finalized.

Next Sprint Starts: Next Monday at 10:00 AM.

Regards,
Priya Sengupta`,
    category: "Meeting Minutes",
    folder: "sent",
    isRead: true,
    isStarred: false,
    timestamp: "Oct 06",
    date: "2026-10-06",
  },
];

export default initialEmails;
