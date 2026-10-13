import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * List employees with multi-field search, department filters, and pagination
 */
export const getEmployees = async (filters = {}) => {
  const { search, department, status, page = 1, limit = 20 } = filters;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where = {};

  if (department && department !== "all") {
    where.department = { equals: department, mode: "insensitive" };
  }

  if (status && status !== "all") {
    where.presenceStatus = status.toUpperCase();
  }

  if (search && search.trim()) {
    const query = search.trim();
    where.OR = [
      { firstName: { contains: query, mode: "insensitive" } },
      { lastName: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { jobTitle: { contains: query, mode: "insensitive" } },
      { department: { contains: query, mode: "insensitive" } },
    ];
  }

  const [total, employees] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        role: true,
        department: true,
        jobTitle: true,
        phone: true,
        location: true,
        presenceStatus: true,
        skills: true,
        managerId: true,
        manager: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        _count: {
          select: {
            projectMemberships: true,
            assignedTasks: true,
          },
        },
        createdAt: true,
      },
    }),
  ]);

  return {
    employees,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / take),
    },
  };
};

/**
 * Headcount metrics and department distribution
 */
export const getEmployeeStats = async () => {
  const [total, onlineCount, busyCount, awayCount, offlineCount, departmentGroups] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { presenceStatus: "ONLINE" } }),
      prisma.user.count({ where: { presenceStatus: "BUSY" } }),
      prisma.user.count({ where: { presenceStatus: "AWAY" } }),
      prisma.user.count({ where: { presenceStatus: "OFFLINE" } }),
      prisma.user.groupBy({
        by: ["department"],
        _count: { _all: true },
      }),
    ]);

  const departmentCounts = departmentGroups.reduce((acc, curr) => {
    if (curr.department) {
      acc[curr.department] = curr._count._all;
    }
    return acc;
  }, {});

  const activeRate = total > 0 ? Math.round((onlineCount / total) * 100) : 0;

  return {
    total,
    onlineCount,
    busyCount,
    awayCount,
    offlineCount,
    activeRate,
    departmentCounts,
  };
};

/**
 * Org Chart: returns hierarchical tree structure of the company
 */
export const getOrgChart = async () => {
  // Fetch top-level executives (managerId is null) with nested subordinates
  const orgTree = await prisma.user.findMany({
    where: { managerId: null },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      avatarUrl: true,
      role: true,
      department: true,
      jobTitle: true,
      presenceStatus: true,
      subordinates: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatarUrl: true,
          role: true,
          department: true,
          jobTitle: true,
          presenceStatus: true,
          subordinates: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatarUrl: true,
              role: true,
              department: true,
              jobTitle: true,
              presenceStatus: true,
            },
          },
        },
      },
    },
  });

  return orgTree;
};

/**
 * Get individual employee profile with project & task associations
 */
export const getEmployeeById = async (id) => {
  const employee = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      role: true,
      department: true,
      jobTitle: true,
      phone: true,
      location: true,
      presenceStatus: true,
      skills: true,
      managerId: true,
      manager: {
        select: { id: true, firstName: true, lastName: true, email: true, jobTitle: true },
      },
      subordinates: {
        select: { id: true, firstName: true, lastName: true, email: true, jobTitle: true, avatarUrl: true },
      },
      projectMemberships: {
        include: {
          project: {
            select: { id: true, title: true, status: true, progress: true, priority: true },
          },
        },
      },
      assignedTasks: {
        take: 10,
        orderBy: { dueDate: "asc" },
        select: { id: true, title: true, status: true, priority: true, dueDate: true },
      },
      createdAt: true,
    },
  });

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return employee;
};

/**
 * Update employee record
 */
export const updateEmployee = async (id, updateData) => {
  const exists = await prisma.user.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Employee not found");
  }

  const updated = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      role: true,
      department: true,
      jobTitle: true,
      phone: true,
      location: true,
      presenceStatus: true,
      skills: true,
      managerId: true,
      updatedAt: true,
    },
  });

  return updated;
};

/**
 * Delete employee record
 */
export const deleteEmployee = async (id) => {
  const exists = await prisma.user.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Employee not found");
  }

  await prisma.user.delete({ where: { id } });
  return true;
};
