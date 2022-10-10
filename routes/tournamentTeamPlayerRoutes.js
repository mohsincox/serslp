const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  tournamentTeamPlayerAdd,
  tournamentTeamPlayerGetAll,
  tournamentTeamPlayerGet,
  tournamentTeamPlayerUpdate,
  tournamentTeamPlayerDelete,
  teamTournamentGetAll,
  gamePlayerGetAll,
} = require("../controllers/tournamentTeamPlayerController");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    // tournamentTeamPlayerDuplicateCheck,
  ],
  tournamentTeamPlayerAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentTeamPlayerGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentTeamPlayerGet
);

router.get(
  "/tt/:tournament_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  teamTournamentGetAll
);

router.get(
  "/players/:game_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  gamePlayerGetAll
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    // tournamentTeamPlayerDuplicateCheckUpdate,
  ],
  tournamentTeamPlayerUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentTeamPlayerDelete
);

module.exports = router;
