import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    attributes: {
      type: Map,
      of: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: [0, "المخزون لا يمكن أن يكون سالباً"],
    },

    price: {
      type: Number,
      min: [0, "السعر لا يمكن أن يكون سالباً"],
    },

    sku: {
      type: String,
      trim: true,
    },
  },
  { _id: true },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "اسم المنتج مطلوب"],
      trim: true,
    },

    purchasePrice: {
      type: Number,
      required: [true, "سعر الشراء مطلوب"],
      min: [0, "سعر الشراء لا يمكن أن يكون سالباً"],
    },

    sellingPrice: {
      type: Number,
      required: [true, "سعر البيع مطلوب"],
      min: [0, "سعر البيع لا يمكن أن يكون سالباً"],
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      required: [true, "التصنيف مطلوب"],
      enum: {
        values: [
          "electronics",
          "clothing",
          "shoes",
          "perfume",
          "books",
          "other",
        ],
        message: "{VALUE} تصنيف غير مدعوم",
      },
    },

    hasVariants: {
      type: Boolean,
      default: false,
    },

    // للمنتجات بدون variants
    stock: {
      type: Number,
      default: 0,
      min: [0, "المخزون لا يمكن أن يكون سالباً"],
    },

    // المتغيرات نفسها
    variants: {
      type: [variantSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
