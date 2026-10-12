import * as ticketService from "../services/ticket.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await ticketService.getTickets(req.query);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Tickets retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = await ticketService.getTicketStats();
    return res
      .status(200)
      .json(new ApiResponse(200, stats, "Ticket queue stats retrieved"));
  } catch (error) {
    next(error);
  }
};

export const getKanban = async (req, res, next) => {
  try {
    const board = await ticketService.getTicketKanban(req.query);
    return res
      .status(200)
      .json(new ApiResponse(200, board, "Ticket Kanban board retrieved"));
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, ticket, "Ticket details retrieved"));
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const ticket = await ticketService.createTicket(req.body, req.user.id);
    return res
      .status(201)
      .json(new ApiResponse(201, ticket, "Ticket submitted successfully"));
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await ticketService.updateTicket(req.params.id, req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Ticket updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const comment = await ticketService.addComment(req.params.id, req.user.id, req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, comment, "Comment added to ticket"));
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await ticketService.deleteTicket(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Ticket deleted successfully"));
  } catch (error) {
    next(error);
  }
};
