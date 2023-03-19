export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // wrong mongoose object id error
  if (err.name === "CastError") {
    const message = `Resource not found. invalid: ${error.path}`;
    error = new Error(message);
  }

  //Handling Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new Error(message);
  }

  //Handling Mongoose Duplicate Key Error
  if (err.name === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    error = new Error(message);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "internal server error",
  });
};
