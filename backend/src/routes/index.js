import { Router } from "express";
import healthRouter from "./health.routes.js";
import authRouter from "./auth.routes.js";
import employeeRouter from "./employee.routes.js";
import projectRouter from "./project.routes.js";
import taskRouter from "./task.routes.js";
import ticketRouter from "./ticket.routes.js";
import meetingRouter from "./meeting.routes.js";
import emailRouter from "./email.routes.js";
import notificationRouter from "./notification.routes.js";

const router = Router();

// Root v1 endpoints
router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/employees", employeeRouter);
router.use("/projects", projectRouter);
router.use("/tasks", taskRouter);
router.use("/tickets", ticketRouter);
router.use("/meetings", meetingRouter);
router.use("/emails", emailRouter);
router.use("/notifications", notificationRouter);

export default router;
