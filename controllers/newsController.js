const multer = require("multer");
const path = require("path");
const db = require("../models");
const News = db.news;
const Tournament = db.tournament;
const Helper = require("../utils/helper");
const helper = new Helper();

const newsAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "news_add")
    .then((rolePerm) => {
      if (!req.body.tournament_id || !req.body.title || !req.body.body) {
        res.status(400).send({
          msg: "Please pass tournament, news title, body",
        });
      } else {
        if (req.file == undefined) {
          News.create({
            tournament_id: req.body.tournament_id,
            title: req.body.title,
            body: req.body.body,
            image: "",
          })
            .then((news) => res.status(201).send(news))
            .catch((err) => {
              console.log(err);
              res.status(400).send(err);
            });
        } else {
          News.create({
            tournament_id: req.body.tournament_id,
            title: req.body.title,
            body: req.body.body,
            image: req.file.path,
          })
            .then((news) => res.status(201).send(news))
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

const newsGetAll = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "news_view")
    .then((rolePerm) => {
      News.findAll({
        include: [
          {
            model: Tournament,
          },
        ],
      })
        .then((newsS) => res.status(200).send(newsS))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const newsGet = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "id")
    .then((rolePerm) => {
      News.findByPk(req.body.id)
        .then((news) => {
          return res.status(200).send(news);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const newsUpdate = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "news_add")
    .then((rolePerm) => {
      if (
        !req.params.id ||
        !req.body.tournament_id ||
        !req.body.title ||
        !req.body.body
      ) {
        res.status(400).send({
          msg: "Please pass news ID, title, body, tournament",
        });
      } else {
        if (req.file == undefined) {
          News.findByPk(req.params.id)
            .then((news) => {
              News.update(
                {
                  tournament_id: req.body.tournament_id || news.tournament_id,
                  title: req.body.title || news.title,
                  body: req.body.body || news.body,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then((_) => {
                  res.status(200).send({
                    msg: "News updated",
                  });
                })
                .catch((err) => res.status(400).send(err));
            })
            .catch((error) => {
              res.status(400).send(error);
            });
        } else {
          News.findByPk(req.params.id)
            .then((news) => {
              News.update(
                {
                  tournament_id: req.body.tournament_id || news.tournament_id,
                  title: req.body.title || news.title,
                  body: req.body.body || news.body,
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
                    msg: "News updated",
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

const newsDelete = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "news_delete")
    .then((rolePerm) => {
      if (!req.params.id) {
        res.status(400).send({
          msg: "Please pass news ID.",
        });
      } else {
        News.findByPk(req.params.id)
          .then((news) => {
            if (news) {
              news
                .destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                .then((_) => {
                  res.status(200).send({
                    msg: "News deleted",
                  });
                })
                .catch((err) => res.status(400).send(err));
            } else {
              res.status(404).send({
                msg: "News not found",
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
    cb(null, "News_" + Date.now() + path.extname(file.originalname));
  },
});

const uploadNewsImage = multer({
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
  newsAdd,
  newsGetAll,
  newsGet,
  newsUpdate,
  newsDelete,
  uploadNewsImage,
};
