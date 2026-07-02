import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  purchasePrice: Joi.number().min(0).required(),
  sellingPrice: Joi.number().greater(Joi.ref("purchasePrice")).required(),
  description: Joi.string().allow("").default(""),
  category: Joi.string()
    .valid("electronics", "clothing", "shoes", "perfume", "books", "other")
    .required(),
  hasVariants: Joi.boolean().default(false),
  stock: Joi.number().min(0).default(0),
  variantTypes: Joi.array().items(Joi.string()).default([]),
  variants: Joi.array()
    .items(
      Joi.object({
        attributes: Joi.object().pattern(Joi.string(), Joi.string()),

        stock: Joi.number().min(0).default(0),

        price: Joi.number().optional(),

        sku: Joi.string().optional(),
      }),
    )
    .default([]),
});

export const idtSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string(),

  purchasePrice: Joi.number().min(0),

  sellingPrice: Joi.number().when("purchasePrice", {
    is: Joi.exist(),
    then: Joi.number().greater(Joi.ref("purchasePrice")),
    otherwise: Joi.number(),
  }),

  description: Joi.string().allow(""),

  category: Joi.string().valid(
    "electronics",
    "clothing",
    "shoes",
    "perfume",
    "books",
    "other",
  ),

  hasVariants: Joi.boolean(),

  stock: Joi.number().min(0),

  variantTypes: Joi.array().items(Joi.string()),

  variants: Joi.array().items(
    Joi.object({
      attributes: Joi.object().pattern(Joi.string(), Joi.string()),

      stock: Joi.number().min(0),

      price: Joi.number(),

      sku: Joi.string(),
    }),
  ),
});
