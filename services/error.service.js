const { ValidationError } = require("joi");

class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Something went wrong";

  if (err instanceof CustomErrorHandler) {
    status = err.status;

    data = {
      success: false,
      message: err.message,
    };
  } else if (err instanceof ValidationError) {
    statusCode = 422 || 400;

    data = {
      success: false,
      message: err.message,
    };
  } else {
    data = {
      success: false,
      message,
    };
  }

  return res.status(status).json(data);
};

module.exports = { CustomErrorHandler, errorHandler };
