const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const db = require("../models");
const User = db.user;
const Player = db.player;
const Country = db.country;
const PointTable = db.pointTable;
const Match = db.match;
const Tournament = db.tournament;
const TournamentTeam = db.tournamentTeam;
const Franchise = db.franchise;
const Role = db.role;
const RolePermission = db.rolePermission;

router.get("/user-search", (req, res) => {
  User.findAll({
    where: {
      role_id: {
        [Op.not]: 8,
      },
      [Op.or]: [
        { name: { [Op.like]: `%${req.query.searchQuery}%` } },
        { email: { [Op.like]: `%${req.query.searchQuery}%` } },
        { phone_number: { [Op.like]: `%${req.query.searchQuery}%` } },
      ],
    },
    include: [
      {
        model: Role,
        include: [
          {
            model: RolePermission,
          },
        ],
      },
    ],
  })
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/customer-search", (req, res) => {
  User.findAll({
    where: {
      role_id: {
        [Op.eq]: 8,
      },
      [Op.or]: [
        { name: { [Op.like]: `%${req.query.searchQuery}%` } },
        { email: { [Op.like]: `%${req.query.searchQuery}%` } },
        { phone_number: { [Op.like]: `%${req.query.searchQuery}%` } },
      ],
    },
    include: [
      {
        model: Role,
        include: [
          {
            model: RolePermission,
          },
        ],
      },
    ],
  })
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/player-search", (req, res) => {
  if (req.query.searchQuery == "") {
    Player.findAll({
      where: {
        [Op.or]: [{ country_id: req.query.country_id }],
      },
      include: [
        {
          model: Country,
        },
      ],
    })
      .then((players) => res.status(200).send(players))
      .catch((err) => {
        res.status(400).send(err);
      });
  } else if (!req.query.searchQuery == "" && req.query.country_id == "") {
    Player.findAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${req.query.searchQuery}%` } }],
      },
      include: [
        {
          model: Country,
        },
      ],
    })
      .then((players) => res.status(200).send(players))
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    Player.findAll({
      where: {
        [Op.and]: [
          { name: { [Op.like]: `%${req.query.searchQuery}%` } },
          { country_id: req.query.country_id },
        ],
      },
      include: [
        {
          model: Country,
        },
      ],
    })
      .then((players) => res.status(200).send(players))
      .catch((err) => {
        res.status(400).send(err);
      });
  }
});

router.get("/tournament-team-search", (req, res) => {
  if (req.query.searchQuery == "") {
    TournamentTeam.findAll({
      where: {
        [Op.or]: [{ tournament_id: req.query.tournament_id }],
      },
      include: [
        {
          model: Tournament,
        },
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
  } else if (!req.query.searchQuery == "" && req.query.tournament_id == "") {
    TournamentTeam.findAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${req.query.searchQuery}%` } }],
      },
      include: [
        {
          model: Tournament,
        },
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
  } else {
    TournamentTeam.findAll({
      where: {
        [Op.and]: [
          { name: { [Op.like]: `%${req.query.searchQuery}%` } },
          { tournament_id: req.query.tournament_id },
        ],
      },
      include: [
        {
          model: Tournament,
        },
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
  }
});

router.get("/point-table-search", (req, res) => {
  PointTable.findAll({
    where: {
      [Op.or]: [{ match_id: req.query.match_id }],
    },
    include: [
      {
        model: Match,
        include: [
          {
            model: Tournament,
          },
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
      {
        model: Player,
      },
      {
        model: TournamentTeam,
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
  })
    .then((pointTables) => res.status(200).send(pointTables))
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/match-search", (req, res) => {
  Match.findAll({
    where: {
      [Op.or]: [{ id: req.query.match_id }],
    },
    include: [
      {
        model: Tournament,
      },
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
  })
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
