import * as authService from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Cookie options
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.registerUser(req.body);

    res.cookie("token", token, COOKIE_OPTIONS);

    return res
      .status(201)
      .json(new ApiResponse(201, { user, token }, "Account registered successfully"));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    res.cookie("token", token, COOKIE_OPTIONS);

    return res
      .status(200)
      .json(new ApiResponse(200, { user, token }, "Login successful"));
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const profile = await authService.getUserById(req.user.id);

    return res
      .status(200)
      .json(new ApiResponse(200, profile, "User profile retrieved"));
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", COOKIE_OPTIONS);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};
