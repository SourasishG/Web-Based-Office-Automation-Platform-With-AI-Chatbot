import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma Client instance for Office Aid
 */
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

export default prisma;
