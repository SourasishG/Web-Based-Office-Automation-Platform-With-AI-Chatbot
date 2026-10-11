import { z } from "zod";
import { ProjectStatus, Priority } from "@prisma/client";

export const getProjectsQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    status: z.nativeEnum(ProjectStatus).or(z.literal("all")).optional(),
    department: z.string().optional(),
    priority: z.nativeEnum(Priority).optional(),
    sortBy: z.enum(["title", "dueDate", "progress", "createdAt"]).default("createdAt").optional(),
    sortOrder: z.enum(["asc", "desc"]).default("desc").optional(),
    page: z.coerce.number().min(1).default(1).optional(),
    limit: z.coerce.number().min(1).max(100).default(20).optional(),
  }),
});

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(2, "Project title must be at least 2 characters"),
    description: z.string().optional(),
    department: z.string().min(1, "Department is required"),
    status: z.nativeEnum(ProjectStatus).default(ProjectStatus.ACTIVE).optional(),
    priority: z.nativeEnum(Priority).default(Priority.MEDIUM).optional(),
    progress: z.number().min(0).max(100).default(0).optional(),
    startDate: z.string().datetime().or(z.string().date()).optional(),
    dueDate: z.string().datetime().or(z.string().date()).optional(),
    memberIds: z.array(z.string().uuid("Invalid member UUID")).optional(),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid project ID format"),
  }),
  body: z.object({
    title: z.string().min(2).optional(),
    description: z.string().optional(),
    department: z.string().optional(),
    status: z.nativeEnum(ProjectStatus).optional(),
    priority: z.nativeEnum(Priority).optional(),
    progress: z.number().min(0).max(100).optional(),
    startDate: z.string().datetime().or(z.string().date()).nullable().optional(),
    dueDate: z.string().datetime().or(z.string().date()).nullable().optional(),
    memberIds: z.array(z.string().uuid()).optional(),
  }),
});

export const projectIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid project ID format"),
  }),
});
