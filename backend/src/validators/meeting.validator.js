import { z } from "zod";
import { MeetingPlatform, MeetingStatus } from "@prisma/client";

export const getMeetingsQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    status: z.enum(["all", "today", "upcoming", "completed", "cancelled", "SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
    platform: z.nativeEnum(MeetingPlatform).or(z.literal("all")).optional(),
    page: z.coerce.number().min(1).default(1).optional(),
    limit: z.coerce.number().min(1).max(100).default(20).optional(),
  }),
});

export const getTimelineQuerySchema = z.object({
  query: z.object({
    date: z.string().optional(), // YYYY-MM-DD format or ISO string
  }),
});

export const createMeetingSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2, "Meeting title must be at least 2 characters"),
    description: z.string().trim().optional(),
    date: z.string().min(1, "Date is required"),
    startTime: z.string().trim().min(1, "Start time is required"),
    endTime: z.string().trim().min(1, "End time is required"),
    platform: z.nativeEnum(MeetingPlatform).default(MeetingPlatform.GOOGLE_MEET).optional(),
    meetingLink: z
      .string()
      .trim()
      .optional()
      .transform((val) => {
        if (!val || !val.trim()) return undefined;
        let trimmed = val.trim();
        if (!/^https?:\/\//i.test(trimmed)) {
          trimmed = `https://${trimmed}`;
        }
        return trimmed;
      })
      .pipe(z.string().url("Meeting link must be a valid URL").optional()),
    status: z.nativeEnum(MeetingStatus).default(MeetingStatus.SCHEDULED).optional(),
    attendeeIds: z.array(z.string().uuid("Invalid attendee UUID")).optional().default([]),
  }),
});

export const updateMeetingSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid meeting ID format"),
  }),
  body: z.object({
    title: z.string().trim().min(2).optional(),
    description: z.string().trim().optional(),
    date: z.string().optional(),
    startTime: z.string().trim().optional(),
    endTime: z.string().trim().optional(),
    platform: z.nativeEnum(MeetingPlatform).optional(),
    meetingLink: z
      .string()
      .trim()
      .optional()
      .transform((val) => {
        if (!val || !val.trim()) return undefined;
        let trimmed = val.trim();
        if (!/^https?:\/\//i.test(trimmed)) {
          trimmed = `https://${trimmed}`;
        }
        return trimmed;
      })
      .pipe(z.string().url("Meeting link must be a valid URL").optional()),
    status: z.nativeEnum(MeetingStatus).optional(),
    attendeeIds: z.array(z.string().uuid("Invalid attendee UUID")).optional(),
  }),
});

export const meetingIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid meeting ID format"),
  }),
});
