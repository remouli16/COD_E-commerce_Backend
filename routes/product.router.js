import express from "express";
import {
  createProduct,
  getProducts,
  findProductById,
  findProductByIdAndUpdate,
} from "../controllers/product.controller.js";
import validate from "../middlewares/validator.js";
import {
  createProductSchema,
  idtSchema,
  updateProductSchema,
} from "../validators/product.validator.js";
const router = express.Router();
router.post("/", validate(createProductSchema, "body"), createProduct);
router.get("/", getProducts);
router.get("/:id", validate(idtSchema, "params"), findProductById);
router.patch(
  "/:id",
  validate(idtSchema, "params"),
  validate(updateProductSchema, "body"),
  findProductByIdAndUpdate,
);

export default router;
