const express = require("express");
const { check } = require("../middleware/loginMiddleware");
const router = express.Router();
const {
  register,
  login,
  general,
  restricted,
  logout
} = require("../controller/authController");

router.post("/", register);

router.post("/login", login);

router.get("/general", general);
router.get("/restricted", check, restricted);
router.get("/logout", logout);

module.exports = router;
