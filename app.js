const express = require('express');
const connectDB = require('./config/db')
require('dotenv').config();


connectDB;
const app = express();


app.listen(3000, function () {
    console.log('listening on port 3000')
})