const express = require("express");
const router = express.Router();
const passport = require("passport");
const { changePassword } = require("../controllers/authUserController");

require("../config/passport")(passport);

router.post(
  "/change-password",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
  ],
  changePassword
);

module.exports = router;
