import Product from "../models/product.model.js";
import AppError from "../error/appError.js";

export const createProductService = async (data) => {
  const finalData = {
    ...data,
    stock: data.hasVariants ? 0 : data.stock,
  };

  const product = await Product.create(data);
  return product;
};

export const getProductsService = async () => {
  const products = await Product.find().select(
    "id name sellingPrice description images category",
  );
  if (!products) {
    throw new AppError("product not found", 404);
  }
  return products;
};

export const findProductByIdService = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError("product not found", 404);
  }
  return product;
};

export const findProductByIdAndUpdateService = async (id, data) => {
  const existingProduct = await Product.findById(id);

  if (!existingProduct) {
    throw new AppError("product not found", 404);
  }

  const purchasePrice =
    data.purchasePrice !== undefined
      ? data.purchasePrice
      : existingProduct.purchasePrice;

  const sellingPrice =
    data.sellingPrice !== undefined
      ? data.sellingPrice
      : existingProduct.sellingPrice;

  if (sellingPrice < purchasePrice) {
    throw new AppError("sellingPrice must be greater than purchasePrice", 400);
  }

  if (data.hasVariants === true) {
    data.stock = 0;
  }

  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return product;
};
