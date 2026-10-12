import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Aggregates core KPI metrics for the Executive Dashboard StatsGrid & Greeting
 */
export const getDashboardMetrics = async () => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const [
    activeProjects,
    pendingTasks,
    todaysSyncs,
    staffCount,
    openTickets,
    avgProgressResult,
    criticalTickets,
  ] = await Promise.all([
    prisma.project.count({ where: { status: "ACTIVE" } }),
    prisma.task.count({ where: { status: { not: "COMPLETED" } } }),
    prisma.meeting.count({
      where: { date: { gte: startOfToday, lte: endOfToday } },
    }),
    prisma.user.count(),
    prisma.ticket.count({
      where: { status: { in: ["OPEN", "IN_PROGRESS"] } },
    }),
    prisma.project.aggregate({
      _avg: { progress: true },
    }),
    prisma.ticket.count({
      where: { priority: "CRITICAL", status: { not: "RESOLVED" } },
    }),
  ]);

  return {
    activeProjects,
    pendingTasks,
    todaysSyncs,
    staffCount,
    openTickets,
    criticalTickets,
    averageProjectProgress: Math.round(avgProgressResult._avg.progress || 0),
  };
};

/**
 * Department headcount and percentage distribution for DepartmentChart.jsx
 */
export const getDepartmentDistribution = async () => {
  const [totalStaff, departmentGroups] = await Promise.all([
    prisma.user.count(),
    prisma.user.groupBy({
      by: ["department"],
      _count: { _all: true },
    }),
  ]);

  const distribution = departmentGroups
    .filter((d) => d.department)
    .map((d) => {
      const count = d._count._all;
      const percentage = totalStaff > 0 ? Math.round((count / totalStaff) * 100) : 0;
      return {
        department: d.department,
        count,
        percentage,
      };
    })
    .sort((a, b) => b.count - a.count);

  return {
    totalStaff,
    departments: distribution,
  };
};

/**
 * Get company announcements board with pinned items at the top
 */
export const getAnnouncements = async () => {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatarUrl: true,
          jobTitle: true,
        },
      },
    },
  });

  return announcements;
};

/**
 * Create a new announcement (Admin / Manager)
 */
export const createAnnouncement = async (data, authorId) => {
  const announcement = await prisma.announcement.create({
    data: {
      ...data,
      authorId,
    },
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
          jobTitle: true,
        },
      },
    },
  });

  return announcement;
};

/**
 * Delete an announcement
 */
export const deleteAnnouncement = async (id) => {
  const exists = await prisma.announcement.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Announcement not found");
  }

  await prisma.announcement.delete({ where: { id } });
  return true;
};
