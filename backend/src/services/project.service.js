import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * List projects with search, status filters, dynamic sorting, and members
 */
export const getProjects = async (filters = {}) => {
  const {
    search,
    status,
    department,
    priority,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = 1,
    limit = 20,
  } = filters;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where = {};

  if (status && status !== "all") {
    where.status = status.toUpperCase().replace(/-/g, "_");
  }

  if (department && department !== "all") {
    where.department = { equals: department, mode: "insensitive" };
  }

  if (priority && priority !== "all") {
    where.priority = priority;
  }

  if (search && search.trim()) {
    const query = search.trim();
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { department: { contains: query, mode: "insensitive" } },
    ];
  }

  const sortField = sortBy === "name" ? "title" : sortBy;
  const orderBy = { [sortField]: sortOrder };

  const [total, projects] = await Promise.all([
    prisma.project.count({ where }),
    prisma.project.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true,
            jobTitle: true,
          },
        },
        members: {
          select: {
            role: true,
            user: {
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
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    }),
  ]);

  return {
    projects,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / take),
    },
  };
};

/**
 * Project metrics: total, active, completed, on-hold, and average progress %
 */
export const getProjectStats = async () => {
  const [total, activeCount, completedCount, onHoldCount, planningCount, avgResult] =
    await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: "ACTIVE" } }),
      prisma.project.count({ where: { status: "COMPLETED" } }),
      prisma.project.count({ where: { status: "ON_HOLD" } }),
      prisma.project.count({ where: { status: "PLANNING" } }),
      prisma.project.aggregate({
        _avg: { progress: true },
      }),
    ]);

  const averageProgress = Math.round(avgResult._avg.progress || 0);

  return {
    total,
    activeCount,
    completedCount,
    onHoldCount,
    planningCount,
    averageProgress,
  };
};

/**
 * Get project detail with members and assigned tasks
 */
export const getProjectById = async (id) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      owner: {
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
      members: {
        select: {
          id: true,
          role: true,
          user: {
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
      },
      tasks: {
        orderBy: { orderIndex: "asc" },
        include: {
          assignee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

/**
 * Create a new project with optional team members
 */
export const createProject = async (data, creatorId) => {
  const { memberIds, startDate, dueDate, ...projectData } = data;

  const project = await prisma.project.create({
    data: {
      ...projectData,
      ownerId: creatorId,
      startDate: startDate ? new Date(startDate) : null,
      dueDate: dueDate ? new Date(dueDate) : null,
      members: {
        create: [
          // Automatically add project creator as Lead
          { userId: creatorId, role: "Lead" },
          ...(memberIds || [])
            .filter((id) => id !== creatorId)
            .map((userId) => ({ userId, role: "Member" })),
        ],
      },
    },
    include: {
      owner: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true },
      },
      members: {
        select: {
          role: true,
          user: {
            select: { id: true, firstName: true, lastName: true, avatarUrl: true },
          },
        },
      },
    },
  });

  return project;
};

/**
 * Update project details and team member associations
 */
export const updateProject = async (id, data) => {
  const exists = await prisma.project.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Project not found");
  }

  const { memberIds, startDate, dueDate, ...updateData } = data;

  // Handle member list replacement if memberIds provided
  if (memberIds && Array.isArray(memberIds)) {
    await prisma.projectMember.deleteMany({ where: { projectId: id } });
    await prisma.projectMember.createMany({
      data: memberIds.map((userId) => ({
        projectId: id,
        userId,
        role: "Member",
      })),
      skipDuplicates: true,
    });
  }

  const updated = await prisma.project.update({
    where: { id },
    data: {
      ...updateData,
      ...(startDate !== undefined ? { startDate: startDate ? new Date(startDate) : null } : {}),
      ...(dueDate !== undefined ? { dueDate: dueDate ? new Date(dueDate) : null } : {}),
    },
    include: {
      owner: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true },
      },
      members: {
        select: {
          role: true,
          user: {
            select: { id: true, firstName: true, lastName: true, avatarUrl: true },
          },
        },
      },
    },
  });

  return updated;
};

/**
 * Delete project
 */
export const deleteProject = async (id) => {
  const exists = await prisma.project.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Project not found");
  }

  await prisma.project.delete({ where: { id } });
  return true;
};
