const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isActive: {
    type: Boolean,
    default: false,
  },
  organisation: String,
  password: {
    type: String,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
