import * as emailService from "../services/email.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await emailService.getEmails(req.user.id, req.query);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Emails retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const getFolderCounts = async (req, res, next) => {
  try {
    const counts = await emailService.getEmailFolderCounts(req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, counts, "Email folder counters retrieved"));
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const email = await emailService.getEmailById(req.params.id, req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, email, "Email retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const compose = async (req, res, next) => {
  try {
    const email = await emailService.composeEmail(req.user.id, req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, email, "Email sent successfully"));
  } catch (error) {
    next(error);
  }
};

export const toggleStar = async (req, res, next) => {
  try {
    const updated = await emailService.toggleStar(req.params.id, req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Email star status updated"));
  } catch (error) {
    next(error);
  }
};

export const toggleRead = async (req, res, next) => {
  try {
    const updated = await emailService.toggleRead(req.params.id, req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Email read status updated"));
  } catch (error) {
    next(error);
  }
};

export const moveFolder = async (req, res, next) => {
  try {
    const updated = await emailService.moveToFolder(req.params.id, req.body.folder, req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Email moved to " + req.body.folder));
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await emailService.deleteEmail(req.params.id, req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Email deleted successfully"));
  } catch (error) {
    next(error);
  }
};
