const multer = require("multer");
const path = require("path");
const db = require("../models");
const Ads = db.ads;
const Helper = require("../utils/helper");
const helper = new Helper();

const adsAdd = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "ads_add")
  //   .then((rolePerm) => {
  if (!req.body.name || !req.body.status) {
    res.status(400).send({
      msg: "Ads name and status is required",
    });
  } else {
    Ads.create({
      name: req.body.name,
      status: req.body.status,
      img_src: req.file.path,
      widget_id: req.body.widget_id,
      link: req.body.link,
      page_name: req.body.page_name,
      position: req.body.position,
      min_age: req.body.min_age,
      max_age: req.body.max_age,
      gender: req.body.gender,
    })
      .then((ads) => res.status(201).send(ads))
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const adsGetAll = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "ads_get_all")
  //   .then((rolePerm) => {
  Ads.findAll()
    .then((adss) => res.status(200).send(adss))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const adsGet = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "ads_get")
  //   .then((rolePerm) => {
  Ads.findByPk(req.params.id)
    .then((ads) => {
      res.status(200).send(ads);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const adsUpdate = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "ads_update")
  //   .then((rolePerm) => {
  if (!req.params.id || !req.body.name) {
    res.status(400).send({
      msg: "Please pass ads ID, name, status",
    });
  } else {
    Ads.findByPk(req.params.id)
      .then((ads) => {
        let imgSrc = ads.img_src;
        if (req.file) {
          imgSrc = req.file.path;
        }
        Ads.update(
          {
            name: req.body.name || ads.name,
            status: req.body.status || ads.status,
            img_src: imgSrc,
            widget_id: req.body.widget_id || ads.widget_id,
            link: req.body.link || ads.link,
            page_name: req.body.page_name || ads.page_name,
            position: req.body.position || ads.position,
            min_age: req.body.min_age || ads.min_age,
            max_age: req.body.max_age || ads.max_age,
            gender: req.body.gender || ads.gender,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then((_) => {
            res.status(200).send({
              msg: "Ads updated",
            });
          })
          .catch((err) => res.status(400).send(err));
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const adsDelete = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "ads_delete")
  //   .then((rolePerm) => {
  if (!req.params.id) {
    res.status(400).send({
      msg: "Please pass ads ID.",
    });
  } else {
    Ads.findByPk(req.params.id)
      .then((ads) => {
        if (ads) {
          ads
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then((_) => {
              res.status(200).send({
                msg: "Ads deleted",
              });
            })
            .catch((err) => res.status(400).send(err));
        } else {
          res.status(404).send({
            msg: "Ads not found",
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
    cb(null, "Ads_" + Date.now() + path.extname(file.originalname));
  },
});

const uploadAdsImage = multer({
  storage: storage,
  limits: { fileSize: "5000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files format to upload");
  },
}).single("img_src");

module.exports = {
  adsAdd,
  adsGetAll,
  adsGet,
  adsUpdate,
  adsDelete,
  uploadAdsImage,
};
