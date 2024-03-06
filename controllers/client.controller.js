const CrudService = require("../services/crud.service");
const joi = require("joi");
const Client = require("../models/client.model");
const catchAsync = require("../utils/catchAsync");
const { CustomErrorHandler } = require("../services/error.service");
const bcrypt = require("bcryptjs");
const clientService = new CrudService(Client);
const HelperResponse = require("../utils/HelperResponse");

const JwtService = require("../services/jwt.service");

class ClientController {
  static clientSignup = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    const validationSchema = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    const { error } = validationSchema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.details[0].message));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await clientService.create({
      name,
      email,
      password: hashedPassword,
    });

    return HelperResponse.success(res, "Client created successfully", result);
  });

  static clientLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const validationSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    const { error } = validationSchema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.details[0].message));
    }

    const client = await clientService.findOne({ email });

    if (!client) {
      return next(new CustomErrorHandler(404, "Client not found"));
    }

    if (!client.isActive) {
      return next(new CustomErrorHandler(400, "Contact Admin to activate your account"));
    }

    let decryptedPassword = await bcrypt.compare(password, client.password);

    if (!decryptedPassword) {
      return next(new CustomErrorHandler(400, "Invalid credentials"));
    }

    let accessToken = JwtService.sign({ _id: client._id });

    return HelperResponse.success(res, "Client logged in successfully", {
      accessToken,
      client,
    });
  });
}

module.exports = ClientController;
