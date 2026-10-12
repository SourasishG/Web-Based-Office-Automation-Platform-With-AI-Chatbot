import * as dashboardService from "../services/dashboard.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getMetrics = async (req, res, next) => {
  try {
    const metrics = await dashboardService.getDashboardMetrics();
    return res
      .status(200)
      .json(new ApiResponse(200, metrics, "Executive dashboard metrics retrieved"));
  } catch (error) {
    next(error);
  }
};

export const getDepartments = async (req, res, next) => {
  try {
    const data = await dashboardService.getDepartmentDistribution();
    return res
      .status(200)
      .json(new ApiResponse(200, data, "Department distribution retrieved"));
  } catch (error) {
    next(error);
  }
};

export const getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await dashboardService.getAnnouncements();
    return res
      .status(200)
      .json(new ApiResponse(200, announcements, "Company announcements retrieved"));
  } catch (error) {
    next(error);
  }
};

export const createAnnouncement = async (req, res, next) => {
  try {
    const announcement = await dashboardService.createAnnouncement(req.body, req.user.id);
    return res
      .status(201)
      .json(new ApiResponse(201, announcement, "Announcement published successfully"));
  } catch (error) {
    next(error);
  }
};

export const removeAnnouncement = async (req, res, next) => {
  try {
    await dashboardService.deleteAnnouncement(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Announcement removed successfully"));
  } catch (error) {
    next(error);
  }
};
