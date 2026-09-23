import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import AppError from "../error/appError.js";
import { SHIPPING_COST } from "../config/shipping.js";

export const createOrderService = async (data) => {
  const {
    firstName,
    lastName,
    phone,
    wilaya,
    commune,
    productId,
    quantity,
    variant,
    deliveryMethod,
  } = data;

  // 1. البحث عن المنتج
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("المنتج غير موجود", 404);
  }

  // 2. تحديد سعر المنتج والمخزون
  let productPrice;
  let selectedVariant = null;

  // المنتج عنده variants
  if (product.hasVariants) {
    if (!variant) {
      throw new AppError("يجب تحديد variant للمنتج", 400);
    }

    // البحث عن الـ variant المطابق
    for (const v of product.variants) {
      const keys = Object.keys(variant);

      if (keys.length !== v.attributes.size) {
        continue;
      }

      let isMatch = true;

      for (const key of keys) {
        if (v.attributes.get(key) !== variant[key]) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        selectedVariant = v;
        break;
      }
    }

    if (!selectedVariant) {
      throw new AppError("الـ variant غير موجود", 404);
    }

    // التحقق من المخزون
    if (selectedVariant.stock < quantity) {
      throw new AppError("الكمية المطلوبة غير متوفرة", 400);
    }

    productPrice = selectedVariant.price ?? product.sellingPrice;
  }

  // المنتج ليس عنده variants
  else {
    if (product.stock < quantity) {
      throw new AppError("الكمية المطلوبة غير متوفرة", 400);
    }

    productPrice = product.sellingPrice;
  }

  // 3. حساب تكلفة الشحن
  const shippingCost = SHIPPING_COST[deliveryMethod];

  if (shippingCost === undefined) {
    throw new AppError("طريقة التوصيل غير صحيحة", 400);
  }

  // 4. حساب السعر الإجمالي
  const totalPrice = productPrice * quantity + shippingCost;

  // 5. إنشاء الطلب
  const order = await Order.create({
    firstName,
    lastName,
    phone,
    wilaya,
    commune,
    product: product._id,
    quantity,
    variant,
    deliveryMethod,
    productPrice,
    shippingCost,
    totalPrice,
  });

  // 6. تحديث المخزون
  if (product.hasVariants) {
    selectedVariant.stock -= quantity;
  } else {
    product.stock -= quantity;
  }

  await product.save();

  return order;
};

export const getOrderService = async () => {
  const orders = await Order.find();
  if (!orders) {
    throw new AppError("NO Orders to Show", 404);
  }
  return orders;
};
