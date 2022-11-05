const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  tournamentRankingReport,
  tournamentReport,
} = require("../controllers/reportController");

require("../config/passport")(passport);

router.get(
  "/tournament-report",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentReport
);

router.get(
  "/tournament-ranking-report/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  tournamentRankingReport
);

module.exports = router;
