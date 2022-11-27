const db = require("../models");
const Game = db.game;
const Helper = require("../utils/helper");
const helper = new Helper();

const gameAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "game_add")
    .then((rolePerm) => {
      if (!req.body.name) {
        res.status(400).send({
          msg: "Please pass game name.",
        });
      } else {
        Game.create({
          name: req.body.name,
          detail: req.body.detail,
        })
          .then((game) => res.status(201).send(game))
          .catch((err) => {
            console.log(err);
            res.status(400).send(err);
          });
      }
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const gameGetAll = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "game_view")
    .then((rolePerm) => {
      Game.findAll()
        .then((games) => res.status(200).send(games))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const gameGet = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "game_view")
    .then((rolePerm) => {
      Game.findByPk(req.params.id)
        .then((game) => res.status(200).send(game))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const gameUpdate = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "game_add")
    .then((rolePerm) => {
      if (!req.params.id || !req.body.name) {
        res.status(400).send({
          msg: "Please pass game ID, name",
        });
      } else {
        Game.findByPk(req.params.id)
          .then((game) => {
            Game.update(
              {
                name: req.body.name || game.name,
                detail: req.body.detail || game.detail,
              },
              {
                where: {
                  id: req.params.id,
                },
              }
            )
              .then((_) => {
                res.status(200).send({
                  msg: "Game updated",
                });
              })
              .catch((err) => res.status(400).send(err));
          })
          .catch((error) => {
            res.status(400).send(error);
          });
      }
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const gameDelete = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "game_delete")
    .then((rolePerm) => {
      if (!req.params.id) {
        res.status(400).send({
          msg: "Please pass game ID.",
        });
      } else {
        Game.findByPk(req.params.id)
          .then((game) => {
            if (game) {
              game
                .destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                .then((_) => {
                  res.status(200).send({
                    msg: "Game deleted",
                  });
                })
                .catch((err) => res.status(400).send(err));
            } else {
              res.status(404).send({
                msg: "Game not found",
              });
            }
          })
          .catch((error) => {
            res.status(400).send(error);
          });
      }
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

module.exports = {
  gameAdd,
  gameGetAll,
  gameGet,
  gameUpdate,
  gameDelete,
};
