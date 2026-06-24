import Product from "../models/product.model.js";

export const createProductService = async (data) => {
  const finalData = {
    ...data,
    stock: data.hasVariants ? 0 : data.stock,
  };

  const product = await Product.create(data);
  return product;
};
