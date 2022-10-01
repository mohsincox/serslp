const multer = require("multer");
const path = require("path");
const db = require("../models");
const Franchise = db.franchise;
const Country = db.country;
const Helper = require("../utils/helper");
const helper = new Helper();

const franchiseAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "franchise_add")
    .then((rolePerm) => {
      if (!req.body.name) {
        res.status(400).send({
          msg: "Please pass franchise name.",
        });
      } else {
        if (req.file == undefined) {
          Franchise.create({
            name: req.body.name,
            country_id: req.body.country_id,
            logo: "",
          })
            .then((franchise) => res.status(201).send(franchise))
            .catch((err) => {
              console.log(err);
              res.status(400).send(err);
            });
        } else {
          Franchise.create({
            name: req.body.name,
            country_id: req.body.country_id,
            logo: req.file.path,
          })
            .then((franchise) => res.status(201).send(franchise))
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

const franchiseGetAll = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "franchise_get_all")
    .then((rolePerm) => {
      Franchise.findAll({
        include: [
          {
            model: Country,
          },
        ],
      })
        .then((franchises) => res.status(200).send(franchises))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const franchiseGet = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "franchise_get")
    .then((rolePerm) => {
      Franchise.findByPk(req.params.id)
        .then((franchise) => res.status(200).send(franchise))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const franchiseUpdate = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "franchise_update")
    .then((rolePerm) => {
      if (!req.params.id || !req.body.name) {
        res.status(400).send({
          msg: "Please pass franchise ID, name",
        });
      } else {
        if (req.file == undefined) {
          Franchise.findByPk(req.params.id)
            .then((franchise) => {
              Franchise.update(
                {
                  name: req.body.name || franchise.name,
                  country_id: req.body.country_id || franchise.country_id,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then((_) => {
                  res.status(200).send({
                    msg: "Franchise updated",
                  });
                })
                .catch((err) => res.status(400).send(err));
            })
            .catch((error) => {
              res.status(400).send(error);
            });
        } else {
          Franchise.findByPk(req.params.id)
            .then((franchise) => {
              Franchise.update(
                {
                  name: req.body.name || franchise.name,
                  country_id: req.body.country_id || franchise.country_id,
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
                    msg: "Franchise updated",
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

const franchiseDelete = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "franchise_delete")
    .then((rolePerm) => {
      if (!req.params.id) {
        res.status(400).send({
          msg: "Please pass franchise ID.",
        });
      } else {
        Franchise.findByPk(req.params.id)
          .then((franchise) => {
            if (franchise) {
              franchise
                .destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                .then((_) => {
                  res.status(200).send({
                    msg: "Franchise deleted",
                  });
                })
                .catch((err) => res.status(400).send(err));
            } else {
              res.status(404).send({
                msg: "Franchise not found",
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
    cb(null, "Franchise_" + Date.now() + path.extname(file.originalname));
  },
});

const uploadFranchiseLogo = multer({
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
  franchiseAdd,
  franchiseGetAll,
  franchiseGet,
  franchiseUpdate,
  franchiseDelete,
  uploadFranchiseLogo,
};
