import * as employeeService from "../services/employee.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllEmployees = async (req, res, next) => {
  try {
    const result = await employeeService.getEmployees(req.query);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Employees retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = await employeeService.getEmployeeStats();
    return res
      .status(200)
      .json(new ApiResponse(200, stats, "Employee stats retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const getOrgChart = async (req, res, next) => {
  try {
    const orgTree = await employeeService.getOrgChart();
    return res
      .status(200)
      .json(new ApiResponse(200, orgTree, "Org chart retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, employee, "Employee profile retrieved"));
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await employeeService.updateEmployee(req.params.id, req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Employee updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Employee deleted successfully"));
  } catch (error) {
    next(error);
  }
};
