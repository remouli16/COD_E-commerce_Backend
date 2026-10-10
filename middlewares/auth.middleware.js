import jwt from "jsonwebtoken";
import catchAsync from "../error/catchAsync.js";
import AppError from "../error/appError.js";
import User from "../models/user.model.js";

export const authenticate = catchAsync(async (req, res, next) => {
  const authHader = req.headers.authorization;
  if (!authHader) {
    throw new AppError("Authentication required", 401);
  }

  const [schema, token] = authHader.split(" ");

  if (schema !== "Bearer" || !token) {
    throw new AppError("Invalid authorization header", 401);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new AppError("Invalid or expired token", 403);
  }

  // 6. البحث عن المستخدم
  const user = await User.findById(decoded.userId);

  // 7. التأكد أن المستخدم موجود
  if (!user) {
    throw new AppError("User no longer exists", 401);
  }

  // 8. التأكد أن الحساب فعال
  if (!user.isActive) {
    throw new AppError("Account is disabled", 403);
  }

  // 9. وضع المستخدم داخل Request
  req.user = user;

  // 10. السماح للطلب بالمرور
  next();
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError("Access denied", 403);
    }

    next();
  };
};
