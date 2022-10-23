const db = require("../models");
const Widget = db.widget;
const Helper = require("../utils/helper");
const helper = new Helper();

const widgetAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "widget_add")
    .then((rolePerm) => {
      if (!req.body.name || !req.body.status) {
        res.status(400).send({
          msg: "Widget name and status is required",
        });
      } else {
        Widget.create({
          name: req.body.name,
          status: req.body.status,
        })
          .then((widget) => res.status(201).send(widget))
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

const widgetGetAll = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "widget_get_all")
    .then((rolePerm) => {
      Widget.findAll()
        .then((widgets) => res.status(200).send(widgets))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const widgetGet = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "widget_get")
    .then((rolePerm) => {
      Widget.findByPk(req.params.id)
        .then((widget) => {
          res.status(200).send(widget);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const widgetUpdate = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "widget_update")
    .then((rolePerm) => {
      if (!req.params.id || !req.body.name) {
        res.status(400).send({
          msg: "Please pass widget ID, name, status",
        });
      } else {
        Widget.findByPk(req.params.id)
          .then((widget) => {
            Widget.update(
              {
                name: req.body.name || widget.name,
                status: req.body.status || widget.status,
              },
              {
                where: {
                  id: req.params.id,
                },
              }
            )
              .then((_) => {
                res.status(200).send({
                  msg: "Widget updated",
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

const widgetDelete = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "widget_delete")
    .then((rolePerm) => {
      if (!req.params.id) {
        res.status(400).send({
          msg: "Please pass widget ID.",
        });
      } else {
        Widget.findByPk(req.params.id)
          .then((widget) => {
            if (widget) {
              widget
                .destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                .then((_) => {
                  res.status(200).send({
                    msg: "Widget deleted",
                  });
                })
                .catch((err) => res.status(400).send(err));
            } else {
              res.status(404).send({
                msg: "Widget not found",
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
  widgetAdd,
  widgetGetAll,
  widgetGet,
  widgetUpdate,
  widgetDelete,
};
