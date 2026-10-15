import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import v1Routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { ApiError } from "./utils/ApiError.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Core Middlewares
app.use(
  cors({
    origin: [CLIENT_URL, "http://localhost:5174", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Base Route
app.get("/", (req, res) => {
  res.json({
    name: "Office Aid API Service",
    status: "online",
    docs: "/api/v1/health",
  });
});

// API v1 Routes
app.use("/api/v1", v1Routes);

// 404 Handler for undefined routes
app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
});

// Centralized Error Handler
app.use(errorHandler);

// Start HTTP Server
app.listen(PORT, () => {
  console.log(`⚡ [Office Aid API] Server listening on http://localhost:${PORT}`);
  console.log(`🩺 [Health Check] Available at http://localhost:${PORT}/api/v1/health`);
});

export default app;
