const db = require("../models");
const Game = db.game;

const gameDuplicateCheck = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      msg: "Please pass game name I middlew",
    });
    return;
  }

  Game.findOne({
    where: {
      name: req.body.name,
    },
  }).then((game) => {
    if (game) {
      res.status(400).send({
        msg: "Failed! Game name is already exist!",
      });
      return;
    }

    next();
  });
};

const gameDuplicateCheckUpdate = (req, res, next) => {
  Game.findOne({
    where: {
      name: req.body.name,
    },
  }).then((game) => {
    if (game) {
      if (game.id != req.params.id) {
        res.status(400).send({
          msg: "Failed! Game name is already exist!",
        });
        return;
      }
    }

    next();
  });
};

module.exports = {
  gameDuplicateCheck,
  gameDuplicateCheckUpdate,
};
