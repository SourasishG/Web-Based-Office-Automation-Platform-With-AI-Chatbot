import * as projectService from "../services/project.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllProjects = async (req, res, next) => {
  try {
    const result = await projectService.getProjects(req.query);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Projects retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = await projectService.getProjectStats();
    return res
      .status(200)
      .json(new ApiResponse(200, stats, "Project statistics retrieved"));
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, project, "Project details retrieved"));
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body, req.user.id);
    return res
      .status(201)
      .json(new ApiResponse(201, project, "Project created successfully"));
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await projectService.updateProject(req.params.id, req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Project updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Project deleted successfully"));
  } catch (error) {
    next(error);
  }
};
