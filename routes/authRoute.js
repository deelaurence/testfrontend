const express = require("express");
const { check } = require("../middleware/loginMiddleware");
const router = express.Router();

const {
  register,
  login,
  general,
  restricted,
  logout,
  getUsername,
} = require("../controller/authController");

router.post("/register", register);

router.post("/login", login);
router.post("/getusername", getUsername);

router.get("/general", general);
router.post("/restricted", check, restricted);
router.get("/logout", logout);

module.exports = router;
