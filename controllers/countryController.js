const multer = require("multer");
const path = require("path");
const db = require("../models");
const Country = db.country;
// const Helper = require("../utils/helper");
// const helper = new Helper();

const countryAdd = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_add")
  //     .then((rolePerm) => {

  if (!req.body.name) {
    res.status(400).send({
      msg: "Please pass country name.",
    });
  } else {
    if (req.file == undefined) {
      Country.create({
        name: req.body.name,
        short_name: req.body.short_name,
        flag: "",
      })
        .then((country) => res.status(201).send(country))
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    } else {
      Country.create({
        name: req.body.name,
        short_name: req.body.short_name,
        flag: req.file.path,
      })
        .then((country) => res.status(201).send(country))
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    }
    // console.log("first ---------------------", req.file);
    // return;
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const countryGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_get_all")
  //     .then((rolePerm) => {
  Country.findAll()
    .then((countries) => res.status(200).send(countries))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const countryGet = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_get")
  //     .then((rolePerm) => {
  Country.findByPk(req.params.id)
    .then((country) => res.status(200).send(country))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const countryUpdate = (req, res) => {
  console.log("firstyyyyyyyyyyyyyyy22-------", req.body);
  //   helper
  //     .checkPermission(req.user.role_id, "permission_update")
  //     .then((rolePerm) => {
  if (!req.params.id || !req.body.name) {
    res.status(400).send({
      msg: "Please pass country ID, name",
    });
  } else {
    if (req.file == undefined) {
      Country.findByPk(req.params.id)
        .then((country) => {
          Country.update(
            {
              name: req.body.name || country.name,
              short_name: req.body.short_name || country.short_name,
            },
            {
              where: {
                id: req.params.id,
              },
            }
          )
            .then((_) => {
              res.status(200).send({
                msg: "Country updated",
              });
            })
            .catch((err) => res.status(400).send(err));
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    } else {
      Country.findByPk(req.params.id)
        .then((country) => {
          Country.update(
            {
              name: req.body.name || country.name,
              short_name: req.body.short_name || country.short_name,
              flag: req.file.path,
            },
            {
              where: {
                id: req.params.id,
              },
            }
          )
            .then((_) => {
              res.status(200).send({
                msg: "Country updated",
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

const countryDelete = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_delete")
  //     .then((rolePerm) => {
  if (!req.params.id) {
    res.status(400).send({
      msg: "Please pass country ID.",
    });
  } else {
    Country.findByPk(req.params.id)
      .then((country) => {
        if (country) {
          country
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then((_) => {
              res.status(200).send({
                msg: "Country deleted",
              });
            })
            .catch((err) => res.status(400).send(err));
        } else {
          res.status(404).send({
            msg: "Country not found",
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
    cb(null, "Country_" + Date.now() + path.extname(file.originalname));
  },
});

const uploadFlag = multer({
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
}).single("selectedFile");

module.exports = {
  countryAdd,
  countryGetAll,
  countryGet,
  countryUpdate,
  countryDelete,
  uploadFlag,
};
