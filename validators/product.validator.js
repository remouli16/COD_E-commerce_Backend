import Joi from "joi";

const variantSchema = Joi.object({
  attributes: Joi.object()
    .pattern(Joi.string().trim().min(1), Joi.string().trim().min(1))
    .min(1)
    .required(),

  stock: Joi.number().integer().min(0).default(0),

  price: Joi.number().min(0).optional(),

  sku: Joi.string().trim().optional(),
});

export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "اسم المنتج مطلوب",
    "string.min": "اسم المنتج يجب أن يحتوي على حرفين على الأقل",
    "string.max": "اسم المنتج لا يمكن أن يتجاوز 100 حرف",
    "any.required": "اسم المنتج مطلوب",
  }),

  purchasePrice: Joi.number().min(0).required().messages({
    "number.min": "سعر الشراء لا يمكن أن يكون سالباً",
    "any.required": "سعر الشراء مطلوب",
  }),

  sellingPrice: Joi.number().min(0).required().messages({
    "number.min": "سعر البيع لا يمكن أن يكون سالباً",
    "any.required": "سعر البيع مطلوب",
  }),

  description: Joi.string().trim().allow("").default(""),

  images: Joi.array().items(Joi.string().trim()).default([]),

  category: Joi.string()
    .valid("electronics", "clothing", "shoes", "perfume", "books", "other")
    .required()
    .messages({
      "any.only": "التصنيف غير مدعوم",
      "any.required": "التصنيف مطلوب",
    }),

  hasVariants: Joi.boolean().default(false),

  stock: Joi.when("hasVariants", {
    is: false,
    then: Joi.number().integer().min(0).required(),

    otherwise: Joi.forbidden(),
  }),

  variantTypes: Joi.when("hasVariants", {
    is: true,
    then: Joi.array().items(Joi.string().trim().min(1)).min(1).required(),

    otherwise: Joi.forbidden(),
  }),

  variants: Joi.when("hasVariants", {
    is: true,
    then: Joi.array().items(variantSchema).min(1).required(),

    otherwise: Joi.forbidden(),
  }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),

  purchasePrice: Joi.number().min(0).optional(),

  sellingPrice: Joi.number().min(0).optional(),

  description: Joi.string().trim().allow("").optional(),

  images: Joi.array().items(Joi.string().trim()).optional(),

  category: Joi.string()
    .valid("electronics", "clothing", "shoes", "perfume", "books", "other")
    .optional()
    .messages({
      "any.only": "التصنيف غير مدعوم",
    }),

  hasVariants: Joi.boolean().optional(),

  stock: Joi.number().integer().min(0).optional(),

  variants: Joi.array().items(variantSchema).min(1).optional(),
});

export const idtSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
