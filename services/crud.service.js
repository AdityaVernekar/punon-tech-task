const { CustomErrorHandler } = require("../services/error.service");

class CrudService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      let result = await this.model.create(data);
      return result;
    } catch (error) {
      return new CustomErrorHandler(500, error.message);
    }
  }

  async update(id, data) {
    try {
      let result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });

      return result;
    } catch (error) {
      return new CustomErrorHandler(500, error.message);
    }
  }

  async findOne(term) {
    let result = await this.model.findOne(term);

    return result;
  }

  async find() {
    let result = await this.model.find();

    return result;
  }
}

module.exports = CrudService;
