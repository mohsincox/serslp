const express = require("express");
const router = express.Router();
const db = require("../models");
const Tournament = db.tournament;
const Match = db.match;
const Country = db.country;
const Franchise = db.franchise;

const TournamentTeam = db.tournamentTeam;

router.get("/", (req, res) => {
  Tournament.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: Match,
        include: [
          {
            model: TournamentTeam,
            as: "tournament_team_one",
            include: [
              {
                model: Country,
              },
              {
                model: Franchise,
              },
            ],
          },
          {
            model: TournamentTeam,
            as: "tournament_team_two",
            include: [
              {
                model: Country,
              },
              {
                model: Franchise,
              },
            ],
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

router.get("/active", (req, res) => {
  Tournament.findAll({
    where: {
      status: "Active",
    },
    include: [
      {
        model: Match,
        include: [
          {
            model: TournamentTeam,
            as: "tournament_team_one",
            include: [
              {
                model: Country,
              },
              {
                model: Franchise,
              },
            ],
          },
          {
            model: TournamentTeam,
            as: "tournament_team_two",
            include: [
              {
                model: Country,
              },
              {
                model: Franchise,
              },
            ],
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
    include: [
      {
        model: Country,
      },
      {
        model: Franchise,
      },
    ],
  })
    .then((tournamentTeams) => res.status(200).send(tournamentTeams))
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
