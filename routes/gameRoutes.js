const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  gameAdd,
  gameGetAll,
  gameGet,
  gameUpdate,
  gameDelete,
} = require("../controllers/gameController");
const {
  gameDuplicateCheck,
  gameDuplicateCheckUpdate,
} = require("../middlewares/gameMiddleware");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    gameDuplicateCheck,
  ],
  gameAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  gameGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  gameGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    gameDuplicateCheckUpdate,
  ],
  gameUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  gameDelete
);

module.exports = router;
