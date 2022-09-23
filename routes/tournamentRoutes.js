const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  uploadTourLogo,
  tournamentGetAll,
  tournamentGet,
  tournamentUpdate,
  tournamentDelete,
  tournamentAdd,
} = require("../controllers/tournamentController");
const {
  tournamentDuplicateCheck,
  tournamentDuplicateCheckUpdate,
} = require("../middlewares/tournamentMiddleware");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadTourLogo,
    tournamentDuplicateCheck,
  ],
  tournamentAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadTourLogo,
    tournamentDuplicateCheckUpdate,
  ],
  tournamentUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentDelete
);

module.exports = router;
