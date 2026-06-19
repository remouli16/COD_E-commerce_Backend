import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "اسم المنتج مطلوب"],
    },
    purchasePrice: {
      type: Number,
      required: [true, "سعر الشراء مطلوب"],
      min: [0, "السعر لا يمكن أن يكون سالباً"],
    },
    sellingPrice: {
      type: Number,
      required: [true, "سعر البيع مطلوب"],
      min: [0, "السعر لا يمكن أن يكون سالباً"],
    },
    description: {
      type: String,
      default: "",
    },
    images: [String], // مصفوفة روابط الصور
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
    // للمنتجات البسيطة (بدون متغيرات)
    stock: {
      type: Number,
      default: 0,
      min: [0, "المخزون لا يمكن أن يكون سالباً"],
    },
    // أنواع المتغيرات: مثلاً ['color', 'size'] أو ['volume']
    variantTypes: [String],
    // المتغيرات نفسها
    variants: [
      {
        attributes: {
          type: Map,
          of: String, // مثلاً: { color: 'red', size: 'M' }
        },
        stock: {
          type: Number,
          default: 0,
        },
        price: {
          type: Number, // فقط إذا اختلف عن sellingPrice الأساسي
        },
        sku: String, // Stock Keeping Unit
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
