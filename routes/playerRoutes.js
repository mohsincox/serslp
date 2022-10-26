const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  uploadPlayerImage,
  playerAdd,
  playerGetAll,
  playerGet,
  playerDelete,
  playerUpdate,
  playerCountryGetAll,
  allPlayerGetAll,
  playerGetAllActive,
} = require("../controllers/playerController");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadPlayerImage,
    // playerDuplicateCheck,
  ],
  playerAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  playerGetAll
);

router.get(
  "/active",
  passport.authenticate("jwt", {
    session: false,
  }),
  playerGetAllActive
);

router.get("/all/", allPlayerGetAll);

router.get(
  "/country/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  playerCountryGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  playerGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadPlayerImage,
    // playerDuplicateCheckUpdate,
  ],
  playerUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  playerDelete
);

module.exports = router;
