import { ApiError } from "../utils/ApiError.js";

/**
 * Global Error Handling Middleware
 */
export const errorHandler = (err, req, res, _next) => {
  let error = err;

  // Detect Prisma database connectivity failures (e.g. paused Supabase project, network unreachable)
  const isDbUnavailable =
    err?.name === "PrismaClientInitializationError" ||
    (typeof err?.message === "string" &&
      (err.message.includes("tenant/user") ||
        err.message.includes("ENOTFOUND") ||
        err.message.includes("Can't reach database server") ||
        err.message.includes("P1001")));

  if (isDbUnavailable) {
    error = new ApiError(
      503,
      "Database unavailable: The Supabase PostgreSQL database is currently paused or unreachable. Please log in to https://supabase.com/dashboard and unpause or restore your project.",
      ["DATABASE_UNAVAILABLE"]
    );
  } else if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};

export default errorHandler;
