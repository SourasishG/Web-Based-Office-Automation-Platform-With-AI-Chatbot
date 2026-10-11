import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  getProjectsQuerySchema,
  createProjectSchema,
  updateProjectSchema,
  projectIdParamSchema,
} from "../validators/project.validator.js";

const router = Router();

// Protect all project routes with JWT
router.use(authenticate);

/**
 * @route   GET /api/v1/projects/stats
 * @desc    Get aggregate project counters and average progress rate
 * @access  Private
 */
router.get("/stats", projectController.getStats);

/**
 * @route   GET /api/v1/projects
 * @desc    List projects with search, status tabs, and dynamic sorting
 * @access  Private
 */
router.get("/", validate(getProjectsQuerySchema), projectController.getAllProjects);

/**
 * @route   GET /api/v1/projects/:id
 * @desc    Get detailed project by ID with members and tasks
 * @access  Private
 */
router.get("/:id", validate(projectIdParamSchema), projectController.getById);

/**
 * @route   POST /api/v1/projects
 * @desc    Create a new project
 * @access  Private
 */
router.post("/", validate(createProjectSchema), projectController.create);

/**
 * @route   PATCH /api/v1/projects/:id
 * @desc    Update project progress, status, or details
 * @access  Private
 */
router.patch("/:id", validate(updateProjectSchema), projectController.update);

/**
 * @route   DELETE /api/v1/projects/:id
 * @desc    Delete a project
 * @access  Private
 */
router.delete("/:id", validate(projectIdParamSchema), projectController.remove);

export default router;
