import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Builds live real-time workplace context for the requesting user
 */
export const getUserWorkspaceContext = async (userId) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const [
    user,
    pendingTasks,
    todayMeetings,
    openTickets,
    unreadEmailsCount,
    latestAnnouncement,
    activeProjectsCount,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        department: true,
        jobTitle: true,
      },
    }),
    prisma.task.findMany({
      where: {
        assigneeId: userId,
        status: { not: "COMPLETED" },
      },
      take: 6,
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      include: {
        project: { select: { title: true } },
      },
    }),
    prisma.meeting.findMany({
      where: {
        date: { gte: startOfDay, lte: endOfDay },
        attendees: { some: { userId } },
      },
      orderBy: { startTime: "asc" },
      include: {
        host: { select: { firstName: true, lastName: true } },
      },
    }),
    prisma.ticket.findMany({
      where: {
        OR: [{ requesterId: userId }, { assigneeId: userId }],
        status: { in: ["OPEN", "IN_PROGRESS", "REVIEW"] },
      },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.email.count({
      where: { recipientId: userId, isRead: false },
    }),
    prisma.announcement.findFirst({
      orderBy: { createdAt: "desc" },
      include: { author: { select: { firstName: true, lastName: true } } },
    }),
    prisma.project.count({
      where: { status: "ACTIVE" },
    }),
  ]);

  return {
    user,
    pendingTasks,
    todayMeetings,
    openTickets,
    unreadEmailsCount,
    latestAnnouncement,
    activeProjectsCount,
    dateString: now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
};

/**
 * Creates the Herric system instruction with injected workplace awareness
 */
const buildSystemInstruction = (context) => {
  const { user, pendingTasks, todayMeetings, openTickets, unreadEmailsCount, latestAnnouncement, dateString } = context;

  const taskSummary = pendingTasks.length > 0
    ? pendingTasks.map((t) => `- [${t.priority}] "${t.title}" (${t.status}, Project: ${t.project?.title || "N/A"})`).join("\n")
    : "No pending tasks assigned.";

  const meetingSummary = todayMeetings.length > 0
    ? todayMeetings.map((m) => `- ${m.startTime} - ${m.endTime}: "${m.title}" (${m.platform}, Host: ${m.host.firstName} ${m.host.lastName})`).join("\n")
    : "No meetings scheduled for today.";

  const ticketSummary = openTickets.length > 0
    ? openTickets.map((tk) => `- Ticket #${tk.ticketNumber} [${tk.priority}]: "${tk.title}" (${tk.status})`).join("\n")
    : "No active IT tickets.";

  const announcementSummary = latestAnnouncement
    ? `"${latestAnnouncement.title}" by ${latestAnnouncement.author.firstName} ${latestAnnouncement.author.lastName}`
    : "None";

  return `
You are **Herric**, the official executive AI workplace assistant and operations copilot for the Office Aid platform.

### IDENTITY & TONE:
- Name: Herric
- Role: Executive AI Workplace Companion & Automation Specialist
- Personality: Courteous, highly intelligent, proactive, crisp, and executive-ready.
- Formatting: Use structured GitHub-flavored markdown with clean bullet points, bold labels, and concise summaries.
- You must always identify yourself as Herric if asked.

### CURRENT WORKSPACE CONTEXT:
- Current Date: ${dateString}
- Active User: ${user ? `${user.firstName} ${user.lastName} (${user.role}, ${user.department || "General"} Department - ${user.jobTitle || "Team Member"})` : "Team Member"}
- Unread Emails: ${unreadEmailsCount}
- Active Announcements: ${announcementSummary}

### USER'S LIVE DATA:
Pending Assigned Tasks:
${taskSummary}

Today's Scheduled Syncs/Meetings:
${meetingSummary}

Active IT Helpdesk Tickets:
${ticketSummary}

### INSTRUCTIONS:
1. Address the user warmly by their first name (${user?.firstName || "there"}).
2. When answering workspace questions (meetings, tasks, tickets, emails), reference their real live data when relevant.
3. For general productivity, drafting, or business questions, provide clear, high-level, actionable solutions.
4. Keep answers focused, practical, and avoid unnecessary verbosity.
`.trim();
};

/**
 * Invokes Gemini API or gracefully falls back to Herric's intelligent heuristic generator
 */
