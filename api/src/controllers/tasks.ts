import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// Add custom interface for Request
interface CustomRequest extends Request {
  userId?: number;
}

const prisma = new PrismaClient();

export const getTasks = async (req: CustomRequest, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });
    const formattedTasks = tasks.map((task) => ({
      ...task,
      dueDate: task.dueDate ? task.dueDate.toISOString() : null,
    }));

    res.json(formattedTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createTask = async (req: CustomRequest, res: Response) => {
  const { title, content, dueDate } = req.body;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        content,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.userId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTask = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  try {
    // Verify task belongs to user
    const task = await prisma.task.findFirst({
      where: { id: parseInt(id), userId: req.userId },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTask = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { title, content, dueDate, completed } = req.body;

  try {
    // Verify task belongs to user
    const task = await prisma.task.findFirst({
      where: { id: parseInt(id), userId: req.userId },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title: title || task.title,
        content: content !== undefined ? content : task.content,
        dueDate: dueDate ? new Date(dueDate) : task.dueDate,
        completed: completed !== undefined ? completed : task.completed,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
