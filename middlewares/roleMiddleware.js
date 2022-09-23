const db = require("../models");
const Role = db.role;

const checkDuplicateRoleName = (req, res, next) => {
  Role.findOne({
    where: {
      role_name: req.body.role_name,
    },
  }).then((role) => {
    if (role) {
      res.status(400).send({
        message: "Failed! Role name is already exist!",
      });
      return;
    }

    next();
  });
};

const checkDuplicateRoleNameUpdate = (req, res, next) => {
  console.log("req.params.id", req.params.id);
  Role.findOne({
    where: {
      role_name: req.body.role_name,
    },
  }).then((role) => {
    console.log("first Role", role);
    if (role) {
      if (role.id != req.params.id) {
        res.status(400).send({
          message: "Failed! Role name is already exist!",
        });
        return;
      }
    }

    next();
  });
};

module.exports = {
  checkDuplicateRoleName,
  checkDuplicateRoleNameUpdate,
};
