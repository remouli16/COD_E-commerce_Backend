import mongoose, { Schema } from "mongoose";
const orderSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "الاسم مطلوب"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "اللقب مطلوب"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "رقم الهاتف مطلوب"],
      trim: true,
    },

    wilaya: {
      type: String,
      required: [true, "الولاية مطلوبة"],
      trim: true,
    },

    commune: {
      type: String,
      required: [true, "البلدية مطلوبة"],
      trim: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "المنتج مطلوب"],
    },

    quantity: {
      type: Number,
      required: [true, "الكمية مطلوبة"],
      min: [1, "الكمية يجب أن تكون أكبر من 0"],
    },

    variant: {
      type: Map,
      of: String,
    },

    deliveryMethod: {
      type: String,
      required: [true, "طريقة التوصيل مطلوبة"],
      enum: {
        values: ["home", "office"],
        message: "طريقة التوصيل غير صحيحة",
      },
    },

    productPrice: {
      type: Number,
      required: true,
      min: [0, "سعر المنتج لا يمكن أن يكون سالباً"],
    },

    shippingCost: {
      type: Number,
      required: true,
      min: [0, "تكلفة الشحن لا يمكن أن تكون سالبة"],
    },

    totalPrice: {
      type: Number,
      required: true,
      min: [0, "السعر الإجمالي لا يمكن أن يكون سالباً"],
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