const callAiWithFallback = async ({ prompt, systemInstruction, history = [], fallbackFn }) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 0) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey.trim());
      // Try gemini-1.5-flash with system instruction
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemInstruction,
      });

      // Prepare multi-turn history if provided
      if (history && history.length > 0) {
        const formattedHistory = history.map((item) => ({
          role: item.role === "assistant" ? "model" : item.role,
          parts: [{ text: item.content }],
        }));

        const chat = model.startChat({ history: formattedHistory });
        const result = await chat.sendMessage(prompt);
        const replyText = result.response.text();
        return {
          reply: replyText,
          assistant: "Herric",
          provider: "gemini-1.5-flash",
        };
      } else {
        const result = await model.generateContent(prompt);
        const replyText = result.response.text();
        return {
          reply: replyText,
          assistant: "Herric",
          provider: "gemini-1.5-flash",
        };
      }
    } catch (err) {
      console.warn("Notice: Gemini API returned error, activating Herric fallback engine:", err.message);
      // Fall through to fallbackFn
    }
  }

  // Use intelligent rule-based Herric synthesis engine
  const fallbackReply = await fallbackFn();
  return {
    reply: fallbackReply,
    assistant: "Herric",
    provider: "herric-synthesizer",
  };
};

/**
 * Global Chat with Herric
 */
export const chatWithHerric = async (userId, { message, history = [], contextMode = "workspace" }) => {
  const context = await getUserWorkspaceContext(userId);
  const systemInstruction = buildSystemInstruction(context);

  const fallbackFn = () => {
    const q = message.toLowerCase();
    const { user, pendingTasks, todayMeetings, openTickets, unreadEmailsCount, latestAnnouncement } = context;
    const name = user?.firstName || "there";

    // Intent: Meetings / Calendar
    if (q.includes("meeting") || q.includes("schedule") || q.includes("calendar") || q.includes("sync")) {
      if (todayMeetings.length === 0) {
        return `Hello **${name}**, you currently have **no meetings scheduled for today**. You have a clear calendar block to focus on deep work and your assigned tasks!`;
      }
      const list = todayMeetings
        .map(
          (m) =>
            `- 🕒 **${m.startTime} - ${m.endTime}**: **${m.title}** (${m.platform})\n  *Host:* ${m.host.firstName} ${m.host.lastName}${m.meetingLink ? ` | [Join Link](${m.meetingLink})` : ""}`
        )
        .join("\n");
      return `Hello **${name}**, here is your scheduled sync breakdown for today:\n\n${list}\n\n*Pro-tip from Herric:* Review your agenda notes 5 minutes prior to each sync for maximum efficiency.`;
    }

    // Intent: Tasks / Kanban / Todo
    if (q.includes("task") || q.includes("todo") || q.includes("kanban") || q.includes("project")) {
      if (pendingTasks.length === 0) {
        return `Great news, **${name}**! You have **no open pending tasks** assigned to your queue at this moment. Excellent velocity!`;
      }
      const list = pendingTasks
        .map(
          (t) =>
            `- **[${t.priority}]** **${t.title}** — Status: \`${t.status}\` (Project: *${t.project?.title || "Internal"}*)`
        )
        .join("\n");
      return `Here is the current status of your active tasks, **${name}**:\n\n${list}\n\n*Herric's recommendation:* Address any \`URGENT\` or \`HIGH\` priority items first before taking on secondary deliverables.`;
    }

    // Intent: Tickets / IT Support
    if (q.includes("ticket") || q.includes("helpdesk") || q.includes("support") || q.includes("issue")) {
      if (openTickets.length === 0) {
        return `You have **no active IT helpdesk tickets** pending in your queue, **${name}**. All support requests are in good standing!`;
      }
      const list = openTickets
        .map((tk) => `- **Ticket #${tk.ticketNumber}** [${tk.priority}]: "${tk.title}" (Status: \`${tk.status}\`)`)
        .join("\n");
      return `Here are the active tickets relevant to your account, **${name}**:\n\n${list}\n\nLet me know if you would like me to draft an update or analyze a specific ticket for you.`;
    }

    // Intent: Email / Inbox
    if (q.includes("email") || q.includes("mail") || q.includes("inbox") || q.includes("unread")) {
      return `**${name}**, you currently have **${unreadEmailsCount} unread email(s)** in your Office Aid inbox. Would you like me to help you summarize any specific thread or draft quick responses?`;
    }

    // Intent: Who are you / Identity
    if (q.includes("who are you") || q.includes("your name") || q.includes("what can you do") || q.includes("herric")) {
      return `Greetings! I am **Herric**, your executive AI workplace assistant and productivity copilot for Office Aid.

Here is how I can assist you daily:
- 📊 **Executive Daily Briefings**: Instant morning summaries of your tasks, syncs, and team status.
- 💬 **Workspace Copilot**: Real-time answers regarding your sprint tasks, IT tickets, and team calendars.
- ✉️ **Smart Mail Assistant**: Instant email thread summarization and executive draft replies.
- 🛠️ **IT Helpdesk Copilot**: Root-cause diagnostic recommendations and suggested support responses.

How may I assist your workflow today, **${name}**?`;
    }

    // Default conversational response
    return `Hello **${name}**! I'm **Herric**, your workplace copilot.

Here is a quick snapshot of your day:
- **Pending Tasks**: ${pendingTasks.length} item(s) in queue
- **Today's Meetings**: ${todayMeetings.length} sync(s) scheduled
- **Active Tickets**: ${openTickets.length} open
- **Unread Emails**: ${unreadEmailsCount} awaiting review
${latestAnnouncement ? `- **Latest Broadcast**: "${latestAnnouncement.title}"` : ""}

How can I help you accelerate your work right now? You can ask me to summarize an email, draft a reply, break down a task, or review an IT ticket.`;
  };

  const aiResult = await callAiWithFallback({
    prompt: message,
    systemInstruction,
    history,
    fallbackFn,
  });

  return {
    ...aiResult,
    contextSnapshot: {
      pendingTasksCount: context.pendingTasks.length,
      todayMeetingsCount: context.todayMeetings.length,
      openTicketsCount: context.openTickets.length,
      unreadEmailsCount: context.unreadEmailsCount,
    },
  };
};

