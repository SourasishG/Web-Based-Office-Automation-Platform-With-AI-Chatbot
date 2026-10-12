import * as notificationService from "../services/notification.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await notificationService.getNotifications(req.user.id, req.query);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Notifications retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = await notificationService.getNotificationStats(req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, stats, "Notification stats retrieved"));
  } catch (error) {
    next(error);
  }
};

export const markRead = async (req, res, next) => {
  try {
    const updated = await notificationService.markAsRead(req.params.id, req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Notification read status updated"));
  } catch (error) {
    next(error);
  }
};

export const markAllRead = async (req, res, next) => {
  try {
    await notificationService.markAllAsRead(req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "All notifications marked as read"));
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await notificationService.deleteNotification(req.params.id, req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Notification deleted successfully"));
  } catch (error) {
    next(error);
  }
};

export const clearAll = async (req, res, next) => {
  try {
    await notificationService.clearAllNotifications(req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "All notifications cleared"));
  } catch (error) {
    next(error);
  }
};
