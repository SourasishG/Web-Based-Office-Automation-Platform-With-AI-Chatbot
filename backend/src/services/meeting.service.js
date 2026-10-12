import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * List meetings with date filters (today/upcoming/completed), search, and attendee info
 */
export const getMeetings = async (filters = {}) => {
  const { search, status, platform, page = 1, limit = 20 } = filters;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const where = {};

  if (platform && platform !== "all") {
    where.platform = platform;
  }

  // Handle special status filters matching frontend tabs
  if (status && status !== "all") {
    if (status === "today") {
      where.date = { gte: startOfToday, lte: endOfToday };
    } else if (status === "upcoming") {
      where.date = { gte: startOfToday };
      where.status = { notIn: ["COMPLETED", "CANCELLED"] };
    } else if (status === "completed" || status === "COMPLETED") {
      where.status = "COMPLETED";
    } else if (status === "cancelled" || status === "CANCELLED") {
      where.status = "CANCELLED";
    } else {
      where.status = status;
    }
  }

  if (search && search.trim()) {
    const query = search.trim();
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { host: { firstName: { contains: query, mode: "insensitive" } } },
      { host: { lastName: { contains: query, mode: "insensitive" } } },
    ];
  }

  const [total, meetings] = await Promise.all([
    prisma.meeting.count({ where }),
    prisma.meeting.findMany({
      where,
      skip,
      take,
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true,
            jobTitle: true,
          },
        },
        attendees: {
          select: {
            status: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
                jobTitle: true,
              },
            },
          },
        },
      },
    }),
  ]);

  return {
    meetings,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / take),
    },
  };
};

/**
 * Get hour-by-hour timeline schedule for a specific day
 */
export const getDailyTimeline = async (dateStr) => {
  const targetDate = dateStr ? new Date(dateStr) : new Date();
  const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 23, 59, 59, 999);

  const timeline = await prisma.meeting.findMany({
    where: {
      date: { gte: startOfDay, lte: endOfDay },
    },
    orderBy: { startTime: "asc" },
    include: {
      host: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true },
      },
      attendees: {
        select: {
          status: true,
          user: {
            select: { id: true, firstName: true, lastName: true, avatarUrl: true },
          },
        },
      },
    },
  });

  return timeline;
};

/**
 * Get next upcoming meetings widget data
 */
export const getUpcomingMeetings = async (limit = 5) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const upcoming = await prisma.meeting.findMany({
    where: {
      date: { gte: startOfToday },
      status: { notIn: ["COMPLETED", "CANCELLED"] },
    },
    take: Number(limit),
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    include: {
      host: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true },
      },
      attendees: {
        select: {
          user: {
            select: { id: true, firstName: true, lastName: true, avatarUrl: true },
          },
        },
      },
    },
  });

  return upcoming;
};

/**
 * Meeting statistics for header counters
 */
export const getMeetingStats = async () => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const [total, todayCount, upcomingCount, completedCount] = await Promise.all([
    prisma.meeting.count(),
    prisma.meeting.count({
      where: { date: { gte: startOfToday, lte: endOfToday } },
    }),
    prisma.meeting.count({
      where: {
        date: { gte: startOfToday },
        status: { notIn: ["COMPLETED", "CANCELLED"] },
      },
    }),
    prisma.meeting.count({ where: { status: "COMPLETED" } }),
  ]);

  return {
    total,
    todayCount,
    upcomingCount,
    completedCount,
  };
};

/**
 * Get meeting detail by ID
 */
export const getMeetingById = async (id) => {
  const meeting = await prisma.meeting.findUnique({
    where: { id },
    include: {
      host: {
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
      attendees: {
        include: {
          user: {
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
        },
      },
    },
  });

  if (!meeting) {
    throw new ApiError(404, "Meeting not found");
  }

  return meeting;
};

/**
 * Schedule a new meeting
 */
export const createMeeting = async (data, hostId) => {
  const { attendeeIds, date, ...meetingData } = data;

  const meeting = await prisma.meeting.create({
    data: {
      ...meetingData,
      date: new Date(date),
      hostId,
      attendees: {
        create: [
          // Automatically add host as accepted attendee
          { userId: hostId, status: "ACCEPTED" },
          ...(attendeeIds || [])
            .filter((id) => id !== hostId)
            .map((userId) => ({ userId, status: "PENDING" })),
        ],
      },
    },
    include: {
      host: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true },
      },
      attendees: {
        select: {
          status: true,
          user: {
            select: { id: true, firstName: true, lastName: true, avatarUrl: true },
          },
        },
      },
    },
  });

  return meeting;
};

/**
 * Update / Reschedule meeting
 */
export const updateMeeting = async (id, data) => {
  const exists = await prisma.meeting.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Meeting not found");
  }

  const { attendeeIds, date, ...updateData } = data;

  // Handle attendee replacement if specified
  if (attendeeIds && Array.isArray(attendeeIds)) {
    await prisma.meetingAttendee.deleteMany({ where: { meetingId: id } });
    await prisma.meetingAttendee.createMany({
      data: [
        { meetingId: id, userId: exists.hostId, status: "ACCEPTED" },
        ...attendeeIds
          .filter((userId) => userId !== exists.hostId)
          .map((userId) => ({ meetingId: id, userId, status: "PENDING" })),
      ],
      skipDuplicates: true,
    });
  }

  const updated = await prisma.meeting.update({
    where: { id },
    data: {
      ...updateData,
      ...(date ? { date: new Date(date) } : {}),
    },
    include: {
      host: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true },
      },
      attendees: {
        select: {
          status: true,
          user: {
            select: { id: true, firstName: true, lastName: true, avatarUrl: true },
          },
        },
      },
    },
  });

  return updated;
};

/**
 * Cancel or delete meeting
 */
export const deleteMeeting = async (id) => {
  const exists = await prisma.meeting.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Meeting not found");
  }

  await prisma.meeting.delete({ where: { id } });
  return true;
};
