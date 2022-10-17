const multer = require("multer");
const path = require("path");
const db = require("../models");
const Club = db.club;
const Game = db.game;
const Country = db.country;
const Franchise = db.franchise;
const Helper = require("../utils/helper");
const helper = new Helper();

const clubAdd = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "club_add")
  //     .then((rolePerm) => {
  if (!req.body.name) {
    res.status(400).send({
      msg: "Please pass club name.",
    });
  } else {
    if (req.file == undefined) {
      Club.create({
        name: req.body.name,
        game_id: req.body.game_id,
        country_id: req.body.country_id,
        franchise_id: req.body.franchise_id,
        logo: "",
      })
        .then((club) => res.status(201).send(club))
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    } else {
      Club.create({
        name: req.body.name,
        game_id: req.body.game_id,
        country_id: req.body.country_id,
        franchise_id: req.body.franchise_id,
        logo: req.file.path,
      })
        .then((club) => res.status(201).send(club))
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    }
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const clubGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "club_get_all")
  //     .then((rolePerm) => {
  Club.findAll({
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
    .then((clubs) => res.status(200).send(clubs))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const clubGet = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "club_get")
  //     .then((rolePerm) => {
  Club.findByPk(req.params.id)
    .then((club) => res.status(200).send(club))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const clubUpdate = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "club_update")
  //     .then((rolePerm) => {
  if (!req.params.id || !req.body.name) {
    res.status(400).send({
      msg: "Please pass club ID, name",
    });
  } else {
    if (req.file == undefined) {
      Club.findByPk(req.params.id)
        .then((club) => {
          Club.update(
            {
              name: req.body.name || club.name,
              game_id: req.body.game_id || club.game_id,
              country_id: req.body.country_id || club.country_id,
              franchise_id: req.body.franchise_id || club.franchise_id,
            },
            {
              where: {
                id: req.params.id,
              },
            }
          )
            .then((_) => {
              res.status(200).send({
                msg: "Club updated",
              });
            })
            .catch((err) => res.status(400).send(err));
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    } else {
      Club.findByPk(req.params.id)
        .then((club) => {
          Club.update(
            {
              name: req.body.name || club.name,
              game_id: req.body.game_id || club.game_id,
              country_id: req.body.country_id || club.country_id,
              franchise_id: req.body.franchise_id || club.franchise_id,
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
                msg: "Club updated",
              });
            })
            .catch((err) => res.status(400).send(err));
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const clubDelete = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "club_delete")
  //     .then((rolePerm) => {
  if (!req.params.id) {
    res.status(400).send({
      msg: "Please pass club ID.",
    });
  } else {
    Club.findByPk(req.params.id)
      .then((club) => {
        if (club) {
          club
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then((_) => {
              res.status(200).send({
                msg: "Club deleted",
              });
            })
            .catch((err) => res.status(400).send(err));
        } else {
          res.status(404).send({
            msg: "Club not found",
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, "Club_" + Date.now() + path.extname(file.originalname));
  },
});

const uploadClubLogo = multer({
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
  clubAdd,
  clubGetAll,
  clubGet,
  clubUpdate,
  clubDelete,
  uploadClubLogo,
};
