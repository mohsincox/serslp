const express = require("express");
const {
  registerUser,
  loginUser,
  uploadUserImage,
} = require("../controllers/authController");
const { checkDuplicateEmail } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", [uploadUserImage, checkDuplicateEmail], registerUser);

router.post("/signin", loginUser);

module.exports = router;
