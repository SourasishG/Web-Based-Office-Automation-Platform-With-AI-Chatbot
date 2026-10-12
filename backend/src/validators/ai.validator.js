import { z } from "zod";

export const chatSchema = z.object({
  body: z.object({
    message: z.string().min(1, "Message cannot be empty"),
    history: z
      .array(
        z.object({
          role: z.enum(["user", "model", "assistant"]),
          content: z.string(),
        })
      )
      .optional()
      .default([]),
    contextMode: z.enum(["workspace", "general"]).optional().default("workspace"),
  }),
});

export const summarizeEmailSchema = z.object({
  body: z
    .object({
      emailId: z.string().uuid("Invalid email UUID format").optional(),
      subject: z.string().optional(),
      content: z.string().optional(),
    })
    .refine((data) => data.emailId || (data.content && data.content.trim().length > 0), {
      message: "Either emailId or content must be provided",
    }),
});

export const draftReplySchema = z.object({
  body: z.object({
    emailId: z.string().uuid("Invalid email UUID format").optional(),
    subject: z.string().optional(),
    threadContent: z.string().optional(),
    instructions: z.string().min(2, "Draft instructions must be at least 2 characters"),
    tone: z
      .enum(["PROFESSIONAL", "CASUAL", "CONCISE", "URGENT"])
      .optional()
      .default("PROFESSIONAL"),
  }),
});

export const ticketAssistSchema = z.object({
  body: z
    .object({
      ticketId: z.string().uuid("Invalid ticket UUID format").optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      category: z.string().optional(),
    })
    .refine(
      (data) =>
        data.ticketId ||
        (data.title && data.title.trim().length > 0 && data.description && data.description.trim().length > 0),
      {
        message: "Either ticketId or both title and description must be provided",
      }
    ),
});
