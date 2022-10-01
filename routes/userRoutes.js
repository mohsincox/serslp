const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../config/passport")(passport);
const {
  userAdd,
  userGetAll,
  userGet,
  userUpdate,
  userDelete,
} = require("../controllers/userController");
const { checkDuplicateEmail } = require("../middlewares/authMiddleware");
const { userDuplicateCheckUpdate } = require("../middlewares/userMiddleware");

// Create a new User
router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    checkDuplicateEmail,
  ],
  userAdd
);

// Get List of Users
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  userGetAll
);

// Get User by ID
router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  userGet
);

// Update a User
router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    userDuplicateCheckUpdate,
  ],
  userUpdate
);

// Delete a User
router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  userDelete
);

module.exports = router;
