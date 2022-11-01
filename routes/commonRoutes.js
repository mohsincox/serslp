const express = require("express");
const router = express.Router();
const {
  countryGetAllCommon,
  countryGetCommon,
  tournamentGetCommon,
  tournamentTeamPlayerDetailGetAllCommon,
  tournamentTeamGetAllCommon,
} = require("../controllers/commonController");

router.get("/countries", countryGetAllCommon);
router.get("/country/:id", countryGetCommon);

router.get("/tournament/:id", tournamentGetCommon);

router.get(
  "/tournament-team-player-deatil/:tourId",
  tournamentTeamPlayerDetailGetAllCommon
);

router.get("/tournament-team/:tourId", tournamentTeamGetAllCommon);

module.exports = router;
