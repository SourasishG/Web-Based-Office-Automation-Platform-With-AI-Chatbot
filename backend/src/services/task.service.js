import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * List tasks with search, priority, project, and assignee filters
 */
export const getTasks = async (filters = {}) => {
  const { search, status, priority, projectId, assigneeId } = filters;

  const where = {};

  if (status && status !== "all") {
    where.status = status;
  }

  if (priority && priority !== "all") {
    where.priority = priority;
  }

  if (projectId) {
    where.projectId = projectId;
  }

  if (assigneeId) {
    where.assigneeId = assigneeId;
  }

  if (search && search.trim()) {
    const query = search.trim();
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  const tasks = await prisma.task.findMany({
    where,
    orderBy: { orderIndex: "asc" },
    include: {
      project: {
        select: { id: true, title: true, department: true, status: true },
      },
      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatarUrl: true,
          jobTitle: true,
        },
      },
    },
  });

  return tasks;
};

/**
 * Get Kanban Board: groups tasks into TODO, IN_PROGRESS, REVIEW, COMPLETED
 */
export const getKanbanBoard = async (filters = {}) => {
  const tasks = await getTasks(filters);

  const board = {
    TODO: [],
    IN_PROGRESS: [],
    REVIEW: [],
    COMPLETED: [],
  };

  tasks.forEach((task) => {
    if (board[task.status]) {
      board[task.status].push(task);
    }
  });

  return board;
};

/**
 * Aggregates task counters by column, critical status, and overdue tasks
 */
export const getTaskStats = async (projectId) => {
  const where = projectId ? { projectId } : {};
  const now = new Date();

  const [total, todoCount, inProgressCount, reviewCount, completedCount, criticalCount, overdueCount] =
    await Promise.all([
      prisma.task.count({ where }),
      prisma.task.count({ where: { ...where, status: "TODO" } }),
      prisma.task.count({ where: { ...where, status: "IN_PROGRESS" } }),
      prisma.task.count({ where: { ...where, status: "REVIEW" } }),
      prisma.task.count({ where: { ...where, status: "COMPLETED" } }),
      prisma.task.count({ where: { ...where, priority: "CRITICAL" } }),
      prisma.task.count({
        where: {
          ...where,
          status: { not: "COMPLETED" },
          dueDate: { lt: now },
        },
      }),
    ]);

  return {
    total,
    todoCount,
    inProgressCount,
    reviewCount,
    completedCount,
    criticalCount,
    overdueCount,
  };
};

/**
 * Get single task by ID
 */
export const getTaskById = async (id) => {
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      project: {
        select: { id: true, title: true, department: true, status: true },
      },
      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatarUrl: true,
          jobTitle: true,
          department: true,
        },
      },
    },
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};

/**
 * Create a new task
 */
export const createTask = async (data) => {
  const { dueDate, subtasks, ...taskData } = data;

  const task = await prisma.task.create({
    data: {
      ...taskData,
      dueDate: dueDate ? new Date(dueDate) : null,
      subtasks: subtasks || [],
    },
    include: {
      project: {
        select: { id: true, title: true, department: true },
      },
      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
          jobTitle: true,
        },
      },
    },
  });

  return task;
};

/**
 * Update task
 */
export const updateTask = async (id, data) => {
  const exists = await prisma.task.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Task not found");
  }

  const { dueDate, subtasks, ...updateData } = data;

  const updated = await prisma.task.update({
    where: { id },
    data: {
      ...updateData,
      ...(dueDate !== undefined ? { dueDate: dueDate ? new Date(dueDate) : null } : {}),
      ...(subtasks !== undefined ? { subtasks } : {}),
    },
    include: {
      project: {
        select: { id: true, title: true, department: true },
      },
      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
          jobTitle: true,
        },
      },
    },
  });

  return updated;
};

/**
 * Drag-and-drop Kanban reorder (column switch + order indexing)
 */
export const reorderTask = async (id, { status, orderIndex }) => {
  const exists = await prisma.task.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Task not found");
  }

  const updated = await prisma.task.update({
    where: { id },
    data: {
      status,
      orderIndex,
    },
    include: {
      project: {
        select: { id: true, title: true },
      },
      assignee: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true },
      },
    },
  });

  return updated;
};

/**
 * Delete task
 */
export const deleteTask = async (id) => {
  const exists = await prisma.task.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Task not found");
  }

  await prisma.task.delete({ where: { id } });
  return true;
};
