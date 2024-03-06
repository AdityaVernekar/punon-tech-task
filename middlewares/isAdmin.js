const JwtService = require("../services/jwt.service");
const catchAsync = require("../utils/catchAsync");
const { CustomErrorHandler } = require("../services/error.service");

const ADMIN_ID = "admin";
const ADMIN_PASSWORD = "admin";

const isAdmin = catchAsync(async (req, res, next) => {
  try {
    console.log(req.headers);

    const adminId = req.headers["x-admin-id"];
    const adminPassword = req.headers["x-admin-password"];

    if (adminId !== ADMIN_ID || adminPassword !== ADMIN_PASSWORD) {
      return next(new CustomErrorHandler(403, "You are not allowed to perform this action"));
    }
    next();
  } catch (err) {
    console.log(err);
    return next(new CustomErrorHandler(500, "Internal server error"));
  }
});

const customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomErrorHandler(403, "You are not allowed to perform this action"));
    }
    next();
  };
};

module.exports = {
  isAdmin,
  customRole,
};
