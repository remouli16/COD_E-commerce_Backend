import Product from "../models/product.model.js";
import AppError from "../error_midellware/appError.js";
import catchAsync from "../error_midellware/catchAsync.js";

const createProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    purchasePrice,
    sellingPrice,
    description,
    images,
    category,
    hasVariants,
    stock,
    variantTypes,
    variants,
  } = req.body;

  // validation
  if (!name || !purchasePrice || !sellingPrice || !category) {
    throw new AppError("Missing required fields", 400);
  }

  const productData = {
    name,
    purchasePrice,
    sellingPrice,
    description: description || "",
    images: images || [],
    category,
    hasVariants: hasVariants || false,
    variantTypes: variantTypes || [],
    variants: variants || [],
    stock: hasVariants ? 0 : stock || 0,
  };

  const product = await Product.create(productData);

  res.status(201).json({
    success: true,
    data: product,
  });
});

export default createProduct;
