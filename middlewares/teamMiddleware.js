const db = require("../models");
const Team = db.team;

const teamDuplicateCheck = (req, res, next) => {
  if (!req.body.user_id || !req.body.tournament_id) {
    res.status(400).send({
      msg: "Please pass tournament",
    });
    return;
  }

  Team.findOne({
    where: {
      user_id: req.body.user_id,
      tournament_id: req.body.tournament_id,
    },
  }).then((team) => {
    if (team) {
      res.status(400).send({
        msg: "Failed! You have a team in this tournament!",
      });
      return;
    }
    next();
  });
};

module.exports = {
  teamDuplicateCheck,
};
