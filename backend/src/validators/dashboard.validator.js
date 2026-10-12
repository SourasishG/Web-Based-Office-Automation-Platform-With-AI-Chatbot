import { z } from "zod";

export const createAnnouncementSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(5, "Content must be at least 5 characters"),
    category: z.string().default("Company").optional(),
    isPinned: z.boolean().default(false).optional(),
  }),
});

export const announcementIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid announcement ID format"),
  }),
});
