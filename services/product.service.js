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

export const getProductsService = async (req, res, next) => {
  const products = await Product.find().select(
    "id name sellingPrice description images category",
  );
  if (!products) {
    return next(new AppError("No product to show", 404));
  }
  return products;
};

export const findProductByIdService = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    return next(new AppError("Product not found!!", 404));
  }
  return product;
};
