const db = require("../models");
const User = db.user;

const userDuplicateCheckUpdate = (req, res, next) => {
  console.log("User yyyyyyyyyyyyyyy-------", req.body);
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      if (user.id != req.params.id) {
        res.status(400).send({
          msg: "Failed! Email name is already exist!",
        });
        return;
      }
    }

    next();
  });
};

module.exports = {
  userDuplicateCheckUpdate,
};
