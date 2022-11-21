const express = require("express");
const router = express.Router();
const {
  countryGetAllCommon,
  countryGetCommon,
  tournamentGetCommon,
  tournamentTeamPlayerDetailGetAllCommon,
  tournamentTeamGetAllCommon,
  tournamentFootballTeamSettingCommon,
  tournamentGetAllCommon,
} = require("../controllers/commonController");

router.get("/countries", countryGetAllCommon);
router.get("/country/:id", countryGetCommon);

router.get("/tournament/:id", tournamentGetCommon);

router.get(
  "/tournament-team-player-deatil/:tourId",
  tournamentTeamPlayerDetailGetAllCommon
);

router.get("/tournament-team/:tourId", tournamentTeamGetAllCommon);

router.get(
  "/tournament-football-team-setting",
  tournamentFootballTeamSettingCommon
);

router.get("/tournaments", tournamentGetAllCommon);

module.exports = router;
