const { default: mongoose } = require('mongoose');
const Mongoose  = require('mongoose');
const { Schema } = mongoose;

const user = new Schema ({
    username: String,
    email: String,
    role: String,
    password: String
});

const userSchema = mongoose.model('users', user);

module.exports = { userSchema };