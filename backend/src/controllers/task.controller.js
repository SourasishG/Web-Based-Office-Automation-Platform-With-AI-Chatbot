import * as taskService from "../services/task.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAll = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.query);
    return res
      .status(200)
      .json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const getBoard = async (req, res, next) => {
  try {
    const board = await taskService.getKanbanBoard(req.query);
    return res
      .status(200)
      .json(new ApiResponse(200, board, "Kanban board retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = await taskService.getTaskStats(req.query.projectId);
    return res
      .status(200)
      .json(new ApiResponse(200, stats, "Task statistics retrieved"));
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, task, "Task details retrieved"));
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, task, "Task created successfully"));
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await taskService.updateTask(req.params.id, req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Task updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const reorder = async (req, res, next) => {
  try {
    const reordered = await taskService.reorderTask(req.params.id, req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, reordered, "Task reordered successfully"));
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Task deleted successfully"));
  } catch (error) {
    next(error);
  }
};
