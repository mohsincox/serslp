const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;
const RolePermission = db.rolePermission;
const passport = require("passport");
require("../config/passport")(passport);
const Helper = require("../utils/helper");
const helper = new Helper();

const userAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "user_add")
    .then((rolePerm) => {
      if (
        !req.body.role_id ||
        !req.body.email ||
        !req.body.password ||
        !req.body.name
      ) {
        res.status(400).send({
          msg: "Please pass Role ID, email, password, name.",
        });
      } else {
        User.create({
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          name: req.body.name,
          role_id: req.body.role_id,
        })
          .then((user) => res.status(201).send(user))
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      }
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const userGetAll = (req, res) => {
  console.log("firstFFFF:", req.user);
  helper
    .checkPermission(req.user.role_id, "user_get_all")
    .then((rolePerm) => {
      console.log("Hello World");
      User.findAll({
        include: [
          {
            model: Role,
            include: [
              {
                model: RolePermission,
              },
            ],
          },
        ],
      })
        .then((users) => res.status(200).send(users))
        // .then((users) => res.status(200).send(users[0].role.role_permissions))
        .catch((error) => {
          res.status(400).send(error);
        });
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const userGet = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "user_get")
    .then((rolePerm) => {
      User.findByPk(req.params.id)
        .then((user) => res.status(200).send(user))
        .catch((error) => {
          res.status(400).send(error);
        });
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const userUpdate = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "user_update")
    .then((rolePerm) => {
      if (!req.body.role_id || !req.body.email || !req.body.name) {
        res.status(400).send({
          msg: "Please pass Role ID, email, password, phone or fullname.",
        });
      } else {
        User.findByPk(req.params.id)
          .then((user) => {
            User.update(
              {
                email: req.body.email || user.email,
                name: req.body.name || user.name,
                role_id: req.body.role_id || user.role_id,
              },
              {
                where: {
                  id: req.params.id,
                },
              }
            )
              .then((_) => {
                res.status(200).send({
                  message: "User updated",
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

const userDelete = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "user_delete")
    .then((rolePerm) => {
      if (!req.params.id) {
        res.status(400).send({
          msg: "Please pass user ID.",
        });
      } else {
        User.findByPk(req.params.id)
          .then((user) => {
            if (user) {
              User.destroy({
                where: {
                  id: req.params.id,
                },
              })
                .then((_) => {
                  res.status(200).send({
                    message: "User deleted",
                  });
                })
                .catch((err) => res.status(400).send(err));
            } else {
              res.status(404).send({
                message: "User not found",
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
  userAdd,
  userGetAll,
  userGet,
  userUpdate,
  userDelete,
};
