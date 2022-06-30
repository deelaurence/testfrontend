const mongoose = require("mongoose");

const { Schema } = mongoose;
const user = new Schema({
  usernameDB: String,
  emailDB: String,
  passwordDB: String,
  roleDB: String,
});

const userSchema = mongoose.model("username", user);

module.exports = { userSchema };
