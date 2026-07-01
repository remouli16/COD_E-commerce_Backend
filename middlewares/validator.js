import AppError from "../error/appError.js";

const validate = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, //من أجل اظهار جميع الاخطاء للمستخدم
      stripUnknown: true, //من أجل حذف الحقول غير المطلوبة
    });

    if (error) {
      const message = error.details.map((el) => el.message).join(", ");
      return next(new AppError(message, 400));
    }

    req[property] = value;

    next();
  };
};

export default validate;
