const db = require("../models");
const Player = db.player;

const playerDuplicateCheck = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      msg: "Please pass player name I middlew",
    });
    return;
  }

  Player.findOne({
    where: {
      name: req.body.name,
      game_id: req.body.game_id,
      country_id: req.body.country_id,
    },
  }).then((player) => {
    if (player) {
      res.status(400).send({
        msg: "Failed! Player is already exist!",
      });
      return;
    }

    next();
  });
};

const playerDuplicateCheckUpdate = (req, res, next) => {
  Player.findOne({
    where: {
      name: req.body.name,
      game_id: req.body.game_id,
      country_id: req.body.country_id,
    },
  }).then((player) => {
    if (player) {
      if (player.id != req.params.id) {
        res.status(400).send({
          msg: "Failed! Player is already exist!",
        });
        return;
      }
    }

    next();
  });
};

module.exports = {
  playerDuplicateCheck,
  playerDuplicateCheckUpdate,
};
