const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  clubAdd,
  clubGetAll,
  clubGet,
  clubUpdate,
  clubDelete,
  uploadClubLogo,
} = require("../controllers/clubController");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadClubLogo,
    // clubDuplicateCheck,
  ],
  clubAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  clubGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  clubGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadClubLogo,
    // clubDuplicateCheckUpdate,
  ],
  clubUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  clubDelete
);

module.exports = router;
