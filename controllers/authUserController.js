const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Helper = require("../utils/helper");
const helper = new Helper();

const changePassword = (req, res) => {
  // helper
  //   .checkPermission(req.user.role_id, "change_password")
  //   .then((rolePerm) => {
  if (!req.body.email || !req.body.old_password || !req.body.new_password) {
    res.status(400).send({
      msg: "Please pass email, old password, new password",
    });
  } else {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            msg: "User not found.",
          });
        }

        const passwordIsValid = bcrypt.compareSync(
          req.body.old_password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            msg: "Old password does not match",
          });
        }

        User.update(
          {
            password: bcrypt.hashSync(req.body.new_password, 8),
          },
          {
            where: {
              email: req.body.email,
            },
          }
        )
          .then((_) => {
            res.status(200).send({
              msg: "Password updated successfully",
            });
          })
          .catch((err) => res.status(400).send(err));
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
  //   })
  //   .catch((error) => {
  //     res.status(403).send(error);
  //   });
};

module.exports = {
  changePassword,
};
