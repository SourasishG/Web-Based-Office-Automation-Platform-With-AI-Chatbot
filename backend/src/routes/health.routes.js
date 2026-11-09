import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../config/prisma.js";

const router = Router();

/**
 * @route   GET /api/v1/health
 * @desc    Health check & server status endpoint with database connectivity diagnosis
 * @access  Public
 */
router.get("/", async (req, res) => {
  let dbStatus = "connected";
  let dbMessage = "Database is connected and operational";

  try {
    // Quick probe to verify database connectivity
    await prisma.$queryRaw`SELECT 1`;
  } catch (err) {
    dbStatus = "unreachable_or_paused";
    if (err?.message?.includes("tenant/user") || err?.message?.includes("ENOTFOUND")) {
      dbMessage = "Supabase PostgreSQL project appears to be paused. Please unpause in Supabase dashboard.";
    } else {
      dbMessage = err?.message || "Failed to reach database";
    }
  }

  const healthData = {
    status: dbStatus === "connected" ? "healthy" : "degraded",
    database: {
      status: dbStatus,
      message: dbMessage,
    },
    service: "Office Aid API Service",
    version: "1.0.0",
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  };

  const statusCode = dbStatus === "connected" ? 200 : 503;
  return res
    .status(statusCode)
    .json(
      new ApiResponse(
        statusCode,
        healthData,
        dbStatus === "connected"
          ? "Office Aid backend is healthy and running"
          : "Office Aid backend is running with database connection issues"
      )
    );
});

export default router;