/**
 * Executive Daily Briefing for the Authenticated User
 */
export const getExecutiveBriefing = async (userId) => {
  const context = await getUserWorkspaceContext(userId);
  const { user, pendingTasks, todayMeetings, openTickets, unreadEmailsCount, latestAnnouncement, dateString } = context;
  const name = user?.firstName || "there";

  const prompt = `
Generate an executive morning briefing for ${name} (${user?.role || "Staff"}, ${user?.department || "General"} Department).
Date: ${dateString}.
Pending Tasks: ${pendingTasks.length} items.
Meetings Today: ${todayMeetings.length} syncs.
Open Tickets: ${openTickets.length} items.
Unread Emails: ${unreadEmailsCount}.
Latest Announcement: ${latestAnnouncement ? latestAnnouncement.title : "None"}.

Format the response with:
1. Executive Greeting signed from Herric.
2. High-level Day Overview.
3. 3 Priority Action Items recommended for ${name} today.
Keep it crisp, motivating, and professional.
`.trim();

  const fallbackFn = () => {
    const greetingHour = new Date().getHours();
    const timeGreeting = greetingHour < 12 ? "Good morning" : greetingHour < 17 ? "Good afternoon" : "Good evening";

    const topActions = [];
    if (todayMeetings.length > 0) {
      topActions.push(`Prepare for your upcoming sync: **${todayMeetings[0].title}** at **${todayMeetings[0].startTime}**.`);
    }
    if (pendingTasks.length > 0) {
      topActions.push(`Focus on high-priority task: **${pendingTasks[0].title}**.`);
    }
    if (unreadEmailsCount > 0) {
      topActions.push(`Clear your inbox queue (**${unreadEmailsCount}** unread messages).`);
    }
    if (topActions.length === 0) {
      topActions.push("Review sprint milestones and plan quarterly goals.", "Connect with team members on ongoing initiatives.");
    }

    return `### 🌅 ${timeGreeting}, ${name}!
Welcome to your executive briefing powered by **Herric**.

#### 📋 Today's Operational Pulse:
- **${todayMeetings.length}** Scheduled Sync(s) on your calendar.
- **${pendingTasks.length}** Deliverable(s) in your active task backlog.
- **${openTickets.length}** Open Support Ticket(s) requiring attention.
- **${unreadEmailsCount}** Unread Email(s) in your primary inbox.

#### 🎯 Recommended Priority Actions:
${topActions.map((action, idx) => `${idx + 1}. ${action}`).join("\n")}

*Wishing you a productive and high-impact day!*
— **Herric**, *Office Aid Operations Assistant*`;
  };

  const aiResult = await callAiWithFallback({
    prompt,
    systemInstruction: buildSystemInstruction(context),
    fallbackFn,
  });

  return {
    assistant: "Herric",
    date: dateString,
    briefingSummary: aiResult.reply,
    provider: aiResult.provider,
    stats: {
      pendingTasks: pendingTasks.length,
      todayMeetings: todayMeetings.length,
      openTickets: openTickets.length,
      unreadEmails: unreadEmailsCount,
    },
    agenda: {
      meetings: todayMeetings.map((m) => ({
        id: m.id,
        title: m.title,
        startTime: m.startTime,
        endTime: m.endTime,
        platform: m.platform,
        meetingLink: m.meetingLink,
      })),
      tasks: pendingTasks.map((t) => ({
        id: t.id,
        title: t.title,
        status: t.status,
        priority: t.priority,
        project: t.project?.title,
      })),
      tickets: openTickets.map((tk) => ({
        id: tk.id,
        ticketNumber: tk.ticketNumber,
        title: tk.title,
        priority: tk.priority,
        status: tk.status,
      })),
      announcement: latestAnnouncement
        ? {
            title: latestAnnouncement.title,
            category: latestAnnouncement.category,
            author: `${latestAnnouncement.author.firstName} ${latestAnnouncement.author.lastName}`,
          }
        : null,
    },
  };
};

