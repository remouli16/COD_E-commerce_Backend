import express from "express";
import {
  createProduct,
  getProducts,
  findProductById,
} from "../controllers/product.controller.js";
import validate from "../middlewares/validator.js";
import {
  createProductSchema,
  getProductSchema,
} from "../validators/product.validator.js";
const router = express.Router();
router.post("/", validate(createProductSchema, "body"), createProduct);
router.get("/", getProducts);
router.get("/:id", validate(getProductSchema, "params"), findProductById);
export default router;
