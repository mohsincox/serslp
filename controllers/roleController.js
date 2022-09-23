const db = require("../models");
const Role = db.role;
const User = db.user;
const RolePermission = db.rolePermission;
const Helper = require("../utils/helper");
const helper = new Helper();

const roleAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "role_add")
    .then((rolePerm) => {
      if (!req.body.role_name || !req.body.role_description) {
        res.status(400).send({
          msg: "Please pass Role name and description.",
        });
      } else {
        Role.create({
          role_name: req.body.role_name,
          role_description: req.body.role_description,
        })
          .then((role) => res.status(201).send(role))
          .catch((error) => {
            res.status(400).send({
              success: false,
              msg: error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(403).send({
        success: false,
        msg: error,
      });
    });
};

const rolePermissionsAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "role_add")
    .then((rolePerm) => {
      if (!req.body.permissions) {
        res.status(400).send({
          msg: "Please pass permissions.",
        });
      } else {
        Role.findByPk(req.params.id)
          .then((role) => {
            RolePermission.destroy({
              where: {
                role_id: role.id,
              },
            })
              .then((_) => {
                console.log("req.body", req.body);
                console.log("req.body.permissions", req.body.permissions);

                JSON.parse(req.body.permissions).forEach(function (
                  item,
                  index
                ) {
                  RolePermission.create({
                    role_id: req.params.id,
                    perm_id: item,
                  }).catch((error) => {
                    res.status(400).send({
                      success: false,
                      msg: error,
                    });
                  });
                });
                res.status(200).send({
                  message: "Permissions added",
                });
              })
              .catch((err) =>
                res.status(400).send({
                  hello: "111",
                  success: false,
                  msg: err,
                })
              );
          })
          .catch((error) => {
            res.status(400).send({
              hello: "222",
              success: false,
              msg: error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(403).send({
        success: false,
        msg: error,
      });
    });
};

const roleGetAll = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "role_get_all")
    .then((rolePerm) => {
      console.log(rolePerm);
      Role.findAll({
        include: [
          {
            model: RolePermission,
          },
          {
            model: User,
          },
        ],
      })
        .then((roles) => res.status(200).send(roles))
        .catch((error) => {
          res.status(400).send({
            success: false,
            msg: error,
          });
        });
    })
    .catch((error) => {
      res.status(403).send({
        success: false,
        msg: error,
      });
    });
};

const roleGet = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "role_get")
    .then((rolePerm) => {})
    .catch((error) => {
      res.status(403).send(error);
    });
  Role.findByPk(req.params.id, {
    include: [
      {
        model: RolePermission,
      },
      {
        model: User,
      },
    ],
  })
    .then((roles) => res.status(200).send(roles))
    .catch((error) => {
      res.status(400).send({
        success: false,
        msg: error,
      });
    });
};

const roleUpdate = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "role_update")
    .then((rolePerm) => {
      if (!req.params.id || !req.body.role_name || !req.body.role_description) {
        res.status(400).send({
          msg: "Please pass Role ID, name or description.",
        });
      } else {
        Role.findByPk(req.params.id)
          .then((role) => {
            Role.update(
              {
                role_name: req.body.role_name || role.role_name,
                role_description:
                  req.body.role_description || role.role_description,
              },
              {
                where: {
                  id: req.params.id,
                },
              }
            )
              .then((_) => {
                res.status(200).send({
                  message: "Role updated",
                });
              })
              .catch((err) =>
                res.status(400).send({
                  hello: "111",
                  success: false,
                  msg: err,
                })
              );
          })
          .catch((error) => {
            res.status(400).send({
              hello: "222",
              success: false,
              msg: error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(403).send({
        hello: "333",
        success: false,
        msg: error,
      });
    });
};

const roleDelete = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "role_delete")
    .then((rolePerm) => {
      if (!req.params.id) {
        res.status(400).send({
          msg: "Please pass role ID.",
        });
      } else {
        Role.findByPk(req.params.id)
          .then((role) => {
            if (role) {
              Role.destroy({
                where: {
                  id: req.params.id,
                },
              })
                .then((_) => {
                  res.status(200).send({
                    message: "Role deleted",
                  });
                })
                .catch((err) => res.status(400).send(err));
            } else {
              res.status(404).send({
                message: "Role not found",
              });
            }
          })
          .catch((error) => {
            res.status(400).send({
              success: false,
              msg: error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(403).send({
        success: false,
        msg: error,
      });
    });
};

module.exports = {
  roleAdd,
  rolePermissionsAdd,
  roleGetAll,
  roleGet,
  roleUpdate,
  roleDelete,
};
