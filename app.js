const express = require("express");
const connectDB = require("./config/db");
const indexRoute = require("./routes/indexRoute");
const authRoute = require("./routes/authRoute");
require("dotenv").config();
const multer = require("multer");
const upload = multer();
const app = express();
app.use(express.urlencoded({ extended: true }));
//CONNECT TO DATABASE
connectDB;

//BODY PARSER
app.use(express.json());
app.use(express.static("public"));

//ROUTE
app.use("/", authRoute);

//test auth with frontend
const path = require("path");
app.use(upload.array());
app.get("/frontend", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});
app.get("/welcome", (req, res) => [
  res.sendFile(path.resolve(__dirname, "./public/loggedin.html")),
]);

app.listen(3000, function () {
  console.log("listening on port 3000");
});
