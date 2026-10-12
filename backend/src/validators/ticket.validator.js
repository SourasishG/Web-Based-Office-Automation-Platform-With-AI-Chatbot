import { z } from "zod";
import { TicketCategory, TicketStatus, Priority } from "@prisma/client";

export const getTicketsQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    category: z.nativeEnum(TicketCategory).or(z.literal("all")).optional(),
    status: z.nativeEnum(TicketStatus).or(z.literal("all")).optional(),
    priority: z.nativeEnum(Priority).or(z.literal("all")).optional(),
    page: z.coerce.number().min(1).default(1).optional(),
    limit: z.coerce.number().min(1).max(100).default(20).optional(),
  }),
});

export const createTicketSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    category: z.nativeEnum(TicketCategory).default(TicketCategory.SOFTWARE_TOOLS).optional(),
    priority: z.nativeEnum(Priority).default(Priority.MEDIUM).optional(),
    assigneeId: z.string().uuid("Invalid assignee UUID").optional(),
    slaHours: z.number().min(1).max(720).optional(), // hours until SLA deadline
  }),
});

export const updateTicketSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ticket ID format"),
  }),
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(5).optional(),
    category: z.nativeEnum(TicketCategory).optional(),
    priority: z.nativeEnum(Priority).optional(),
    status: z.nativeEnum(TicketStatus).optional(),
    assigneeId: z.string().uuid().nullable().optional(),
    resolutionNotes: z.string().optional(),
  }),
});

export const addCommentSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ticket ID format"),
  }),
  body: z.object({
    message: z.string().min(1, "Comment message cannot be empty"),
    isAiGenerated: z.boolean().default(false).optional(),
  }),
});

export const ticketIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ticket ID format"),
  }),
});
