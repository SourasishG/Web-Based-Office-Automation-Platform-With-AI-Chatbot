import { Router } from "express";
import * as ticketController from "../controllers/ticket.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  getTicketsQuerySchema,
  createTicketSchema,
  updateTicketSchema,
  addCommentSchema,
  ticketIdParamSchema,
} from "../validators/ticket.validator.js";

const router = Router();

// Protect all ticket routes with JWT
router.use(authenticate);

/**
 * @route   GET /api/v1/tickets/stats
 * @desc    Get queue statistics: total, open, in-progress, critical, resolved, breached
 * @access  Private
 */
router.get("/stats", ticketController.getStats);

/**
 * @route   GET /api/v1/tickets/kanban
 * @desc    Get tickets pre-grouped into Kanban columns for the helpdesk board
 * @access  Private
 */
router.get("/kanban", validate(getTicketsQuerySchema), ticketController.getKanban);

/**
 * @route   GET /api/v1/tickets
 * @desc    List support tickets with search, category, priority, and status filters
 * @access  Private
 */
router.get("/", validate(getTicketsQuerySchema), ticketController.getAll);

/**
 * @route   GET /api/v1/tickets/:id
 * @desc    Get full ticket details with comment conversation timeline
 * @access  Private
 */
router.get("/:id", validate(ticketIdParamSchema), ticketController.getById);

/**
 * @route   POST /api/v1/tickets
 * @desc    Submit a new IT support ticket
 * @access  Private
 */
router.post("/", validate(createTicketSchema), ticketController.create);

/**
 * @route   PATCH /api/v1/tickets/:id
 * @desc    Update ticket status, priority, assignee, or resolution notes
 * @access  Private
 */
router.patch("/:id", validate(updateTicketSchema), ticketController.update);

/**
 * @route   POST /api/v1/tickets/:id/comments
 * @desc    Add a message to the ticket conversation stream
 * @access  Private
 */
router.post("/:id/comments", validate(addCommentSchema), ticketController.addComment);

/**
 * @route   DELETE /api/v1/tickets/:id
 * @desc    Delete a support ticket
 * @access  Private
 */
router.delete("/:id", validate(ticketIdParamSchema), ticketController.remove);

export default router;
