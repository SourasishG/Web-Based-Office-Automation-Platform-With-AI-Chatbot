import { Router } from "express";
import * as employeeController from "../controllers/employee.controller.js";
import { authenticate, authorize } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  getEmployeesQuerySchema,
  updateEmployeeSchema,
  employeeIdParamSchema,
} from "../validators/employee.validator.js";

const router = Router();

// Protect all employee routes with JWT
router.use(authenticate);

/**
 * @route   GET /api/v1/employees/stats
 * @desc    Get aggregate headcount, status rates, and department counts
 * @access  Private
 */
router.get("/stats", employeeController.getStats);

/**
 * @route   GET /api/v1/employees/org-chart
 * @desc    Get visual tree hierarchy of leadership and reporting staff
 * @access  Private
 */
router.get("/org-chart", employeeController.getOrgChart);

/**
 * @route   GET /api/v1/employees
 * @desc    List staff with search query, department, status filter, and pagination
 * @access  Private
 */
router.get("/", validate(getEmployeesQuerySchema), employeeController.getAllEmployees);

/**
 * @route   GET /api/v1/employees/:id
 * @desc    Get detailed employee profile
 * @access  Private
 */
router.get("/:id", validate(employeeIdParamSchema), employeeController.getById);

/**
 * @route   PATCH /api/v1/employees/:id
 * @desc    Update employee profile attributes
 * @access  Private
 */
router.patch("/:id", validate(updateEmployeeSchema), employeeController.update);

/**
 * @route   DELETE /api/v1/employees/:id
 * @desc    Delete employee (Admin only)
 * @access  Private (Admin)
 */
router.delete("/:id", authorize("ADMIN"), validate(employeeIdParamSchema), employeeController.remove);

export default router;
