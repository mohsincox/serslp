const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const db = require("../models");
const Tournament = db.tournament;
const TeamDetail = db.teamDetail;
const User = db.user;
const Player = db.player;
const Country = db.country;

router.get("/tournaments", (req, res) => {
  Tournament.findAll({})
    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/:user_id/test/:tournament_id", (req, res) => {
  TeamDetail.findAll({
    where: {
      tournament_id: req.params.tournament_id,
      user_id: req.params.user_id,
    },
    include: [
      {
        model: Player,
        include: [
          {
            model: Country,
          },
        ],
      },
      {
        model: Tournament,
      },
    ],
  })

    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
