const db = require("../models");
const Page = db.page;
const Helper = require("../utils/helper");
const helper = new Helper();

const pageAdd = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "page_add")
  //   .then((rolePerm) => {
  if (!req.body.name) {
    res.status(400).send({
      msg: "Page name and status is required",
    });
  } else {
    Page.create({
      name: req.body.name,
      slug: req.body.slug,
      content: req.body.content,
    })
      .then((page) => res.status(201).send(page))
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

const pageGetAll = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "page_get_all")
  //   .then((rolePerm) => {
  Page.findAll()
    .then((pages) => res.status(200).send(pages))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const pageGet = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "page_get")
  //   .then((rolePerm) => {
  if (parseInt(req.params.id)) {
    Page.findByPk(req.params.id)
      .then((page) => {
        if (page) return res.status(200).send(page);
        else return res.status(404).end();
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    Page.findOne({
      where: { slug: req.params.id },
    })
      .then((page) => {
        if (page) return res.status(200).send(page);
        else return res.status(404).end();
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const pageUpdate = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "page_update")
  //   .then((rolePerm) => {
  if (!req.params.id || !req.body.name) {
    res.status(400).send({
      msg: "Please pass page ID, name, status",
    });
  } else {
    Page.findByPk(req.params.id)
      .then((page) => {
        Page.update(
          {
            name: req.body.name || page.name,
            slug: req.body.slug || page.slug,
            content: req.body.content || page.content,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then((_) => {
            res.status(200).send({
              msg: "Page updated",
            });
          })
          .catch((err) => res.status(400).send(err));
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

const pageDelete = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "page_delete")
  //   .then((rolePerm) => {
  if (!req.params.id) {
    res.status(400).send({
      msg: "Please pass page ID.",
    });
  } else {
    Page.findByPk(req.params.id)
      .then((page) => {
        if (page) {
          page
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then((_) => {
              res.status(200).send({
                msg: "Page deleted",
              });
            })
            .catch((err) => res.status(400).send(err));
        } else {
          res.status(404).send({
            msg: "Page not found",
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

module.exports = {
  pageAdd,
  pageGetAll,
  pageGet,
  pageUpdate,
  pageDelete,
};
