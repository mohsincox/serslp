const db = require("../models");
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        msg: "Failed! Email is already in use!",
      });
      return;
    }

    next();
  });
};

module.exports = {
  checkDuplicateEmail,
};
