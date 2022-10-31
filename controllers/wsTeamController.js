const db = require("../models");
const Team = db.team;
const TeamDetail = db.teamDetail;
const Player = db.player;
const Country = db.country;
const Helper = require("../utils/helper");
const helper = new Helper();

const teamAdd = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "permission_add")
  //   .then((rolePerm) => {
  if (!req.body.user_id || !req.body.tournament_id || !req.body.player_ids) {
    res.status(400).send({
      msg: "Please pass tournament and player list.",
    });
  } else {
    TeamDetail.destroy({
      where: {
        user_id: req.body.user_id,
        tournament_id: req.body.tournament_id,
      },
    });

    Team.create({
      user_id: req.body.user_id,
      tournament_id: req.body.tournament_id,
      player_ids: req.body.player_ids,
    })
      .then((team) => {
        const selectedPlayers = JSON.parse(req.body.player_ids);

        for (i = 0; i < selectedPlayers.length; i++) {
          TeamDetail.create({
            user_id: req.body.user_id,
            team_id: team.id,
            tournament_id: req.body.tournament_id,
            player_id: selectedPlayers[i],
          });
        }
      })
      .then((team) => res.status(201).send(team))
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }
  //   })
  //   .catch((err) => {
  //     res.status(403).send(err);
  //   });
};

const viewTeam = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_get")
  //     .then((rolePerm) => {
  Team.findOne({
    where: {
      user_id: req.params.userId,
    },
  })
    .then((team) => res.status(200).send(team))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const viewTeamDetail = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_get")
  //     .then((rolePerm) => {
  TeamDetail.findAll({
    where: {
      user_id: req.params.userId,
      tournament_id: req.params.tourId,
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
    ],
  })
    .then((team) => res.status(200).send(team))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const confirmTeam = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_update")
  //     .then((rolePerm) => {
  if (!req.params.userId || !req.params.tourId) {
    res.status(400).send({
      msg: "Please pass user ID, name, tournament",
    });
  } else {
    Team.findOne({
      where: { user_id: req.params.userId, tournament_id: req.params.tourId },
      // order: [["createdAt", "DESC"]],
    })
      .then((team) => {
        Team.update(
          {
            confirm: true,
          },
          {
            where: {
              id: team.id,
            },
          }
        )
          .then((_) => {
            res.status(200).send({
              msg: "Team Confirm",
            });
          })
          .catch((err) => res.status(400).send(err));
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

module.exports = {
  teamAdd,
  viewTeam,
  viewTeamDetail,
  confirmTeam,
};
