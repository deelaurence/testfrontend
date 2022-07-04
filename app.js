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
app.use("/api/v1/", authRoute);

//test auth with frontend
const path = require("path");
app.use(upload.array());
app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/register.html"));
});
app.get("/welcome", (req, res) => [
  res.sendFile(path.resolve(__dirname, "./public/loggedin.html")),
]);

let port = process.env.port || 3000;

app.listen(port, function () {
  console.log("listening on port", port);
});
