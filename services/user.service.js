import User from "../models/user.model.js";
import AppError from "../error/appError.js";
import jwt from "jsonwebtoken";

export const registerService = async (data) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return user;
};

export const loginService = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );
  return {
    user,
    accessToken,
  };
};
