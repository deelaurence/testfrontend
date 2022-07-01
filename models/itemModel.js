const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');

const ObjectID = mongoose.Schema.Types.ObjectId;

const item = new mongoose.Schema({
   owner: {
    type: ObjectID,
    required: true,
    ref: 'User'
   },

   name: {
    type: String,
    required: true,
    trim: true
   },

   description: {
    type: String,
    required: true,
   },

   category: {
    type: String,
    required: true,
   },

   price: {
    type: Number,
    required: true,
   }
  },{
    timestamps: true
});

const itemSchema = mongoose.model("Items",item);

module.exports = { itemSchema };