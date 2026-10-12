import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller.js";
import { authenticate, authorize } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  createAnnouncementSchema,
  announcementIdParamSchema,
} from "../validators/dashboard.validator.js";

const router = Router();

// Protect dashboard routes with JWT
router.use(authenticate);

/**
 * @route   GET /api/v1/dashboard/metrics
 * @desc    Get aggregate metrics for the 5-card StatsGrid (Projects, Tasks, Syncs, Staff, Tickets)
 * @access  Private
 */
router.get("/metrics", dashboardController.getMetrics);

/**
 * @route   GET /api/v1/dashboard/departments
 * @desc    Get department headcount breakdown and percentages for DepartmentChart.jsx
 * @access  Private
 */
router.get("/departments", dashboardController.getDepartments);

/**
 * @route   GET /api/v1/dashboard/announcements
 * @desc    Get company broadcast announcements board
 * @access  Private
 */
router.get("/announcements", dashboardController.getAnnouncements);

/**
 * @route   POST /api/v1/dashboard/announcements
 * @desc    Broadcast a new announcement (Admin & Manager)
 * @access  Private (Admin / Manager)
 */
router.post(
  "/announcements",
  authorize("ADMIN", "MANAGER"),
  validate(createAnnouncementSchema),
  dashboardController.createAnnouncement
);

/**
 * @route   DELETE /api/v1/dashboard/announcements/:id
 * @desc    Remove an announcement (Admin only)
 * @access  Private (Admin)
 */
router.delete(
  "/announcements/:id",
  authorize("ADMIN"),
  validate(announcementIdParamSchema),
  dashboardController.removeAnnouncement
);

export default router;
