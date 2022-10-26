const multer = require("multer");
const path = require("path");
const db = require("../models");
const Player = db.player;
const Game = db.game;
const Country = db.country;
const Franchise = db.franchise;
const Helper = require("../utils/helper");
const helper = new Helper();

const playerAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "player_add")
    .then((rolePerm) => {
      if (!req.body.name) {
        res.status(400).send({
          msg: "Please pass player name.",
        });
      } else {
        if (req.file == undefined) {
          Player.create({
            name: req.body.name,
            game_id: req.body.game_id,
            country_id: req.body.country_id,
            franchise_id: req.body.franchise_id,
            specification: `{ "All Rounder":${req.body.isAllRounder}, "Batsman":${req.body.isBatsman}, "Bowler":${req.body.isBowler}, "Keeper":${req.body.isKeeper}, "Goalkeeper":${req.body.isGoalkeeper}, "Defender":${req.body.isDefender}, "Midfielder":${req.body.isMidfielder}, "Forward":${req.body.isForward} }`,
            ranking: req.body.ranking,
            point: req.body.point,
            status: req.body.status,
            image: "",
          })
            .then((player) => res.status(201).send(player))
            .catch((err) => {
              console.log(err);
              res.status(400).send(err);
            });
        } else {
          Player.create({
            name: req.body.name,
            game_id: req.body.game_id,
            country_id: req.body.country_id,
            franchise_id: req.body.franchise_id,
            specification: `{ "All Rounder":${req.body.isAllRounder}, "Batsman":${req.body.isBatsman}, "Bowler":${req.body.isBowler}, "Keeper":${req.body.isKeeper}, "Goalkeeper":${req.body.isGoalkeeper}, "Defender":${req.body.isDefender}, "Midfielder":${req.body.isMidfielder}, "Forward":${req.body.isForward} }`,
            ranking: req.body.ranking,
            point: req.body.point,
            status: req.body.status,
            image: req.file.path,
          })
            .then((player) => res.status(201).send(player))
            .catch((err) => {
              console.log(err);
              res.status(400).send(err);
            });
        }
      }
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const playerGetAll = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "player_get_all")
    .then((rolePerm) => {
      Player.findAll({
        include: [
          {
            model: Game,
          },
          {
            model: Country,
          },
          {
            model: Franchise,
          },
        ],
      })
        .then((players) => res.status(200).send(players))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const playerGetAllActive = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "player_get_all")
  //   .then((rolePerm) => {
  Player.findAll({
    where: {
      status: "Active",
    },
    include: [
      {
        model: Game,
      },
      {
        model: Country,
      },
      {
        model: Franchise,
      },
    ],
  })
    .then((players) => res.status(200).send(players))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const allPlayerGetAll = (req, res) => {
  Player.findAll({
    include: [
      {
        model: Game,
      },
      {
        model: Country,
      },
      {
        model: Franchise,
      },
    ],
  })
    .then((players) => res.status(200).send(players))
    .catch((err) => {
      res.status(400).send(err);
    });
};

const playerCountryGetAll = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "player_get_all")
    .then((rolePerm) => {
      Player.findAll({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Country,
          },
        ],
      })
        .then((players) => res.status(200).send(players))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const playerGet = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "player_get")
    .then((rolePerm) => {
      Player.findByPk(req.params.id)
        .then((player) => res.status(200).send(player))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const playerUpdate = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "player_update")
    .then((rolePerm) => {
      if (!req.params.id || !req.body.name) {
        res.status(400).send({
          msg: "Please pass player ID, name",
        });
      } else {
        if (req.file == undefined) {
          Player.findByPk(req.params.id)
            .then((player) => {
              Player.update(
                {
                  name: req.body.name || player.name,
                  game_id: req.body.game_id || player.game_id,
                  country_id: req.body.country_id || player.country_id,
                  franchise_id: req.body.franchise_id || player.franchise_id,
                  specification:
                    `{ "All Rounder":${req.body.isAllRounder}, "Batsman":${req.body.isBatsman}, "Bowler":${req.body.isBowler}, "Keeper":${req.body.isKeeper}, "Goalkeeper":${req.body.isGoalkeeper}, "Defender":${req.body.isDefender}, "Midfielder":${req.body.isMidfielder}, "Forward":${req.body.isForward} }` ||
                    player.specification,
                  ranking: req.body.ranking || player.ranking,
                  point: req.body.point || player.point,
                  status: req.body.status || player.status,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then((_) => {
                  res.status(200).send({
                    msg: "Player updated",
                  });
                })
                .catch((err) => res.status(400).send(err));
            })
            .catch((error) => {
              res.status(400).send(error);
            });
        } else {
          Player.findByPk(req.params.id)
            .then((player) => {
              Player.update(
                {
                  name: req.body.name || player.name,
                  game_id: req.body.game_id || player.game_id,
                  country_id: req.body.country_id || player.country_id,
                  franchise_id: req.body.franchise_id || player.franchise_id,
                  specification:
                    `{ "All Rounder":${req.body.isAllRounder}, "Batsman":${req.body.isBatsman}, "Bowler":${req.body.isBowler}, "Keeper":${req.body.isKeeper}, "Goalkeeper":${req.body.isGoalkeeper}, "Defender":${req.body.isDefender}, "Midfielder":${req.body.isMidfielder}, "Forward":${req.body.isForward} }` ||
                    player.specification,
                  ranking: req.body.ranking || player.ranking,
                  point: req.body.point || player.point,
                  status: req.body.status || player.status,
                  image: req.file.path,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then((_) => {
                  res.status(200).send({
                    msg: "Player updated",
                  });
                })
                .catch((err) => res.status(400).send(err));
            })
            .catch((error) => {
              res.status(400).send(error);
            });
        }
      }
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const playerDelete = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "player_delete")
    .then((rolePerm) => {
      if (!req.params.id) {
        res.status(400).send({
          msg: "Please pass player ID.",
        });
      } else {
        Player.findByPk(req.params.id)
          .then((player) => {
            if (player) {
              player
                .destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                .then((_) => {
                  res.status(200).send({
                    msg: "Player deleted",
                  });
                })
                .catch((err) => res.status(400).send(err));
            } else {
              res.status(404).send({
                msg: "Player not found",
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, "Player_" + Date.now() + path.extname(file.originalname));
  },
});

const uploadPlayerImage = multer({
  storage: storage,
  limits: { fileSize: "5000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

module.exports = {
  playerAdd,
  playerGetAll,
  playerGet,
  playerUpdate,
  playerDelete,
  uploadPlayerImage,
  playerCountryGetAll,
  allPlayerGetAll,
  playerGetAllActive,
};
