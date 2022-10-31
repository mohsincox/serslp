const express = require("express");
const router = express.Router();
const {
  countryGetAllCommon,
  countryGetCommon,
  tournamentGetCommon,
} = require("../controllers/commonController");

router.get("/countries", countryGetAllCommon);
router.get("/country/:id", countryGetCommon);

router.get("/tournament/:id", tournamentGetCommon);

module.exports = router;
