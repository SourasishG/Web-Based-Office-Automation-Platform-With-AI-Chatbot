import { ApiResponse } from "../utils/ApiResponse.js";
import * as aiService from "../services/ai.service.js";

/**
 * @route   POST /api/v1/ai/chat
 * @desc    Chat with Herric, the AI workplace assistant with live database context
 * @access  Private
 */
export const chat = async (req, res, next) => {
  try {
    const result = await aiService.chatWithHerric(req.user.id, req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Herric response generated successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/v1/ai/briefing
 * @desc    Get executive daily briefing customized for the authenticated user
 * @access  Private
 */
export const getBriefing = async (req, res, next) => {
  try {
    const result = await aiService.getExecutiveBriefing(req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Executive briefing retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/v1/ai/summarize-email
 * @desc    Summarize an email thread and extract key action items
 * @access  Private
 */
export const summarizeEmail = async (req, res, next) => {
  try {
    const result = await aiService.summarizeEmail(req.user.id, req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Email summary generated successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/v1/ai/draft-reply
 * @desc    Draft a polished email response based on user instructions and tone
 * @access  Private
 */
export const draftReply = async (req, res, next) => {
  try {
    const result = await aiService.draftEmailReply(req.user.id, req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Email draft generated successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/v1/ai/ticket-assist
 * @desc    Get root-cause diagnosis, troubleshooting steps, and draft reply for IT tickets
 * @access  Private
 */
export const ticketAssist = async (req, res, next) => {
  try {
    const result = await aiService.assistTicket(req.user.id, req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Ticket diagnosis and resolution generated"));
  } catch (error) {
    next(error);
  }
};
