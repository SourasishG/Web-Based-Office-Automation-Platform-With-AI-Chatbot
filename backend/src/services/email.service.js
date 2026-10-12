import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * List emails for current user based on folder (Inbox, Starred, Sent, Drafts, Trash)
 */
export const getEmails = async (userId, filters = {}) => {
  const { folder = "INBOX", category, search, page = 1, limit = 20 } = filters;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where = {};

  if (folder === "STARRED") {
    where.isStarred = true;
    where.OR = [{ recipientId: userId }, { senderId: userId }];
  } else if (folder === "SENT") {
    where.senderId = userId;
    where.folder = "SENT";
  } else if (folder === "TRASH") {
    where.folder = "TRASH";
    where.OR = [{ recipientId: userId }, { senderId: userId }];
  } else if (folder === "DRAFTS") {
    where.senderId = userId;
    where.folder = "DRAFTS";
  } else {
    // Default to INBOX
    where.recipientId = userId;
    where.folder = "INBOX";
  }

  if (category && category !== "all") {
    where.category = { equals: category, mode: "insensitive" };
  }

  if (search && search.trim()) {
    const query = search.trim();
    where.AND = [
      {
        OR: [
          { subject: { contains: query, mode: "insensitive" } },
          { body: { contains: query, mode: "insensitive" } },
          { sender: { firstName: { contains: query, mode: "insensitive" } } },
          { sender: { lastName: { contains: query, mode: "insensitive" } } },
        ],
      },
    ];
  }

  const [total, emails] = await Promise.all([
    prisma.email.count({ where }),
    prisma.email.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true,
            jobTitle: true,
          },
        },
        recipient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    }),
  ]);

  return {
    emails,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / take),
    },
  };
};

/**
 * Get folder item counts and unread counter for the sidebar navigation
 */
export const getEmailFolderCounts = async (userId) => {
  const [inboxTotal, inboxUnread, starredTotal, sentTotal, draftsTotal, trashTotal] =
    await Promise.all([
      prisma.email.count({ where: { recipientId: userId, folder: "INBOX" } }),
      prisma.email.count({ where: { recipientId: userId, folder: "INBOX", isRead: false } }),
      prisma.email.count({
        where: {
          isStarred: true,
          OR: [{ recipientId: userId }, { senderId: userId }],
        },
      }),
      prisma.email.count({ where: { senderId: userId, folder: "SENT" } }),
      prisma.email.count({ where: { senderId: userId, folder: "DRAFTS" } }),
      prisma.email.count({
        where: {
          folder: "TRASH",
          OR: [{ recipientId: userId }, { senderId: userId }],
        },
      }),
    ]);

  return {
    inbox: { total: inboxTotal, unread: inboxUnread },
    starred: starredTotal,
    sent: sentTotal,
    drafts: draftsTotal,
    trash: trashTotal,
  };
};

/**
 * Get single email detail and auto-mark as read if recipient
 */
export const getEmailById = async (id, userId) => {
  const email = await prisma.email.findUnique({
    where: { id },
    include: {
      sender: {
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
      recipient: {
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

  if (!email) {
    throw new ApiError(404, "Email not found");
  }

  // Auto-mark as read if current user is the recipient
  if (email.recipientId === userId && !email.isRead) {
    await prisma.email.update({
      where: { id },
      data: { isRead: true },
    });
    email.isRead = true;
  }

  return email;
};

/**
 * Compose and send internal email
 */
export const composeEmail = async (senderId, data) => {
  let recipientId = data.recipientId;

  if (!recipientId && data.recipientEmail) {
    const recipientUser = await prisma.user.findUnique({
      where: { email: data.recipientEmail.toLowerCase() },
    });
    if (!recipientUser) {
      throw new ApiError(404, `Recipient with email ${data.recipientEmail} not found`);
    }
    recipientId = recipientUser.id;
  }

  if (!recipientId) {
    throw new ApiError(400, "Recipient ID or valid recipient email is required");
  }

  const snippet = data.body.length > 90 ? `${data.body.substring(0, 90)}...` : data.body;

  // 1. Create recipient's Inbox record
  const email = await prisma.email.create({
    data: {
      senderId,
      recipientId,
      subject: data.subject,
      body: data.body,
      snippet,
      category: data.category || "Project Sync",
      folder: "INBOX",
      isRead: false,
      isStarred: false,
    },
    include: {
      sender: {
        select: { id: true, firstName: true, lastName: true, email: true, avatarUrl: true },
      },
      recipient: {
        select: { id: true, firstName: true, lastName: true, email: true, avatarUrl: true },
      },
    },
  });

  // 2. Also create a copy in sender's Sent folder
  await prisma.email.create({
    data: {
      senderId,
      recipientId,
      subject: data.subject,
      body: data.body,
      snippet,
      category: data.category || "Project Sync",
      folder: "SENT",
      isRead: true,
      isStarred: false,
    },
  });

  return email;
};

/**
 * Toggle starred status
 */
export const toggleStar = async (id, userId) => {
  const email = await prisma.email.findUnique({ where: { id } });
  if (!email || (email.recipientId !== userId && email.senderId !== userId)) {
    throw new ApiError(404, "Email not found");
  }

  const updated = await prisma.email.update({
    where: { id },
    data: { isStarred: !email.isStarred },
  });

  return updated;
};

/**
 * Toggle read status
 */
export const toggleRead = async (id, userId) => {
  const email = await prisma.email.findUnique({ where: { id } });
  if (!email || email.recipientId !== userId) {
    throw new ApiError(404, "Email not found");
  }

  const updated = await prisma.email.update({
    where: { id },
    data: { isRead: !email.isRead },
  });

  return updated;
};

/**
 * Move email to a different folder (e.g. TRASH)
 */
export const moveToFolder = async (id, folder, userId) => {
  const email = await prisma.email.findUnique({ where: { id } });
  if (!email || (email.recipientId !== userId && email.senderId !== userId)) {
    throw new ApiError(404, "Email not found");
  }

  const updated = await prisma.email.update({
    where: { id },
    data: { folder },
  });

  return updated;
};

/**
 * Permanent deletion
 */
export const deleteEmail = async (id, userId) => {
  const email = await prisma.email.findUnique({ where: { id } });
  if (!email || (email.recipientId !== userId && email.senderId !== userId)) {
    throw new ApiError(404, "Email not found");
  }

  await prisma.email.delete({ where: { id } });
  return true;
};