/**
 * Summarize an Email Thread
 */
export const summarizeEmail = async (userId, { emailId, subject, content }) => {
  let emailSubject = subject || "Workplace Communication";
  let emailContent = content || "";

  if (emailId) {
    const email = await prisma.email.findUnique({
      where: { id: emailId },
      include: {
        sender: { select: { firstName: true, lastName: true, email: true } },
        recipient: { select: { firstName: true, lastName: true, email: true } },
      },
    });

    if (!email) {
      throw new ApiError(404, "Email not found with the specified ID");
    }

    // Ensure user has access to this email (sender, recipient, or admin)
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
    if (email.senderId !== userId && email.recipientId !== userId && user.role !== "ADMIN") {
      throw new ApiError(403, "You do not have permission to view or summarize this email");
    }

    emailSubject = email.subject;
    emailContent = `From: ${email.sender.firstName} ${email.sender.lastName} <${email.sender.email}>\nTo: ${email.recipient.firstName} ${email.recipient.lastName}\nSubject: ${email.subject}\n\n${email.body}`;
  }

  const prompt = `
Summarize the following internal workplace email as Herric:
Subject: ${emailSubject}
Content:
${emailContent}

Return a structured summary with:
1. Executive Summary (2-3 sentences)
2. Key Points (bullet points)
3. Action Items (actionable deliverables)
4. Assessed Urgency: (LOW / MEDIUM / HIGH / CRITICAL)
5. Recommended Follow-up
`.trim();

  const fallbackFn = () => {
    // Intelligent heuristic extraction
    const lines = emailContent.split("\n").filter((l) => l.trim().length > 0);
    const isUrgent =
      emailSubject.toLowerCase().includes("urgent") ||
      emailContent.toLowerCase().includes("asap") ||
      emailContent.toLowerCase().includes("deadline");

    return `### ✉️ Executive Email Summary
**Subject:** ${emailSubject}
**Assessed Urgency:** ${isUrgent ? "🔴 HIGH" : "🟢 MEDIUM"}

#### 📌 Overview:
This communication regarding **${emailSubject}** covers internal project synchronization and immediate operational requests.

#### 🔑 Key Takeaways:
- Discusses key workflow items and expectations.
- Requires team coordination to align deliverables.

#### ✅ Action Items:
1. Review the details provided in the thread.
2. Confirm receipt and provide estimated completion timeline if requested.
3. Coordinate with sender regarding any open dependencies.

*Prepared by Herric AI Assistant*`;
  };

  const aiResult = await callAiWithFallback({
    prompt,
    systemInstruction: "You are Herric, the elite email summarizer for Office Aid. Provide structured, precise markdown summaries.",
    fallbackFn,
  });

  return {
    assistant: "Herric",
    subject: emailSubject,
    summary: aiResult.reply,
    provider: aiResult.provider,
  };
};

/**
 * Draft an Email Reply
 */
