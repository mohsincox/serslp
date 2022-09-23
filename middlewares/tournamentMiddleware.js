const db = require("../models");
const Tournament = db.tournament;

const tournamentDuplicateCheck = (req, res, next) => {
  console.log("firstuuuuuuuu --------------", req.body);
  if (!req.body.name) {
    res.status(400).send({
      msg: "Please pass tournament name I middlew",
    });
    return;
  }

  Tournament.findOne({
    where: {
      name: req.body.name,
      game_id: req.body.game_id,
      month: req.body.month,
      year: req.body.year,
    },
  }).then((tournament) => {
    if (tournament) {
      res.status(400).send({
        msg: "Failed! Tournament name is already exist!",
      });
      return;
    }

    next();
  });
};

const tournamentDuplicateCheckUpdate = (req, res, next) => {
  console.log("firstyyyyyyyyyyyyyyy-------", req.body);
  Tournament.findOne({
    where: {
      name: req.body.name,
      game_id: req.body.game_id,
      month: req.body.month,
      year: req.body.year,
    },
  }).then((tournament) => {
    if (tournament) {
      if (tournament.id != req.params.id) {
        res.status(400).send({
          msg: "Failed! Tournament name is already exist!",
        });
        return;
      }
    }

    next();
  });
};

module.exports = {
  tournamentDuplicateCheck,
  tournamentDuplicateCheckUpdate,
};
