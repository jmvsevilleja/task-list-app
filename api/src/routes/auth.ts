import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/auth";
import { validateRequest } from "../middleware/errorHandler";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("name").not().isEmpty().withMessage("Name is required"),
  ],
  validateRequest,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

export default router;
