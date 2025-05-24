import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const resolvers = {
  Query: {
    tasks: async (_: any, __: any, context: any) => {
      if (!context.userId) throw new Error("Not authenticated");

      return prisma.task.findMany({
        where: { userId: context.userId },
        orderBy: { createdAt: "desc" },
      });
    },
  },

  Mutation: {
    createTask: async (_: any, { input }: any, context: any) => {
      if (!context.userId) throw new Error("Not authenticated");

      return prisma.task.create({
        data: {
          title: input.title,
          content: input.content,
          dueDate: input.dueDate ? new Date(input.dueDate) : null,
          userId: context.userId,
        },
      });
    },

    updateTask: async (_: any, { id, input }: any, context: any) => {
      if (!context.userId) throw new Error("Not authenticated");

      // Verify task belongs to user
      const task = await prisma.task.findFirst({
        where: { id: parseInt(id), userId: context.userId },
      });

      if (!task) throw new Error("Task not found");

      return prisma.task.update({
        where: { id: parseInt(id) },
        data: {
          title: input.title || task.title,
          content: input.content !== undefined ? input.content : task.content,
          dueDate: input.dueDate ? new Date(input.dueDate) : task.dueDate,
          completed:
            input.completed !== undefined ? input.completed : task.completed,
        },
      });
    },

    deleteTask: async (_: any, { id }: any, context: any) => {
      if (!context.userId) throw new Error("Not authenticated");

      // Verify task belongs to user
      const task = await prisma.task.findFirst({
        where: { id: parseInt(id), userId: context.userId },
      });

      if (!task) throw new Error("Task not found");

      return prisma.task.delete({
        where: { id: parseInt(id) },
      });
    },

    login: async (_: any, { email, password }: any) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return { token, userId: user.id };
    },

    register: async (_: any, { name, email, password }: any) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return { token, userId: user.id };
    },
  },

  Task: {
    user: (parent: any) => {
      return prisma.user.findUnique({ where: { id: parent.userId } });
    },
  },
};
