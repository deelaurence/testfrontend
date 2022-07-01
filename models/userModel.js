const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const user = new Schema({
  usernameDB: {
    type: String,
    lowercase: true,
    required: true
  },

  emailDB: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },

  phoneNumberDB:{ 
    type: Number,
    required: true
  },

  passwordDB: {
    type: String,
    required: true,
    minlength: 7,
    validate(value){
      if (value.toLowerCase().includes('password')){
        console.log ('Use Another Password');
      }
    }
  },

  roleDB: {
    type: String,
    required: true
  },

  tokensDB: [{
    token: {
      type: String,
      required: true
    }
  }]
},{
  timestamps: true
});

const userSchema = mongoose.model("users", user);



module.exports = { userSchema };
