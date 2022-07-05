const express = require("express");
const connectDB = require("./config/db");
const indexRoute = require("./routes/indexRoute");
const authRoute = require("./routes/authRoute");
require("dotenv").config();
const multer = require("multer");
const upload = multer();
const app = express();
const { itemSchema } = require("./models/itemModel");

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
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/register.html"));
});
app.get("/welcome", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/loggedin.html"));
});

app.get("/products", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/products.html"));
});
const { check } = require("./middleware/loginMiddleware");

app.post("/buy", check, async (req, res) => {
  console.log(req.headers.authorization);
});
app.post("/updateDB", async (req, res) => {
  console.log(req.headers.authorization);
  const { itemName, itemOwner } = req.body;
  const newItem = new itemSchema({
    owner: itemOwner,
    name: itemName,
  });
  await newItem.save();
  res.send(newItem);
});

let port = process.env.port || 3000;

app.listen(port, function () {
  console.log("listening on port", port);
});
