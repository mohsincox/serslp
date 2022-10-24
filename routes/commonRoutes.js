const express = require("express");
const router = express.Router();
const {
  countryGetAllCommon,
  countryGetCommon,
} = require("../controllers/commonController");

router.get("/countries", countryGetAllCommon);

router.get("/country/:id", countryGetCommon);

module.exports = router;