export const draftEmailReply = async (userId, { emailId, subject, threadContent, instructions, tone = "PROFESSIONAL" }) => {
  let originalSubject = subject || "Re: Update";
  let contextSnippet = threadContent || "";

  if (emailId) {
    const email = await prisma.email.findUnique({
      where: { id: emailId },
      include: {
        sender: { select: { firstName: true, lastName: true } },
      },
    });

    if (email) {
      originalSubject = email.subject.startsWith("Re:") ? email.subject : `Re: ${email.subject}`;
      contextSnippet = `Sender: ${email.sender.firstName} ${email.sender.lastName}\nBody: ${email.body}`;
    }
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { firstName: true, lastName: true, jobTitle: true, department: true },
  });

  const prompt = `
Draft a workplace email reply as Herric for ${user.firstName} ${user.lastName} (${user.jobTitle || "Team Member"}).
Context Thread:
${contextSnippet}

User's Intent/Instructions: "${instructions}"
Desired Tone: ${tone}

Output format:
Subject: [Suggested Subject Line]
Body:
[Polished email body ready to send]
`.trim();

  const fallbackFn = () => {
    const toneSalutation = tone === "CASUAL" ? "Hi there," : "Hello,";
    const closing = tone === "CASUAL" ? "Cheers," : tone === "CONCISE" ? "Best," : "Best regards,";

    return `**Subject:** ${originalSubject}

${toneSalutation}

Thank you for reaching out. In reference to your previous message:

${instructions}

Please let me know if you need any additional clarification, and I will keep you posted on further updates.

${closing}
**${user.firstName} ${user.lastName}**
*${user.jobTitle || "Office Aid Team Member"}*`;
  };

  const aiResult = await callAiWithFallback({
    prompt,
    systemInstruction: `You are Herric, the executive email drafting assistant for Office Aid. Draft clear, professional emails according to user instructions.`,
    fallbackFn,
  });

  return {
    assistant: "Herric",
    tone,
    draft: aiResult.reply,
    provider: aiResult.provider,
  };
};

/**
 * IT Ticket Copilot Assist
 */
export const assistTicket = async (userId, { ticketId, title, description, category }) => {
  let ticketTitle = title || "";
  let ticketDesc = description || "";
  let ticketCategory = category || "SOFTWARE_TOOLS";
  let ticketNum = "NEW";

  if (ticketId) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        requester: { select: { firstName: true, lastName: true, email: true, department: true } },
        comments: {
          orderBy: { createdAt: "asc" },
          include: { author: { select: { firstName: true, lastName: true } } },
        },
      },
    });

    if (!ticket) {
      throw new ApiError(404, "Ticket not found with the specified ID");
    }

    ticketNum = ticket.ticketNumber;
    ticketTitle = ticket.title;
    ticketDesc = ticket.description;
    ticketCategory = ticket.category;
  }

  const prompt = `
You are Herric, the IT Helpdesk and System Operations Copilot for Office Aid.
Analyze the following IT support ticket:
Ticket Number: #${ticketNum}
Category: ${ticketCategory}
Title: ${ticketTitle}
Description: ${ticketDesc}

Provide:
1. Root Cause Hypothesis
2. Step-by-step Troubleshooting Protocol
3. Suggested Customer Response to the ticket requester
4. Suggested Priority / Escalation recommendation
`.trim();

  const fallbackFn = () => {
    return `### 🛠️ Herric IT Copilot Diagnostic Report
**Ticket Reference:** #${ticketNum} | **Category:** \`${ticketCategory}\`
**Subject:** "${ticketTitle}"

#### 🔍 Root Cause Analysis:
Based on category **${ticketCategory}** and symptom details, this issue likely relates to:
- Configuration mismatch or credential synchronization latency.
- Local cache or permissions flag not propagating to service endpoints.

#### 🔧 Recommended Troubleshooting Protocol:
1. Verify user profile permission attributes in the authentication directory.
2. Clear local browser session storage / credential cache and re-authenticate.
3. Validate endpoint health and database connection pooling telemetry.
4. If persisting, inspect container network logs for timeout or firewall blocks.

#### 💬 Suggested Response to Employee:
> "Hello! Thank you for reporting this issue with **${ticketTitle}**. We have isolated the initial diagnostic factors and are currently verifying permissions and cache status. Please attempt a fresh re-login in the meantime. We will update you here within our standard SLA window."

#### ⚡ Escalation Advice:
- Recommended Priority: **MEDIUM to HIGH** if impacting multi-user workflow.
- Recommended SLA: Respond within 2 hours.

*Generated by Herric IT Copilot*`;
  };

  const aiResult = await callAiWithFallback({
    prompt,
    systemInstruction: "You are Herric, the elite IT Helpdesk Copilot. Provide sharp technical diagnostics and empathetic user communications.",
    fallbackFn,
  });

  return {
    assistant: "Herric",
    ticketNumber: ticketNum,
    diagnosis: aiResult.reply,
    provider: aiResult.provider,
  };
};
