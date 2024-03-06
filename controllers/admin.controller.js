const CrudService = require("../services/crud.service");
const joi = require("joi");
const Client = require("../models/client.model");
const catchAsync = require("../utils/catchAsync");
const { CustomErrorHandler } = require("../services/error.service");
const clientService = new CrudService(Client);
const HelperResponse = require("../utils/HelperResponse");

class AdminController {
  static verifyClient = catchAsync(async (req, res, next) => {
    let { id } = req.params;

    let client = await clientService.findOne({ _id: id });

    if (!client) {
      return next(new CustomErrorHandler(404, "Client not found"));
    }

    client.isActive = true;

    await client.save();

    return HelperResponse.success(res, "Client verified successfully", client);
  });
}

module.exports = AdminController;

// kiran.kumawat@punon.in
