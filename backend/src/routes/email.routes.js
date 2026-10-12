import { Router } from "express";
import * as emailController from "../controllers/email.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  getEmailsQuerySchema,
  composeEmailSchema,
  emailIdParamSchema,
  moveFolderSchema,
} from "../validators/email.validator.js";

const router = Router();

// Protect all email routes with JWT
router.use(authenticate);

/**
 * @route   GET /api/v1/emails/counts
 * @desc    Get folder count badges and unread indicator for sidebar navigation
 * @access  Private
 */
router.get("/counts", emailController.getFolderCounts);

/**
 * @route   GET /api/v1/emails
 * @desc    List emails by folder (Inbox, Starred, Sent, Drafts, Trash)
 * @access  Private
 */
router.get("/", validate(getEmailsQuerySchema), emailController.getAll);

/**
 * @route   GET /api/v1/emails/:id
 * @desc    Get single email details and auto-mark as read
 * @access  Private
 */
router.get("/:id", validate(emailIdParamSchema), emailController.getById);

/**
 * @route   POST /api/v1/emails
 * @desc    Compose and send internal workplace email
 * @access  Private
 */
router.post("/", validate(composeEmailSchema), emailController.compose);

/**
 * @route   PATCH /api/v1/emails/:id/star
 * @desc    Toggle starred status
 * @access  Private
 */
router.patch("/:id/star", validate(emailIdParamSchema), emailController.toggleStar);

/**
 * @route   PATCH /api/v1/emails/:id/read
 * @desc    Toggle read status
 * @access  Private
 */
router.patch("/:id/read", validate(emailIdParamSchema), emailController.toggleRead);

/**
 * @route   PATCH /api/v1/emails/:id/folder
 * @desc    Move email to a different folder (e.g. TRASH)
 * @access  Private
 */
router.patch("/:id/folder", validate(moveFolderSchema), emailController.moveFolder);

/**
 * @route   DELETE /api/v1/emails/:id
 * @desc    Permanently delete email
 * @access  Private
 */
router.delete("/:id", validate(emailIdParamSchema), emailController.remove);

export default router;
