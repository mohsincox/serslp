const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  tournamentTeamAdd,
  tournamentTeamGet,
  tournamentTeamGetAll,
  tournamentTeamUpdate,
  tournamentTeamDelete,
} = require("../controllers/tournamentTeamController");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    // tournamentTeamDuplicateCheck,
  ],
  tournamentTeamAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentTeamGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentTeamGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    // tournamentTeamDuplicateCheckUpdate,
  ],
  tournamentTeamUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentTeamDelete
);

module.exports = router;
