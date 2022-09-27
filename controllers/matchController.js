const db = require("../models");
const Match = db.match;
const Tournament = db.tournament;
const TournamentTeam = db.tournamentTeam;
const Country = db.country;
const Franchise = db.franchise;
// const Helper = require("../utils/helper");
// const helper = new Helper();

const matchAdd = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_add")
  //     .then((rolePerm) => {

  if (!req.body.stage_name) {
    res.status(400).send({
      msg: "Please pass match stage_name.",
    });
  } else {
    Match.create({
      stage_name: req.body.stage_name,
      tournament_id: req.body.tournament_id,
      tournament_team_one_id: req.body.tournament_team_one_id,
      tournament_team_two_id: req.body.tournament_team_two_id,
      start_date: req.body.start_date,
      start_time: req.body.start_time,
      venue: req.body.venue,
    })
      .then((match) => res.status(201).send(match))
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });

    // console.log("first ---------------------", req.file);
    // return;
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const matchGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_get_all")
  //     .then((rolePerm) => {
  Match.findAll({
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
    .then((matchs) => res.status(200).send(matchs))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const matchGet = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_get")
  //     .then((rolePerm) => {
  Match.findByPk(req.params.id)
    .then((match) => res.status(200).send(match))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const matchUpdate = (req, res) => {
  console.log("firstyyyyyyyyyyyyyyy22-------", req.body);
  //   helper
  //     .checkPermission(req.user.role_id, "permission_update")
  //     .then((rolePerm) => {
  if (!req.params.id || !req.body.stage_name) {
    res.status(400).send({
      msg: "Please pass match ID",
    });
  } else {
    Match.findByPk(req.params.id)
      .then((match) => {
        Match.update(
          {
            stage_name: req.body.stage_name || match.stage_name,
            tournament_id: req.body.tournament_id || match.tournament_id,
            tournament_team_one_id:
              req.body.tournament_team_one_id || match.tournament_team_one_id,
            tournament_team_two_id:
              req.body.tournament_team_two_id || match.tournament_team_two_id,
            start_date: req.body.start_date || match.start_date,
            start_time: req.body.start_time || match.start_time,
            venue: req.body.venue || match.venue,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then((_) => {
            res.status(200).send({
              msg: "Match updated",
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

const matchDelete = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_delete")
  //     .then((rolePerm) => {
  if (!req.params.id) {
    res.status(400).send({
      msg: "Please pass match ID.",
    });
  } else {
    Match.findByPk(req.params.id)
      .then((match) => {
        if (match) {
          match
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then((_) => {
              res.status(200).send({
                msg: "Match deleted",
              });
            })
            .catch((err) => res.status(400).send(err));
        } else {
          res.status(404).send({
            msg: "Match not found",
          });
        }
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
  matchAdd,
  matchGetAll,
  matchGet,
  matchUpdate,
  matchDelete,
};
