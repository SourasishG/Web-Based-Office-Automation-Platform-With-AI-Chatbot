import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

/**
 * @route   GET /api/v1/health
 * @desc    Health check & server status endpoint
 * @access  Public
 */
router.get("/", (req, res) => {
  const healthData = {
    status: "ok",
    service: "Office Aid API Service",
    version: "1.0.0",
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  };

  return res
    .status(200)
    .json(new ApiResponse(200, healthData, "Office Aid backend is healthy and running"));
});

export default router;
