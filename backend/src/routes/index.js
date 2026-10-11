import { Router } from "express";
import healthRouter from "./health.routes.js";
import authRouter from "./auth.routes.js";
import employeeRouter from "./employee.routes.js";
import projectRouter from "./project.routes.js";

const router = Router();

// Root v1 endpoints
router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/employees", employeeRouter);
router.use("/projects", projectRouter);

export default router;
