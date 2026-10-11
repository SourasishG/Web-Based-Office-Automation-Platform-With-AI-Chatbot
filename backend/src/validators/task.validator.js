import { z } from "zod";
import { TaskStatus, Priority } from "@prisma/client";

const subtaskItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  completed: z.boolean().default(false),
});

export const getTasksQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    status: z.nativeEnum(TaskStatus).or(z.literal("all")).optional(),
    priority: z.nativeEnum(Priority).or(z.literal("all")).optional(),
    projectId: z.string().uuid().optional(),
    assigneeId: z.string().uuid().optional(),
  }),
});

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(2, "Task title must be at least 2 characters"),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus).default(TaskStatus.TODO).optional(),
    priority: z.nativeEnum(Priority).default(Priority.MEDIUM).optional(),
    dueDate: z.string().datetime().or(z.string().date()).optional(),
    orderIndex: z.number().default(0).optional(),
    projectId: z.string().uuid("Invalid project UUID").optional(),
    assigneeId: z.string().uuid("Invalid assignee UUID").optional(),
    subtasks: z.array(subtaskItemSchema).default([]).optional(),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid task ID format"),
  }),
  body: z.object({
    title: z.string().min(2).optional(),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus).optional(),
    priority: z.nativeEnum(Priority).optional(),
    dueDate: z.string().datetime().or(z.string().date()).nullable().optional(),
    orderIndex: z.number().optional(),
    projectId: z.string().uuid().nullable().optional(),
    assigneeId: z.string().uuid().nullable().optional(),
    subtasks: z.array(subtaskItemSchema).optional(),
  }),
});

export const reorderTaskSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid task ID format"),
  }),
  body: z.object({
    status: z.nativeEnum(TaskStatus),
    orderIndex: z.number(),
  }),
});

export const taskIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid task ID format"),
  }),
});
