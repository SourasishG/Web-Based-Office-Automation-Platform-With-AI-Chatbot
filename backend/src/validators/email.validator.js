import { z } from "zod";
import { EmailFolder } from "@prisma/client";

export const getEmailsQuerySchema = z.object({
  query: z.object({
    folder: z.nativeEnum(EmailFolder).or(z.literal("all")).default(EmailFolder.INBOX).optional(),
    category: z.string().optional(),
    search: z.string().optional(),
    page: z.coerce.number().min(1).default(1).optional(),
    limit: z.coerce.number().min(1).max(100).default(20).optional(),
  }),
});

export const composeEmailSchema = z.object({
  body: z.object({
    recipientId: z.string().uuid("Invalid recipient UUID").optional(),
    recipientEmail: z.string().email("Invalid recipient email").optional(),
    subject: z.string().min(1, "Subject is required"),
    body: z.string().min(1, "Email body cannot be empty"),
    category: z.string().default("Project Sync").optional(),
    folder: z.nativeEnum(EmailFolder).default(EmailFolder.INBOX).optional(),
  }),
});

export const emailIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid email ID format"),
  }),
});

export const moveFolderSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid email ID format"),
  }),
  body: z.object({
    folder: z.nativeEnum(EmailFolder),
  }),
});
