import AppError from "../error_midellware/appError.js";

export const globalErrorHandling = (err, req, res, next) => {
  //console.log("🔥 GLOBAL ERROR MIDDLEWARE TRIGGERED");
  // default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // programming error
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }

  // ❗ fallback (ضروري)
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
