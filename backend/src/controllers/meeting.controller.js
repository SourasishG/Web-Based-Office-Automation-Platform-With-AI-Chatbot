import * as meetingService from "../services/meeting.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await meetingService.getMeetings(req.query);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Meetings retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const getTimeline = async (req, res, next) => {
  try {
    const timeline = await meetingService.getDailyTimeline(req.query.date);
    return res
      .status(200)
      .json(new ApiResponse(200, timeline, "Daily timeline retrieved"));
  } catch (error) {
    next(error);
  }
};

export const getUpcoming = async (req, res, next) => {
  try {
    const upcoming = await meetingService.getUpcomingMeetings(req.query.limit);
    return res
      .status(200)
      .json(new ApiResponse(200, upcoming, "Upcoming syncs retrieved"));
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = await meetingService.getMeetingStats();
    return res
      .status(200)
      .json(new ApiResponse(200, stats, "Meeting statistics retrieved"));
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const meeting = await meetingService.getMeetingById(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, meeting, "Meeting details retrieved"));
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const meeting = await meetingService.createMeeting(req.body, req.user.id);
    return res
      .status(201)
      .json(new ApiResponse(201, meeting, "Meeting scheduled successfully"));
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await meetingService.updateMeeting(req.params.id, req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Meeting updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await meetingService.deleteMeeting(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Meeting cancelled successfully"));
  } catch (error) {
    next(error);
  }
};
