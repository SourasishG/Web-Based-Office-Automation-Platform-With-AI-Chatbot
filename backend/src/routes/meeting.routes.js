import { Router } from "express";
import * as meetingController from "../controllers/meeting.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  getMeetingsQuerySchema,
  getTimelineQuerySchema,
  createMeetingSchema,
  updateMeetingSchema,
  meetingIdParamSchema,
} from "../validators/meeting.validator.js";

const router = Router();

// Protect all meeting routes with JWT
router.use(authenticate);

/**
 * @route   GET /api/v1/meetings/stats
 * @desc    Get aggregate meeting counters: total, today, upcoming, completed
 * @access  Private
 */
router.get("/stats", meetingController.getStats);

/**
 * @route   GET /api/v1/meetings/timeline
 * @desc    Get hour-by-hour operational schedule for a specific day
 * @access  Private
 */
router.get("/timeline", validate(getTimelineQuerySchema), meetingController.getTimeline);

/**
 * @route   GET /api/v1/meetings/upcoming
 * @desc    Get next upcoming meetings list
 * @access  Private
 */
router.get("/upcoming", meetingController.getUpcoming);

/**
 * @route   GET /api/v1/meetings
 * @desc    List meetings with status tabs (today, upcoming, completed) and search
 * @access  Private
 */
router.get("/", validate(getMeetingsQuerySchema), meetingController.getAll);

/**
 * @route   GET /api/v1/meetings/:id
 * @desc    Get meeting details with host and attendee list
 * @access  Private
 */
router.get("/:id", validate(meetingIdParamSchema), meetingController.getById);

/**
 * @route   POST /api/v1/meetings
 * @desc    Schedule a new video sync (Meet / Zoom / Teams)
 * @access  Private
 */
router.post("/", validate(createMeetingSchema), meetingController.create);

/**
 * @route   PATCH /api/v1/meetings/:id
 * @desc    Reschedule or update meeting details
 * @access  Private
 */
router.patch("/:id", validate(updateMeetingSchema), meetingController.update);

/**
 * @route   DELETE /api/v1/meetings/:id
 * @desc    Cancel a meeting
 * @access  Private
 */
router.delete("/:id", validate(meetingIdParamSchema), meetingController.remove);

export default router;
