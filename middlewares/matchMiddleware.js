const db = require("../models");
const Match = db.match;

const matchDuplicateCheck = (req, res, next) => {
  if (!req.body.tournament_id) {
    res.status(400).send({
      msg: "Please pass tournament id I middlew",
    });
    return;
  }

  Match.findOne({
    where: {
        tournament_id: req.body.tournament_id ,
        tournament_team_one_id: req.body.tournament_team_one_id,
        tournament_team_two_id: req.body.tournament_team_two_id,
        start_date: req.body.start_date,
    },
  }).then((match) => {
    if (match) {
      res.status(400).send({
        msg: "Failed! Match is already exist!",
      });
      return;
    }

    next();
  });
};

const matchDuplicateCheckUpdate = (req, res, next) => {
  Match.findOne({
    where: {
        tournament_id: req.body.tournament_id ,
        tournament_team_one_id: req.body.tournament_team_one_id,
        tournament_team_two_id: req.body.tournament_team_two_id,
        start_date: req.body.start_date,
    },
  }).then((match) => {
    if (match) {
      if (match.id != req.params.id) {
        res.status(400).send({
          msg: "Failed! Match is already exist!",
        });
        return;
      }
    }

    next();
  });
};

module.exports = {
  matchDuplicateCheck,
  matchDuplicateCheckUpdate,
};
