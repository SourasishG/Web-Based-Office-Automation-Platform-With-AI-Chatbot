import { z } from "zod";
import { PresenceStatus, Role } from "@prisma/client";

export const getEmployeesQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    department: z.string().optional(),
    status: z.nativeEnum(PresenceStatus).optional(),
    page: z.coerce.number().min(1).default(1).optional(),
    limit: z.coerce.number().min(1).max(100).default(20).optional(),
  }),
});

export const updateEmployeeSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid employee ID format"),
  }),
  body: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    jobTitle: z.string().optional(),
    department: z.string().optional(),
    role: z.nativeEnum(Role).optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    presenceStatus: z.nativeEnum(PresenceStatus).optional(),
    skills: z.array(z.string()).optional(),
    avatarUrl: z.string().url().optional(),
    managerId: z.string().uuid().nullable().optional(),
  }),
});

export const employeeIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid employee ID format"),
  }),
});
