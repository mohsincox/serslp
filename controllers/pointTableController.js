const db = require("../models");
const PointTable = db.pointTable;
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
      tournament_id: req.body.tournament_id,
      tournament_team_id: req.body.tournament_team_id,
      player_id: req.body.player_id,
      run: req.body.run,
      wicket: req.body.wicket,
      nam_of_the_match: req.body.nam_of_the_match,
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
  PointTable.findAll()
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
  if (!req.params.id || !req.body.name) {
    res.status(400).send({
      msg: "Please pass pointTable ID, name",
    });
  } else {
    PointTable.findByPk(req.params.id)
      .then((pointTable) => {
        PointTable.update(
          {
            name: req.body.name || pointTable.name,
            detail: req.body.detail || pointTable.detail,
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
