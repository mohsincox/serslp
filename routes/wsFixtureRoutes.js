const express = require("express");
const router = express.Router();
const db = require("../models");
const Tournament = db.tournament;
const Match = db.match;
const Country = db.country;

const TournamentTeam = db.tournamentTeam;

router.get("/", (req, res) => {
  Tournament.findAll({
    include: [
      {
        model: Match,
        include: [
          {
            model: Country,
            as: "country_one",
          },
          {
            model: Country,
            as: "country_two",
          },
        ],
      },
    ],
  })
    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/tt/:id", (req, res) => {
  TournamentTeam.findAll({
    where: {
      tournament_id: req.params.id,
    },
  })
    .then((tournamentTeams) => res.status(200).send(tournamentTeams))
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
