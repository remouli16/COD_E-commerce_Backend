import catchAsync from "../error/catchAsync.js";
import { registerService, loginService } from "../services/user.service.js";

export const register = catchAsync(async (req, res) => {
  const user = await registerService(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const data = await loginService(email, password);
  res.status(201).json({
    success: true,
    data: data.user,
    token: data.accessToken,
  });
});
