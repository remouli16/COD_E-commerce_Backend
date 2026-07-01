import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/product.router.js";
import { globalErrorHandling } from "./middlewares/errorHandlingMidelleware.js";

// 1. شحن متغيرات البيئة فوراً في الذاكرة
dotenv.config();

const app = express();

// 2. برامج وسيطة لمعالجة الطلبات
app.use(express.json());
app.use("/api/products", productRouter);
app.use(globalErrorHandling);

// 3. استدعاء دالة الاتصال بـ MongoDB Atlas
connectDB();

// 4. تشغيل خادم الاستماع لـ HTTP Requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application context initialized on port ${PORT}`);
});
