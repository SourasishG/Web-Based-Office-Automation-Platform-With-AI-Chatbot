import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Calculate default SLA deadline in hours based on priority
 */
const getDefaultSlaHours = (priority) => {
  switch (priority) {
    case "CRITICAL":
      return 4;
    case "HIGH":
      return 12;
    case "MEDIUM":
      return 24;
    case "LOW":
      return 72;
    default:
      return 24;
  }
};

/**
 * List support tickets with search, category, priority, and status filters
 */
export const getTickets = async (filters = {}) => {
  const { search, category, status, priority, page = 1, limit = 20 } = filters;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where = {};

  if (category && category !== "all") {
    where.category = category;
  }

  if (status && status !== "all") {
    where.status = status.toUpperCase();
  }

  if (priority && priority !== "all") {
    where.priority = priority.toUpperCase();
  }

  if (search && search.trim()) {
    const query = search.trim();
    where.OR = [
      { ticketNumber: { contains: query, mode: "insensitive" } },
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { requester: { firstName: { contains: query, mode: "insensitive" } } },
      { requester: { lastName: { contains: query, mode: "insensitive" } } },
    ];
  }

  const [total, tickets] = await Promise.all([
    prisma.ticket.count({ where }),
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        requester: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true,
            department: true,
          },
        },
        assignee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true,
            jobTitle: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    }),
  ]);

  return {
    tickets,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / take),
    },
  };
};

/**
 * Queue summary statistics (counters for header widget)
 */
export const getTicketStats = async () => {
  const now = new Date();

  const [total, openCount, inProgressCount, reviewCount, resolvedCount, criticalCount, slaBreachedCount] =
    await Promise.all([
      prisma.ticket.count(),
      prisma.ticket.count({ where: { status: "OPEN" } }),
      prisma.ticket.count({ where: { status: "IN_PROGRESS" } }),
      prisma.ticket.count({ where: { status: "REVIEW" } }),
      prisma.ticket.count({ where: { status: "RESOLVED" } }),
      prisma.ticket.count({ where: { priority: "CRITICAL" } }),
      prisma.ticket.count({
        where: {
          status: { not: "RESOLVED" },
          slaDueAt: { lt: now },
        },
      }),
    ]);

  return {
    total,
    openCount,
    inProgressCount,
    reviewCount,
    resolvedCount,
    criticalCount,
    slaBreachedCount,
  };
};

/**
 * Get Ticket Kanban Board: grouped into OPEN, IN_PROGRESS, REVIEW, RESOLVED
 */
export const getTicketKanban = async (filters = {}) => {
  const result = await getTickets({ ...filters, limit: 100 });

  const board = {
    OPEN: [],
    IN_PROGRESS: [],
    REVIEW: [],
    RESOLVED: [],
  };

  result.tickets.forEach((ticket) => {
    if (board[ticket.status]) {
      board[ticket.status].push(ticket);
    }
  });

  return board;
};

/**
 * Get ticket details with complete comment conversation timeline
 */
export const getTicketById = async (id) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      requester: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatarUrl: true,
          department: true,
          jobTitle: true,
        },
      },
      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatarUrl: true,
          jobTitle: true,
          department: true,
        },
      },
      comments: {
        orderBy: { createdAt: "asc" },
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
              role: true,
            },
          },
        },
      },
    },
  });

  if (!ticket) {
    throw new ApiError(404, "Ticket not found");
  }

  return ticket;
};

/**
 * Create a new support ticket with auto-generated ticketNumber & calculated SLA
 */
export const createTicket = async (data, requesterId) => {
  const { slaHours, priority = "MEDIUM", ...ticketData } = data;

  // Generate unique formatted ticket number (e.g. TCK-404)
  const count = await prisma.ticket.count();
  const ticketNumber = `TCK-${401 + count}`;

  const hours = slaHours || getDefaultSlaHours(priority);
  const slaDueAt = new Date(Date.now() + hours * 60 * 60 * 1000);

  const ticket = await prisma.ticket.create({
    data: {
      ...ticketData,
      ticketNumber,
      priority,
      slaDueAt,
      requesterId,
    },
    include: {
      requester: {
        select: { id: true, firstName: true, lastName: true, email: true, avatarUrl: true },
      },
      assignee: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true },
      },
    },
  });

  return ticket;
};

/**
 * Update ticket status, assignee, or resolution notes
 */
export const updateTicket = async (id, data) => {
  const exists = await prisma.ticket.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Ticket not found");
  }

  const updatePayload = { ...data };

  // Set resolvedAt timestamp if status moved to RESOLVED
  if (data.status === "RESOLVED" && exists.status !== "RESOLVED") {
    updatePayload.resolvedAt = new Date();
  }

  const updated = await prisma.ticket.update({
    where: { id },
    data: updatePayload,
    include: {
      requester: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
      assignee: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
    },
  });

  return updated;
};

/**
 * Add message to ticket comment timeline
 */
export const addComment = async (ticketId, authorId, data) => {
  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  if (!ticket) {
    throw new ApiError(404, "Ticket not found");
  }

  const comment = await prisma.ticketComment.create({
    data: {
      ticketId,
      authorId,
      message: data.message,
      isAiGenerated: data.isAiGenerated || false,
    },
    include: {
      author: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true, role: true },
      },
    },
  });

  return comment;
};

/**
 * Delete ticket
 */
export const deleteTicket = async (id) => {
  const exists = await prisma.ticket.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Ticket not found");
  }

  await prisma.ticket.delete({ where: { id } });
  return true;
};
