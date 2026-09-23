import Joi from "joi";

export const createOrderSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "الاسم مطلوب",
    "string.min": "الاسم يجب أن يحتوي على حرفين على الأقل",
    "string.max": "الاسم طويل جداً",
    "any.required": "الاسم مطلوب",
  }),

  lastName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "اللقب مطلوب",
    "string.min": "اللقب يجب أن يحتوي على حرفين على الأقل",
    "string.max": "اللقب طويل جداً",
    "any.required": "اللقب مطلوب",
  }),

  phone: Joi.string()
    .trim()
    .pattern(/^(05|06|07)[0-9]{8}$/)
    .required()
    .messages({
      "string.pattern.base": "رقم الهاتف يجب أن يكون رقماً جزائرياً صحيحاً",
      "string.empty": "رقم الهاتف مطلوب",
      "any.required": "رقم الهاتف مطلوب",
    }),

  wilaya: Joi.string().trim().min(2).required().messages({
    "string.empty": "الولاية مطلوبة",
    "any.required": "الولاية مطلوبة",
  }),

  commune: Joi.string().trim().min(2).required().messages({
    "string.empty": "البلدية مطلوبة",
    "any.required": "البلدية مطلوبة",
  }),

  productId: Joi.string().hex().length(24).required().messages({
    "string.hex": "معرف المنتج غير صحيح",
    "string.length": "معرف المنتج غير صحيح",
    "any.required": "معرف المنتج مطلوب",
  }),

  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "الكمية يجب أن تكون رقماً",
    "number.integer": "الكمية يجب أن تكون رقماً صحيحاً",
    "number.min": "الكمية يجب أن تكون أكبر من 0",
    "any.required": "الكمية مطلوبة",
  }),

  variant: Joi.object()
    .pattern(Joi.string().trim().min(1), Joi.string().trim().min(1))
    .optional(),

  deliveryMethod: Joi.string().valid("home", "office").required().messages({
    "any.only": "طريقة التوصيل يجب أن تكون home أو office",
    "any.required": "طريقة التوصيل مطلوبة",
  }),
});
