const db = require("../models");
const Permission = db.permission;

const checkDuplicatePermName = (req, res, next) => {
  if (!req.body.perm_name) {
    res.status(400).send({
      message: "Please pass permission name I middlew",
    });
    return;
  }

  Permission.findOne({
    where: {
      perm_name: req.body.perm_name,
    },
  }).then((permission) => {
    if (permission) {
      res.status(400).send({
        message: "Failed! Permission name is already exist!",
      });
      return;
    }

    next();
  });
};

const checkDuplicatePermNameUpdate = (req, res, next) => {
  Permission.findOne({
    where: {
      perm_name: req.body.perm_name,
    },
  }).then((permission) => {
    if (permission) {
      if (permission.id != req.params.id) {
        res.status(400).send({
          message: "Failed! Permission name is already exist!",
        });
        return;
      }
    }

    next();
  });
};

module.exports = {
  checkDuplicatePermName,
  checkDuplicatePermNameUpdate,
};
