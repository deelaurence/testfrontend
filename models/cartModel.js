const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');

const ObjectID = mongoose.Schema.Types.ObjectId;

const cart = new mongoose.Schema({
     owner: {
        type: String,
        required: true,
        trim: 'User'
     },

     items: [{
        itemId: {
            type: ObjectID,
            required: true,
            ref: 'Item'
           },
        name: {
            type: String
            },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
            },
        price: {
            type: Number
        }
     }],
     bill: {
        type: Number,
        required: true,
        default: 0
     }
    },{
      timestamps: true
});

const cartSchema = mongoose.model("carts", cart);

module.exports = { cartSchema };