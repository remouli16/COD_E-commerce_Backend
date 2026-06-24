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
