import { Router } from "express";
import * as notificationController from "../controllers/notification.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  getNotificationsQuerySchema,
  notificationIdParamSchema,
} from "../validators/notification.validator.js";

const router = Router();

// Protect all notification routes with JWT
router.use(authenticate);

/**
 * @route   GET /api/v1/notifications/stats
 * @desc    Get aggregate alert statistics and unread counter
 * @access  Private
 */
router.get("/stats", notificationController.getStats);

/**
 * @route   GET /api/v1/notifications
 * @desc    List notifications with category and read status filters
 * @access  Private
 */
router.get("/", validate(getNotificationsQuerySchema), notificationController.getAll);

/**
 * @route   PATCH /api/v1/notifications/read-all
 * @desc    Mark all notifications for user as read
 * @access  Private
 */
router.patch("/read-all", notificationController.markAllRead);

/**
 * @route   DELETE /api/v1/notifications/clear-all
 * @desc    Clear all notifications for user
 * @access  Private
 */
router.delete("/clear-all", notificationController.clearAll);

/**
 * @route   PATCH /api/v1/notifications/:id/read
 * @desc    Toggle single notification read status
 * @access  Private
 */
router.patch("/:id/read", validate(notificationIdParamSchema), notificationController.markRead);

/**
 * @route   DELETE /api/v1/notifications/:id
 * @desc    Delete single notification
 * @access  Private
 */
router.delete("/:id", validate(notificationIdParamSchema), notificationController.remove);

export default router;
