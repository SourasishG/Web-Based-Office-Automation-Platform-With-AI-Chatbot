import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * List workplace notifications for current user with category and read filters
 */
export const getNotifications = async (userId, filters = {}) => {
  const { category, isRead, priority, page = 1, limit = 20 } = filters;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where = { userId };

  if (category && category !== "all") {
    where.category = category;
  }

  if (isRead !== undefined && isRead !== "all") {
    where.isRead = isRead === "true";
  }

  if (priority && priority !== "all") {
    where.priority = priority;
  }

  const [total, notifications] = await Promise.all([
    prisma.notification.count({ where }),
    prisma.notification.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    notifications,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / take),
    },
  };
};

/**
 * Aggregates notification stats (total, unread, urgent, read)
 */
export const getNotificationStats = async (userId) => {
  const [total, unreadCount, urgentCount, readCount] = await Promise.all([
    prisma.notification.count({ where: { userId } }),
    prisma.notification.count({ where: { userId, isRead: false } }),
    prisma.notification.count({
      where: {
        userId,
        priority: { in: ["CRITICAL", "HIGH"] },
        isRead: false,
      },
    }),
    prisma.notification.count({ where: { userId, isRead: true } }),
  ]);

  return {
    total,
    unreadCount,
    urgentCount,
    readCount,
  };
};

/**
 * Toggle or mark notification as read
 */
export const markAsRead = async (id, userId) => {
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification || notification.userId !== userId) {
    throw new ApiError(404, "Notification not found");
  }

  const updated = await prisma.notification.update({
    where: { id },
    data: { isRead: !notification.isRead },
  });

  return updated;
};

/**
 * Mark all notifications for user as read
 */
export const markAllAsRead = async (userId) => {
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });

  return true;
};

/**
 * Delete single notification
 */
export const deleteNotification = async (id, userId) => {
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification || notification.userId !== userId) {
    throw new ApiError(404, "Notification not found");
  }

  await prisma.notification.delete({ where: { id } });
  return true;
};

/**
 * Clear all notifications for user
 */
export const clearAllNotifications = async (userId) => {
  await prisma.notification.deleteMany({ where: { userId } });
  return true;
};
