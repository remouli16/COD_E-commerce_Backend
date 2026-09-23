import catchAsync from "../error/catchAsync.js";
import {
  createOrderService,
  getOrderService,
} from "../services/order.service.js";

export const createOrder = catchAsync(async (req, res) => {
  const order = await createOrderService(req.body);

  res.status(201).json({
    success: true,
    data: order,
  });
});

export const getOrders = catchAsync(async (req, res) => {
  const orders = await getOrderService();
  res.status(201).json({
    success: true,
    data: orders,
  });
});
