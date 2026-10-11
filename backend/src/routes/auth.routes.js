import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/authenticate.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
router.post("/register", validate(registerSchema), authController.register);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticate user with email and password
 * @access  Public
 */
router.post("/login", validate(loginSchema), authController.login);

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get currently authenticated user profile
 * @access  Private (Requires JWT)
 */
router.get("/me", authenticate, authController.getMe);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Log out and clear session cookie
 * @access  Public
 */
router.post("/logout", authController.logout);

export default router;
