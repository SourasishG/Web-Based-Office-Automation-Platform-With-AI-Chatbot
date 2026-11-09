import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";

/**
 * Singleton base Prisma Client with event-based logging to intercept raw engine errors
 */
const basePrisma = new PrismaClient({
  log: [
    { emit: "event", level: "error" },
    { emit: "event", level: "warn" },
  ],
});

// Cleanly handle Prisma database connection and query errors
basePrisma.$on("error", (e) => {
  const msg = e.message || "";
  if (msg.includes("tenant/user") || msg.includes("ENOTFOUND") || msg.includes("Can't reach database server") || msg.includes("P1001")) {
    console.error("⚠️ [Database Notice]: Supabase PostgreSQL database is currently paused or unreachable.");
    console.error("💡 To restore: Log into https://supabase.com/dashboard and unpause or restore your project.");
  } else {
    console.error("⚠️ [Database Query Error]:", msg);
  }
});

basePrisma.$on("warn", (e) => {
  console.warn("⚠️ [Database Warning]:", e.message);
});

/**
 * Extended Prisma Client with defensive input guards.
 * Prevents "Invalid prisma.<model>.findUnique() invocation" when undefined criteria is passed.
 */
const prisma = basePrisma.$extends({
  query: {
    $allModels: {
      async findUnique({ model, operation: _operation, args, query }) {
        if (!args || !args.where) {
          return null;
        }

        // If any unique filter property is undefined, null, or string "undefined", safely return null
        for (const [, val] of Object.entries(args.where)) {
          if (val === undefined || val === null || val === "undefined" || val === "") {
            return null;
          }
        }

        return query(args);
      },

      async findUniqueOrThrow({ model, operation: _operation, args, query }) {
        if (!args || !args.where) {
          throw new ApiError(404, `${model} not found`);
        }

        for (const [, val] of Object.entries(args.where)) {
          if (val === undefined || val === null || val === "undefined" || val === "") {
            throw new ApiError(404, `${model} not found`);
          }
        }

        return query(args);
      },

      async findFirst({ model: _model, operation: _operation, args, query }) {
        if (args && args.where) {
          // Clean up any undefined fields in where clause
          for (const [k, v] of Object.entries(args.where)) {
            if (v === undefined || v === "undefined") {
              delete args.where[k];
            }
          }
        }
        return query(args);
      },

      async update({ model, operation: _operation, args, query }) {
        if (!args || !args.where || !args.where.id || args.where.id === "undefined") {
          throw new ApiError(400, `Valid ${model} ID is required for update`);
        }
        return query(args);
      },

      async delete({ model, operation: _operation, args, query }) {
        if (!args || !args.where || !args.where.id || args.where.id === "undefined") {
          throw new ApiError(400, `Valid ${model} ID is required for deletion`);
        }
        return query(args);
      },
    },
  },
});

export default prisma;
