import Product from "../models/product.model.js";

// @desc    Create a product
// @route   POST /api/products
// @access  Public (حالياً - لاحقاً رح نحميها)
const createProduct = async (req, res) => {
  try {
    // الخطوة 1: استخراج البيانات من body
    const {
      name,
      purchasePrice,
      sellingPrice,
      description,
      images,
      category,
      hasVariants,
      stock,
      variantTypes,
      variants,
    } = req.body;

    // الخطوة 2: التحقق من الحقول المطلوبة
    if (!name || !purchasePrice || !sellingPrice || !category) {
      return res.status(400).json({
        message:
          "الرجاء إدخال جميع الحقول المطلوبة: الاسم، سعر الشراء، سعر البيع، التصنيف",
      });
    }

    // الخطوة 3: تجهيز البيانات حسب نوع المنتج
    const productData = {
      name,
      purchasePrice,
      sellingPrice,
      description: description || "",
      images: images || [],
      category,
      hasVariants: hasVariants || false,
      variantTypes: variantTypes || [],
      variants: variants || [],
      stock: hasVariants ? 0 : stock || 0, // إذا له متغيرات، stock = 0
    };

    // الخطوة 4: إنشاء المنتج في قاعدة البيانات
    const product = await Product.create(productData);

    // الخطوة 5: إرجاع المنتج المنشأ
    res.status(201).json({
      success: true,
      data: product,
      message: "تم إنشاء المنتج بنجاح",
    });
  } catch (error) {
    // الخطوة 6: معالجة أخطاء Mongoose
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(". "),
      });
    }

    res.status(500).json({
      success: false,
      message: "حدث خطأ في الخادم",
      error: error.message,
    });
  }
};

export default createProduct;
