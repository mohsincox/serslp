const multer = require("multer");
const path = require("path");
const db = require("../models");
const Slider = db.slider;
const Helper = require("../utils/helper");
const helper = new Helper();

const sliderAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "slider_add")
    .then((rolePerm) => {
      if (!req.body.name) {
        res.status(400).send({
          msg: "Please pass slider name.",
        });
      } else {
        if (req.file == undefined) {
          Slider.create({
            name: req.body.name,
            position: req.body.position,
            image: "",
          })
            .then((slider) => res.status(201).send(slider))
            .catch((err) => {
              console.log(err);
              res.status(400).send(err);
            });
        } else {
          Slider.create({
            name: req.body.name,
            position: req.body.position,
            image: req.file.path,
          })
            .then((slider) => res.status(201).send(slider))
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

const sliderGetAll = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "slider_get_all")
    .then((rolePerm) => {
      Slider.findAll({})
        .then((sliders) => res.status(200).send(sliders))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const sliderGet = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "slider_get")
    .then((rolePerm) => {
      Slider.findByPk(req.params.id)
        .then((slider) => res.status(200).send(slider))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const sliderUpdate = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "slider_update")
    .then((rolePerm) => {
      if (!req.params.id || !req.body.name) {
        res.status(400).send({
          msg: "Please pass slider ID, name",
        });
      } else {
        if (req.file == undefined) {
          Slider.findByPk(req.params.id)
            .then((slider) => {
              Slider.update(
                {
                  name: req.body.name || slider.name,
                  position: req.body.position || slider.position,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then((_) => {
                  res.status(200).send({
                    msg: "Slider updated",
                  });
                })
                .catch((err) => res.status(400).send(err));
            })
            .catch((error) => {
              res.status(400).send(error);
            });
        } else {
          Slider.findByPk(req.params.id)
            .then((slider) => {
              Slider.update(
                {
                  name: req.body.name || slider.name,
                  position: req.body.position || slider.position,
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
                    msg: "Slider updated",
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

const sliderDelete = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "slider_delete")
    .then((rolePerm) => {
      if (!req.params.id) {
        res.status(400).send({
          msg: "Please pass slider ID.",
        });
      } else {
        Slider.findByPk(req.params.id)
          .then((slider) => {
            if (slider) {
              slider
                .destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                .then((_) => {
                  res.status(200).send({
                    msg: "Slider deleted",
                  });
                })
                .catch((err) => res.status(400).send(err));
            } else {
              res.status(404).send({
                msg: "Slider not found",
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
    cb(null, "Slider_" + Date.now() + path.extname(file.originalname));
  },
});

const uploadSliderImage = multer({
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
    // cb(
    //   new Error(
    //     "Invalid file type. Only jpg, png and gif image files are allowed."
    //   )
    // );
  },
}).single("image");

module.exports = {
  sliderAdd,
  sliderGetAll,
  sliderGet,
  sliderUpdate,
  sliderDelete,
  uploadSliderImage,
};
