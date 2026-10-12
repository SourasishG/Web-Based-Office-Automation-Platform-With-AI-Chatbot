import { z } from "zod";
import { NotificationCategory, Priority } from "@prisma/client";

export const getNotificationsQuerySchema = z.object({
  query: z.object({
    category: z.nativeEnum(NotificationCategory).or(z.literal("all")).optional(),
    isRead: z.enum(["all", "true", "false"]).optional(),
    priority: z.nativeEnum(Priority).or(z.literal("all")).optional(),
    page: z.coerce.number().min(1).default(1).optional(),
    limit: z.coerce.number().min(1).max(100).default(20).optional(),
  }),
});

export const notificationIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid notification ID format"),
  }),
});
