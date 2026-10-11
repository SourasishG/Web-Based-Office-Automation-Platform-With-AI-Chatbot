import { Router } from "express";
import healthRouter from "./health.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

// Root v1 endpoints
router.use("/health", healthRouter);
router.use("/auth", authRouter);

export default router;
