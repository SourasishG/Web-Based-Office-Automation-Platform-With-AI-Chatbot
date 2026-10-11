import { Router } from "express";
import healthRouter from "./health.routes.js";
import authRouter from "./auth.routes.js";
import employeeRouter from "./employee.routes.js";

const router = Router();

// Root v1 endpoints
router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/employees", employeeRouter);

export default router;
