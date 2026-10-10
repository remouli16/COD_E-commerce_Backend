import User from "../models/user.model.js";
import Session from "../models/session.model.js";
import AppError from "../error/appError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from "../utils/token.utils.js";
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

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  const tokenHash = hashToken(refreshToken);
  await Session.create({
    user: user._id,
    tokenHash,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshAccessTokenService = async (refreshToken) => {
  let decoded;

  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  if (decoded.type !== "refresh") {
    throw new AppError("Invalid refresh token", 401);
  }

  const tokenHash = hashToken(refreshToken);

  const session = await Session.findOne({
    tokenHash,
  });

  if (!session) {
    throw new AppError("Invalid refresh token", 401);
  }

  if (session.revoked) {
    // Reuse detected
    await Session.updateMany({ user: session.user }, { revoked: true });

    throw new AppError("Refresh token reuse detected", 401);
  }

  if (session.expiresAt < new Date()) {
    throw new AppError("Refresh token expired", 401);
  }

  const user = await User.findById(session.user);

  if (!user) {
    throw new AppError("User no longer exists", 401);
  }

  if (!user.isActive) {
    throw new AppError("Account is disabled", 403);
  }

  // Revoke old session
  session.revoked = true;

  await session.save();

  // Create new tokens
  const accessToken = generateAccessToken(user._id);

  const newRefreshToken = generateRefreshToken(user._id);

  const newTokenHash = hashToken(newRefreshToken);

  // Create new session
  await Session.create({
    user: user._id,
    tokenHash: newTokenHash,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutService = async (refreshToken) => {
  const tokenHash = hashToken(refreshToken);

  const session = await Session.findOne({
    tokenHash,
  });

  if (!session) {
    return;
  }

  session.revoked = true;

  await session.save();
};
