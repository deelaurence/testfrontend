const express = require("express");
const connectDB = require("./config/db");
const indexRoute = require("./routes/indexRoute");
const authRoute = require("./routes/authRoute");
require("dotenv").config();

//CONNECT TO DATABASE
connectDB;

const app = express();

//BODY PARSER
app.use(express.json());

//ROUTE
app.use("/", authRoute);

app.use(express.urlencoded({ extended: false }));

app.listen(3000, function () {
  console.log("listening on port 3000");
});
