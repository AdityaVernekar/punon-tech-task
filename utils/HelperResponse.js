class HelperResponse {
  static async success(res, message, data) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  static async error(res, message, data = {}) {
    return res.status(400).json({
      success: false,
      message,
      data,
    });
  }
}

module.exports = HelperResponse;
