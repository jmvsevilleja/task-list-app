import { Router } from "express";
import { body } from "express-validator";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/tasks";
import { validateRequest } from "../middleware/errorHandler";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, getTasks);

router.post(
  "/",
  auth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("content").optional(),
    body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
  ],
  validateRequest,
  createTask
);

router.delete("/:id", auth, deleteTask);
router.patch("/:id", auth, updateTask);

export default router;
