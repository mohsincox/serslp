const db = require("../models");
const PointTable = db.pointTable;

const pointTableDuplicateCheck = (req, res, next) => {
  if (!req.body.match_id) {
    res.status(400).send({
      msg: "Please pass pointTable match",
    });
    return;
  }

  PointTable.findOne({
    where: {
      match_id: req.body.match_id,
      tournament_team_id: req.body.tournament_team_id,
      player_id: req.body.player_id,
    },
  }).then((pointTable) => {
    if (pointTable) {
      res.status(400).send({
        msg: "Failed! PointTable Player is already exist!",
      });
      return;
    }

    next();
  });
};

const pointTableDuplicateCheckUpdate = (req, res, next) => {
  PointTable.findOne({
    where: {
      match_id: req.body.match_id,
      tournament_team_id: req.body.tournament_team_id,
      player_id: req.body.player_id,
    },
  }).then((pointTable) => {
    if (pointTable) {
      if (pointTable.id != req.params.id) {
        res.status(400).send({
          msg: "Failed! PointTable name is already exist!",
        });
        return;
      }
    }

    next();
  });
};

module.exports = {
  pointTableDuplicateCheck,
  pointTableDuplicateCheckUpdate,
};
