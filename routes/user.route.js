import express from "express";
import validate from "../middlewares/validator.js";

import { registerSchema, loginSchema } from "../validators/user.validator.js";
import { register, login } from "../controllers/user.controller.js";
const router = express.Router();
router.post("/auth/register", validate(registerSchema, "body"), register);
router.post("/auth/login", validate(loginSchema, "body"), login);

export default router;
