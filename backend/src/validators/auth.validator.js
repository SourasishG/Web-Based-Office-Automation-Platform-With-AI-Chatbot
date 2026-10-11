import { z } from "zod";
import { Role } from "@prisma/client";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    department: z.string().optional(),
    jobTitle: z.string().optional(),
    role: z.nativeEnum(Role).optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});
