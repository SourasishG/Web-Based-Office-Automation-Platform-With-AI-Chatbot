import { PrismaClient, Role, PresenceStatus, ProjectStatus, Priority, TaskStatus, MeetingPlatform, MeetingStatus, TicketCategory, TicketStatus, EmailFolder, NotificationCategory } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Office Aid database seeding...");

  // 1. Clean existing records in relational order
  console.log("🧹 Cleaning existing data...");
  await prisma.ticketComment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.email.deleteMany();
  await prisma.meetingAttendee.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.task.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.user.deleteMany();

  // 2. Hash default password for all seed accounts
  const defaultPasswordHash = await bcrypt.hash("Admin@123", 10);

  // 3. Create Users & Org Chart Hierarchy
  console.log("👥 Creating team members...");
  
  // CEO & Admin
  const ceo = await prisma.user.create({
    data: {
      email: "sourasish.ghosh@officeaid.com",
      password: defaultPasswordHash,
      firstName: "Sourasish",
      lastName: "Ghosh",
      role: Role.ADMIN,
      department: "Executive",
      jobTitle: "Chief Executive Officer & Administrator",
      phone: "+91 98765 43210",
      location: "Kolkata, India",
      presenceStatus: PresenceStatus.ONLINE,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      skills: ["Leadership", "Product Strategy", "React", "System Architecture", "AI Integration"],
    },
  });

  // VP of Engineering
  const vpEng = await prisma.user.create({
    data: {
      email: "aarav.sharma@officeaid.com",
      password: defaultPasswordHash,
      firstName: "Aarav",
      lastName: "Sharma",
      role: Role.MANAGER,
      department: "Engineering",
      jobTitle: "VP of Engineering",
      phone: "+91 98123 45678",
      location: "Bengaluru, India",
      presenceStatus: PresenceStatus.ONLINE,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      skills: ["Node.js", "PostgreSQL", "System Design", "Microservices", "Docker"],
      managerId: ceo.id,
    },
  });

  // Head of Design
  const headDesign = await prisma.user.create({
    data: {
      email: "ananya.roy@officeaid.com",
      password: defaultPasswordHash,
      firstName: "Ananya",
      lastName: "Roy",
      role: Role.MANAGER,
      department: "Design",
      jobTitle: "Head of Product Design",
      phone: "+91 97890 12345",
      location: "Mumbai, India",
      presenceStatus: PresenceStatus.BUSY,
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      skills: ["Figma", "UI/UX Architecture", "Apple Design Systems", "Prototyping"],
      managerId: ceo.id,
    },
  });

  // Senior DevOps Engineer
  const devopsEng = await prisma.user.create({
    data: {
      email: "rohan.varma@officeaid.com",
      password: defaultPasswordHash,
      firstName: "Rohan",
      lastName: "Varma",
      role: Role.EMPLOYEE,
      department: "Engineering",
      jobTitle: "Senior DevOps & Cloud Specialist",
      phone: "+91 98345 67890",
      location: "Hyderabad, India",
      presenceStatus: PresenceStatus.ONLINE,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      skills: ["Kubernetes", "AWS", "CI/CD", "Security", "Linux"],
      managerId: vpEng.id,
    },
  });

  // Frontend Specialist
  const frontendEng = await prisma.user.create({
    data: {
      email: "priya.mehta@officeaid.com",
      password: defaultPasswordHash,
      firstName: "Priya",
      lastName: "Mehta",
      role: Role.EMPLOYEE,
      department: "Engineering",
      jobTitle: "Staff Frontend Engineer",
      phone: "+91 98456 78901",
      location: "Pune, India",
      presenceStatus: PresenceStatus.ONLINE,
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      skills: ["React 19", "Tailwind CSS", "TypeScript", "Performance"],
      managerId: vpEng.id,
    },
  });

  console.log(`✅ Seeded 5 team members (Default Password: Admin@123)`);

  // 4. Create Projects
  console.log("📁 Creating projects...");
  const project1 = await prisma.project.create({
    data: {
      title: "Office Aid Workplace Platform",
      description: "Developing an AI-powered workplace automation platform with Apple Liquid Glass UI for modern organizations.",
      department: "Engineering",
      status: ProjectStatus.ACTIVE,
      priority: Priority.HIGH,
      progress: 75,
      startDate: new Date("2026-08-01"),
      dueDate: new Date("2026-11-30"),
      ownerId: ceo.id,
      members: {
        create: [
          { userId: ceo.id, role: "Lead" },
          { userId: vpEng.id, role: "Technical Architect" },
          { userId: headDesign.id, role: "Lead Designer" },
          { userId: frontendEng.id, role: "Core Developer" },
          { userId: devopsEng.id, role: "Infrastructure" },
        ],
      },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: "Enterprise Cloud Infrastructure Migration",
      description: "Migrating legacy data centers to high-availability multi-region cloud cluster with automated failover.",
      department: "Engineering",
      status: ProjectStatus.ACTIVE,
      priority: Priority.CRITICAL,
      progress: 40,
      startDate: new Date("2026-09-15"),
      dueDate: new Date("2026-12-15"),
      ownerId: vpEng.id,
      members: {
        create: [
          { userId: vpEng.id, role: "Lead" },
          { userId: devopsEng.id, role: "Lead DevOps" },
        ],
      },
    },
  });

  const project3 = await prisma.project.create({
    data: {
      title: "Apple Liquid Glass Mobile App",
      description: "Native cross-platform companion app for executive schedule alerts and urgent IT ticket approvals.",
      department: "Design",
      status: ProjectStatus.PLANNING,
      priority: Priority.MEDIUM,
      progress: 20,
      startDate: new Date("2026-10-01"),
      dueDate: new Date("2027-01-30"),
      ownerId: headDesign.id,
      members: {
        create: [
          { userId: headDesign.id, role: "Product Lead" },
          { userId: frontendEng.id, role: "Mobile Engineer" },
        ],
      },
    },
  });

  console.log(`✅ Seeded 3 projects`);

  // 5. Create Kanban Tasks
  console.log("📋 Creating Kanban tasks...");
  await prisma.task.createMany({
    data: [
      {
        projectId: project1.id,
        assigneeId: frontendEng.id,
        title: "Build Apple Liquid Glass design tokens & components",
        description: "Implement GlassPanel, GlassCard, GlassTabs, and GlassModal with specular reflections.",
        status: TaskStatus.COMPLETED,
        priority: Priority.HIGH,
        orderIndex: 1.0,
        dueDate: new Date("2026-10-08"),
        subtasks: [
          { id: "sub-1", title: "Specular highlight borders", completed: true },
          { id: "sub-2", title: "Dual dark/light themes", completed: true },
        ],
      },
      {
        projectId: project1.id,
        assigneeId: vpEng.id,
        title: "Connect Supabase PostgreSQL & Prisma Schema",
        description: "Configure connection pooling on port 6543 and session pooler on port 5432.",
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.CRITICAL,
        orderIndex: 2.0,
        dueDate: new Date("2026-10-15"),
        subtasks: [
          { id: "sub-3", title: "Prisma schema models", completed: true },
          { id: "sub-4", title: "Push tables to Supabase", completed: true },
          { id: "sub-5", title: "Seed script execution", completed: false },
        ],
      },
      {
        projectId: project1.id,
        assigneeId: ceo.id,
        title: "Orchestrate Gemini 1.5 Pro AI Assistant with RAG",
        description: "Create AI proxy endpoint with tools to query open tickets, meetings, and summary metrics.",
        status: TaskStatus.TODO,
        priority: Priority.HIGH,
        orderIndex: 3.0,
        dueDate: new Date("2026-10-20"),
        subtasks: [
          { id: "sub-6", title: "Gemini SDK setup", completed: false },
          { id: "sub-7", title: "Ticket resolution tool calling", completed: false },
        ],
      },
      {
        projectId: project2.id,
        assigneeId: devopsEng.id,
        title: "Automate SSL Wildcard Certificate Renewal daemon",
        description: "Zero-downtime certificate rotation for VPN gateways and microservice ingress.",
        status: TaskStatus.REVIEW,
        priority: Priority.CRITICAL,
        orderIndex: 4.0,
        dueDate: new Date("2026-10-12"),
        subtasks: [
          { id: "sub-8", title: "Certbot hook script", completed: true },
          { id: "sub-9", title: "Nginx reload verification", completed: true },
        ],
      },
      {
        projectId: project3.id,
        assigneeId: headDesign.id,
        title: "Figma interactive prototype for Mobile Glass App",
        description: "Deliver high-fidelity interaction specs for swipe gestures and notification trays.",
        status: TaskStatus.TODO,
        priority: Priority.MEDIUM,
        orderIndex: 5.0,
        dueDate: new Date("2026-10-25"),
        subtasks: [],
      },
    ],
  });

  console.log(`✅ Seeded 5 Kanban tasks`);

  // 6. Create Meetings
  console.log("📅 Creating scheduled meetings...");
  const meeting1 = await prisma.meeting.create({
    data: {
      title: "Weekly Executive Leadership Sync",
      description: "Strategic review of Q4 targets, hiring headcount, and platform delivery timelines.",
      date: new Date("2026-10-12"),
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      platform: MeetingPlatform.GOOGLE_MEET,
      meetingLink: "https://meet.google.com/off-sync-ceo",
      status: MeetingStatus.SCHEDULED,
      hostId: ceo.id,
      attendees: {
        create: [
          { userId: ceo.id, status: "ACCEPTED" },
          { userId: vpEng.id, status: "ACCEPTED" },
          { userId: headDesign.id, status: "ACCEPTED" },
        ],
      },
    },
  });

  await prisma.meeting.create({
    data: {
      title: "Backend Architecture & Database Review",
      description: "Deep dive into Prisma connection pooling, JWT security, and endpoint rate limiting.",
      date: new Date("2026-10-12"),
      startTime: "02:30 PM",
      endTime: "03:30 PM",
      platform: MeetingPlatform.ZOOM,
      meetingLink: "https://zoom.us/j/987654321",
      status: MeetingStatus.SCHEDULED,
      hostId: vpEng.id,
      attendees: {
        create: [
          { userId: vpEng.id, status: "ACCEPTED" },
          { userId: ceo.id, status: "ACCEPTED" },
          { userId: devopsEng.id, status: "ACCEPTED" },
          { userId: frontendEng.id, status: "ACCEPTED" },
        ],
      },
    },
  });

  console.log(`✅ Seeded 2 scheduled syncs`);

  // 7. Create IT Support Tickets
  console.log("🎫 Creating IT support tickets...");
  const ticket1 = await prisma.ticket.create({
    data: {
      ticketNumber: "TCK-401",
      title: "🔐 VPN Authentication Timeout & SSL Certificate Handshake Error",
      description: "Remote developers are experiencing intermittent SSL handshake timeouts when attempting to connect to the staging cluster via VPN gateway.",
      category: TicketCategory.ACCESS_SECURITY,
      priority: Priority.CRITICAL,
      status: TicketStatus.IN_PROGRESS,
      slaDueAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      requesterId: devopsEng.id,
      assigneeId: vpEng.id,
      comments: {
        create: [
          {
            authorId: vpEng.id,
            message: "Investigating the gateway certificate chain. Renewing the intermediate bundle now.",
          },
          {
            authorId: devopsEng.id,
            message: "Thanks! Staging cluster logs show handshake errors dropped by 50%.",
          },
        ],
      },
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      ticketNumber: "TCK-402",
      title: "💻 Figma Enterprise License Allocation for Design Interns",
      description: "Need to provision 3 new enterprise Figma design seats for our incoming UI/UX design specialists starting next week.",
      category: TicketCategory.SOFTWARE_TOOLS,
      priority: Priority.MEDIUM,
      status: TicketStatus.OPEN,
      slaDueAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      requesterId: headDesign.id,
      assigneeId: ceo.id,
    },
  });

  const ticket3 = await prisma.ticket.create({
    data: {
      ticketNumber: "TCK-403",
      title: "⚡ Conference Room B Projector & Video Call Display Glitch",
      description: "The primary 4K display in Conference Room B intermittently flickers during video calls when connected via USB-C display port.",
      category: TicketCategory.FACILITIES,
      priority: Priority.HIGH,
      status: TicketStatus.OPEN,
      slaDueAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
      requesterId: frontendEng.id,
      assigneeId: devopsEng.id,
    },
  });

  console.log(`✅ Seeded 3 IT Helpdesk tickets`);

  // 8. Create Internal Emails
  console.log("📧 Creating internal emails...");
  await prisma.email.createMany({
    data: [
      {
        senderId: ceo.id,
        recipientId: vpEng.id,
        subject: "Q4 Engineering Roadmap & AI Integration Priorities",
        body: "Hi Aarav,\n\nPlease review the attached milestones for the Office Aid AI Assistant. We need to finalize the Gemini tool-calling integrations by next Friday.\n\nBest,\nSourasish",
        snippet: "Please review the attached milestones for the Office Aid AI Assistant...",
        category: "Project Sync",
        folder: EmailFolder.INBOX,
        isStarred: true,
        isRead: false,
      },
      {
        senderId: headDesign.id,
        recipientId: ceo.id,
        subject: "Liquid Glass Design Tokens v2.0 Released",
        body: "Hi Sourasish,\n\nThe new specular blur variables and theme palette adjustments have been integrated into the frontend theme directory.\n\nWarm regards,\nAnanya",
        snippet: "The new specular blur variables and theme palette adjustments have been integrated...",
        category: "Announcements",
        folder: EmailFolder.INBOX,
        isStarred: false,
        isRead: true,
      },
    ],
  });

  console.log(`✅ Seeded 2 internal emails`);

  // 9. Create Company Announcements
  console.log("📢 Creating announcements...");
  await prisma.announcement.create({
    data: {
      authorId: ceo.id,
      title: "🚀 Welcome to the Office Aid Enterprise Platform",
      content: "We have officially deployed the Apple Liquid Glass design system and integrated cloud backend. Enjoy the unified workspace experience!",
      category: "Company",
      isPinned: true,
    },
  });

  // 10. Create Notifications
  console.log("🔔 Creating notifications...");
  await prisma.notification.createMany({
    data: [
      {
        userId: ceo.id,
        title: "Critical Ticket Escalation",
        message: "Ticket TCK-401 (VPN SSL Certificate Handshake) SLA expires in 2 hours.",
        category: NotificationCategory.TICKETS,
        priority: Priority.CRITICAL,
        isRead: false,
        actionUrl: "/tickets",
      },
      {
        userId: ceo.id,
        title: "Upcoming Meeting",
        message: "Weekly Executive Leadership Sync starts tomorrow at 10:00 AM.",
        category: NotificationCategory.MEETINGS,
        priority: Priority.HIGH,
        isRead: false,
        actionUrl: "/meetings",
      },
      {
        userId: vpEng.id,
        title: "Task Assigned",
        message: "Sourasish Ghosh assigned you to Connect Supabase PostgreSQL & Prisma Schema.",
        category: NotificationCategory.TASKS,
        priority: Priority.HIGH,
        isRead: true,
        actionUrl: "/tasks",
      },
    ],
  });

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
