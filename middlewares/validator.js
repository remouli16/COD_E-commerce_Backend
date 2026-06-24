import AppError from "../error_midellware/appError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, //من أجل اظهار جميع الاخطاء للمستخدم
      stripUnknown: true, //من أجل حذف الحقول غير المطلوبة
    });

    if (error) {
      const message = error.details.map((el) => el.message).join(", ");
      return next(new AppError(message, 400));
    }

    req.body = value;

    next();
  };
};

export default validate;
