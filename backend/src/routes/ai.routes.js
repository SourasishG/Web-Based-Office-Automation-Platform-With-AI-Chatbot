import { Router } from "express";
import * as aiController from "../controllers/ai.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  chatSchema,
  summarizeEmailSchema,
  draftReplySchema,
  ticketAssistSchema,
} from "../validators/ai.validator.js";

const router = Router();

// All AI endpoints require authentication
router.use(authenticate);

/**
 * @route   POST /api/v1/ai/chat
 * @desc    Global conversation with Herric (with real-time workspace context)
 * @access  Private
 */
router.post("/chat", validate(chatSchema), aiController.chat);

/**
 * @route   GET /api/v1/ai/briefing
 * @desc    Get executive daily briefing with tasks, meetings, and priority actions
 * @access  Private
 */
router.get("/briefing", aiController.getBriefing);

/**
 * @route   POST /api/v1/ai/summarize-email
 * @desc    Summarize an email thread and extract key action items
 * @access  Private
 */
router.post("/summarize-email", validate(summarizeEmailSchema), aiController.summarizeEmail);

/**
 * @route   POST /api/v1/ai/draft-reply
 * @desc    Draft an email reply with chosen tone and specific instructions
 * @access  Private
 */
router.post("/draft-reply", validate(draftReplySchema), aiController.draftReply);

/**
 * @route   POST /api/v1/ai/ticket-assist
 * @desc    Diagnostic analysis and suggested resolution steps for IT helpdesk tickets
 * @access  Private
 */
router.post("/ticket-assist", validate(ticketAssistSchema), aiController.ticketAssist);

export default router;
