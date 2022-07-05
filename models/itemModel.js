const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const ObjectID = mongoose.Schema.Types.ObjectId;

const item = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: false,
    },

    name: {
      type: String,
      required: false,
      trim: true,
    },

    description: {
      type: String,
      required: false,
    },

    category: {
      type: String,
      required: false,
    },

    price: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const itemSchema = mongoose.model("Items", item);

module.exports = { itemSchema };
