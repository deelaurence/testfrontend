const express = require('express');
const connectDB = require('./config/db');
const indexRoute = require('./routes/indexRoute');
require('dotenv').config();

//CONNECT TO DATABASE
connectDB;

const app = express();

//BODY PARSER
app.use(express.json());

//ROUTE
app.use('/api', indexRoute);

app.listen(3000, function () {
    console.log('listening on port 3000')
});