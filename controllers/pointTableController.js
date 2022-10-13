const db = require("../models");
const PointTable = db.pointTable;
const Match = db.match;
const Tournament = db.tournament;
const TournamentTeam = db.tournamentTeam;
const Country = db.country;
const Franchise = db.franchise;
const Player = db.player;
const Helper = require("../utils/helper");
const helper = new Helper();

const pointTableAdd = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "point_table_add")
  //     .then((rolePerm) => {
  if (!req.body.match_id) {
    res.status(400).send({
      msg: "Please pass point table name.",
    });
  } else {
    PointTable.create({
      match_id: req.body.match_id,
      tournament_team_id: req.body.tournament_team_id,
      player_id: req.body.player_id,
      run: req.body.run,
      wicket: req.body.wicket,
      man_of_the_match: req.body.man_of_the_match,
      fifty: req.body.fifty,
      hundred: req.body.hundred,
      five_wickets: req.body.five_wickets,
    })
      .then((pointTable) => res.status(201).send(pointTable))
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const pointTableGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "point_table_get_all")
  //     .then((rolePerm) => {
  PointTable.findAll({
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
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const pointTableGet = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "point_table_get")
  //     .then((rolePerm) => {
  PointTable.findByPk(req.params.id)
    .then((pointTable) => res.status(200).send(pointTable))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const pointTableUpdate = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "point_table_update")
  //     .then((rolePerm) => {
  if (!req.params.id || !req.body.match_id) {
    res.status(400).send({
      msg: "Please pass pointTable ID, match_id",
    });
  } else {
    PointTable.findByPk(req.params.id)
      .then((pointTable) => {
        PointTable.update(
          {
            match_id: req.body.match_id || pointTable.match_id,
            tournament_team_id:
              req.body.tournament_team_id || pointTable.tournament_team_id,
            player_id: req.body.player_id || pointTable.player_id,
            run: req.body.run || pointTable.run,
            wicket: req.body.wicket || pointTable.wicket,
            man_of_the_match:
              req.body.man_of_the_match || pointTable.man_of_the_match,
            fifty: req.body.fifty || pointTable.fifty,
            hundred: req.body.hundred || pointTable.hundred,
            five_wickets: req.body.five_wickets || pointTable.five_wickets,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then((_) => {
            res.status(200).send({
              msg: "PointTable updated",
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

const pointTableDelete = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "point_table_delete")
  //     .then((rolePerm) => {
  if (!req.params.id) {
    res.status(400).send({
      msg: "Please pass pointTable ID.",
    });
  } else {
    PointTable.findByPk(req.params.id)
      .then((pointTable) => {
        if (pointTable) {
          pointTable
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then((_) => {
              res.status(200).send({
                msg: "Point Table deleted",
              });
            })
            .catch((err) => res.status(400).send(err));
        } else {
          res.status(404).send({
            msg: "Point Table not found",
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
  pointTableAdd,
  pointTableGetAll,
  pointTableGet,
  pointTableUpdate,
  pointTableDelete,
};
