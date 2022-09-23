const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { checkDuplicateEmail } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", [checkDuplicateEmail], registerUser);

router.post("/signin", loginUser);

module.exports = router;
