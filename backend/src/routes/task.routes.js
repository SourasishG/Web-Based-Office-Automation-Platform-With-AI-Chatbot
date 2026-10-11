import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  getTasksQuerySchema,
  createTaskSchema,
  updateTaskSchema,
  reorderTaskSchema,
  taskIdParamSchema,
} from "../validators/task.validator.js";

const router = Router();

// Protect all task routes with JWT
router.use(authenticate);

/**
 * @route   GET /api/v1/tasks/kanban
 * @desc    Get tasks organized into Kanban columns (TODO, IN_PROGRESS, REVIEW, COMPLETED)
 * @access  Private
 */
router.get("/kanban", validate(getTasksQuerySchema), taskController.getBoard);

/**
 * @route   GET /api/v1/tasks/stats
 * @desc    Get aggregate task metrics, critical counter, and overdue tasks
 * @access  Private
 */
router.get("/stats", taskController.getStats);

/**
 * @route   GET /api/v1/tasks
 * @desc    List tasks with search, priority, project, and assignee filters
 * @access  Private
 */
router.get("/", validate(getTasksQuerySchema), taskController.getAll);

/**
 * @route   GET /api/v1/tasks/:id
 * @desc    Get single task details
 * @access  Private
 */
router.get("/:id", validate(taskIdParamSchema), taskController.getById);

/**
 * @route   POST /api/v1/tasks
 * @desc    Create a new task with priority, subtasks, and assignment
 * @access  Private
 */
router.post("/", validate(createTaskSchema), taskController.create);

/**
 * @route   PATCH /api/v1/tasks/:id
 * @desc    Update task details or subtask progress
 * @access  Private
 */
router.patch("/:id", validate(updateTaskSchema), taskController.update);

/**
 * @route   PATCH /api/v1/tasks/:id/reorder
 * @desc    Drag-and-drop reorder task across/within Kanban columns
 * @access  Private
 */
router.patch("/:id/reorder", validate(reorderTaskSchema), taskController.reorder);

/**
 * @route   DELETE /api/v1/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
router.delete("/:id", validate(taskIdParamSchema), taskController.remove);

export default router;
