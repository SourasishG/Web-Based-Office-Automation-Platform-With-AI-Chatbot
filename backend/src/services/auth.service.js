import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Generate stateless JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

/**
 * Sanitize user object (omit sensitive password field)
 */
const sanitizeUser = (user) => {
  const { password, ...sanitized } = user;
  return sanitized;
};

export const registerUser = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email.toLowerCase() },
  });

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...data,
      email: data.email.toLowerCase(),
      password: hashedPassword,
    },
    include: {
      manager: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
    },
  });

  const token = generateToken(newUser.id);
  return { user: sanitizeUser(newUser), token };
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: {
      manager: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Update presence status to ONLINE on login
  await prisma.user.update({
    where: { id: user.id },
    data: { presenceStatus: "ONLINE" },
  });

  const token = generateToken(user.id);
  return { user: sanitizeUser(user), token };
};

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      manager: {
        select: { id: true, firstName: true, lastName: true, email: true, jobTitle: true },
      },
      subordinates: {
        select: { id: true, firstName: true, lastName: true, email: true, jobTitle: true, avatarUrl: true },
      },
      _count: {
        select: {
          assignedTasks: true,
          projectMemberships: true,
          requestedTickets: true,
        },
      },
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return sanitizeUser(user);
};
