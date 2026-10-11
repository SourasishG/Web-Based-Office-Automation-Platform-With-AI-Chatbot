import { Router } from "express";
import healthRouter from "./health.routes.js";

const router = Router();

// Root v1 endpoints
router.use("/health", healthRouter);

export default router;
