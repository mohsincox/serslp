const multer = require("multer");
const path = require("path");
const db = require("../models");
const Tournament = db.tournament;
const Game = db.game;
const Helper = require("../utils/helper");
const helper = new Helper();

const tournamentAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "tournament_add")
    .then((rolePerm) => {
      if (!req.body.name) {
        res.status(400).send({
          msg: "Please pass tournament name.",
        });
      } else {
        if (req.file == undefined) {
          Tournament.create({
            name: req.body.name,
            game_id: req.body.game_id,
            month: req.body.month,
            year: req.body.year,
            category: req.body.category,
            status: req.body.status,
            upcomming: req.body.upcomming,
            logo: "",
          })
            .then((tournament) => res.status(201).send(tournament))
            .catch((err) => {
              console.log(err);
              res.status(400).send(err);
            });
        } else {
          Tournament.create({
            name: req.body.name,
            game_id: req.body.game_id,
            month: req.body.month,
            year: req.body.year,
            category: req.body.category,
            status: req.body.status,
            upcomming: req.body.upcomming,
            logo: req.file.path,
          })
            .then((tournament) => res.status(201).send(tournament))
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

const tournamentGetAll = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "tournament_view")
    .then((rolePerm) => {
      Tournament.findAll({
        include: [
          {
            model: Game,
          },
        ],
      })
        .then((tournaments) => res.status(200).send(tournaments))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const tournamentGet = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "tournament_view")
    .then((rolePerm) => {
      Tournament.findByPk(req.params.id)
        .then((tournament) => res.status(200).send(tournament))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const tournamentUpdate = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "tournament_update")
    .then((rolePerm) => {
      if (!req.params.id || !req.body.name) {
        res.status(400).send({
          msg: "Please pass tournament ID, name",
        });
      } else {
        if (req.file == undefined) {
          Tournament.findByPk(req.params.id)
            .then((tournament) => {
              Tournament.update(
                {
                  name: req.body.name || tournament.name,
                  game_id: req.body.game_id || tournament.game_id,
                  month: req.body.month || tournament.month,
                  year: req.body.year || tournament.year,
                  category: req.body.category || tournament.category,
                  status: req.body.status || tournament.status,
                  upcomming: req.body.upcomming || tournament.upcomming,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then((_) => {
                  res.status(200).send({
                    msg: "Tournament updated",
                  });
                })
                .catch((err) => res.status(400).send(err));
            })
            .catch((error) => {
              res.status(400).send(error);
            });
        } else {
          Tournament.findByPk(req.params.id)
            .then((tournament) => {
              Tournament.update(
                {
                  name: req.body.name || tournament.name,
                  game_id: req.body.game_id || tournament.game_id,
                  month: req.body.month || tournament.month,
                  year: req.body.year || tournament.year,
                  category: req.body.category || tournament.category,
                  status: req.body.status || tournament.status,
                  upcomming: req.body.upcomming || tournament.upcomming,
                  logo: req.file.path,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then((_) => {
                  res.status(200).send({
                    msg: "Tournament updated",
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

const tournamentDelete = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "tournament_delete")
    .then((rolePerm) => {
      if (!req.params.id) {
        res.status(400).send({
          msg: "Please pass tournament ID.",
        });
      } else {
        Tournament.findByPk(req.params.id)
          .then((tournament) => {
            if (tournament) {
              tournament
                .destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                .then((_) => {
                  res.status(200).send({
                    msg: "Tournament deleted",
                  });
                })
                .catch((err) => res.status(400).send(err));
            } else {
              res.status(404).send({
                msg: "Tournament not found",
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
    cb(null, "Tournament_" + Date.now() + path.extname(file.originalname));
  },
});

const uploadTourLogo = multer({
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
}).single("logo");

module.exports = {
  tournamentAdd,
  tournamentGetAll,
  tournamentGet,
  tournamentUpdate,
  tournamentDelete,
  uploadTourLogo,
};
