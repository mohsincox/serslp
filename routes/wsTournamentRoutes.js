const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  tournamentCricketGetAll,
  tournamentFootballGetAll,
  gameTournamentsGetAll,
  gameTournamentsUpcommingGetAll,
  gameTournamentsActiveGetAll,
} = require("../controllers/wsTournamentController");
require("../config/passport")(passport);

router.get(
  "/cricket",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentCricketGetAll
);

router.get(
  "/football",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentFootballGetAll
);

router.get("/game-tournaments", gameTournamentsGetAll);
router.get("/game-tournaments-upcomming", gameTournamentsUpcommingGetAll);
router.get("/game-tournaments-active", gameTournamentsActiveGetAll);

module.exports = router;
