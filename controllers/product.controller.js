import catchAsync from "../error/catchAsync.js";
import {
  createProductService,
  getProductsService,
  findProductByIdService,
} from "../services/product.service.js";

export const createProduct = catchAsync(async (req, res, next) => {
  const data = {
    ...req.body,
  };

  const product = await createProductService(data);

  res.status(201).json({
    success: true,
    data: product,
  });
});

export const getProducts = catchAsync(async (req, res, next) => {
  const products = await getProductsService();
  res.status(200).json({
    success: true,
    data: products,
  });
});

export const findProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await findProductByIdService(id);
  res.status(200).json({
    success: true,
    data: product,
  });
});
