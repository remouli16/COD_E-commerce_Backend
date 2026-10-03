import express from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import validate from "../middlewares/validator.js";
import { createOrderSchema } from "../validators/order.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/", validate(createOrderSchema, "body"), createOrder);
router.get("/", authenticate, getOrders);
export default router;
