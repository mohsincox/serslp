const express = require("express");
const router = express.Router();
const db = require("../models");
const Tournament = db.tournament;

router.get("/", (req, res) => {
  Tournament.findAll({})
    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
