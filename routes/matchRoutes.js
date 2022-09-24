const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  matchAdd,
  matchGetAll,
  matchGet,
  matchUpdate,
  matchDelete,
} = require("../controllers/matchController");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    // matchDuplicateCheck,
  ],
  matchAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  matchGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  matchGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    // matchDuplicateCheckUpdate,
  ],
  matchUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  matchDelete
);

module.exports = router;
