import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Authentication Middleware: Validates Bearer token or cookie and attaches req.user
 */
export const authenticate = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check Authorization Header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    // 2. Check HTTP-Only Cookie fallback
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new ApiError(401, "Authentication token missing. Please log in.");
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      throw new ApiError(401, "Invalid authentication token.");
    }

    // 4. Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        department: true,
        jobTitle: true,
        avatarUrl: true,
        presenceStatus: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "User session has expired or no longer exists.");
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Token has expired. Please log in again."));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid token signature."));
    }
    return next(error);
  }
};

/**
 * Role-Based Access Control (RBAC) Middleware
 * @param  {...string} allowedRoles (e.g. 'ADMIN', 'MANAGER')
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required."));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Access forbidden: requires ${allowedRoles.join(" or ")} role`
        )
      );
    }

    return next();
  };
};

export default authenticate;
