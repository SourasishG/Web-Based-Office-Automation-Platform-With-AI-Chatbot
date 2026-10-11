import { ApiError } from "../utils/ApiError.js";

/**
 * Generic request validator using Zod schemas
 * @param {import("zod").ZodSchema} schema
 */
export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!parsed.success) {
      const issueDetails = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(new ApiError(400, "Validation Failed", issueDetails));
    }

    // Assign sanitized/parsed data back to req
    if (parsed.data.body) req.body = parsed.data.body;
    if (parsed.data.params) req.params = parsed.data.params;
    if (parsed.data.query) {
      try {
        req.query = parsed.data.query;
      } catch {
        Object.assign(req.query, parsed.data.query);
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

export default validate;
