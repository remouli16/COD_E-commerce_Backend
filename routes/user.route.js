import express from "express";
import validate from "../middlewares/validator.js";

import { registerSchema, loginSchema } from "../validators/user.validator.js";
import {
  register,
  login,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";
const router = express.Router();
router.post("/auth/register", validate(registerSchema, "body"), register);
router.post("/auth/login", loginLimiter, validate(loginSchema, "body"), login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

export default router;
