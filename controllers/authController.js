const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../config/passport")(passport);
const db = require("../models");
const User = db.user;
const Role = db.role;
const RolePermission = db.rolePermission;
const authConfig = require("../config/authConfig");

const registerUser = (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send({
      msg: "Please pass username, password and name.",
    });
  } else {
    Role.findOne({
      where: {
        role_name: "customer",
      },
    })
      .then((role) => {
        console.log(role.id);
        User.create({
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          name: req.body.name,
          role_id: role.id,
          phone_number: req.body.phone_number,
          gender: req.body.gender,
          age: req.body.age,
        })
          .then((user) => {
            var token = jwt.sign(
              JSON.parse(JSON.stringify(user)),
              authConfig.secret,
              {
                expiresIn: 86400 * 30,
              }
            );
            jwt.verify(token, authConfig.secret, function (err, data) {
              console.log(err, data);
            });
            res.json({
              success: true,
              id: user.id,
              name: user.name,
              email: user.email,
              accessToken: "JWT " + token,
              userrole: user,
            });
          })
          // .then((user) => res.status(201).send(user))

          .catch((error) => {
            res.status(400).send(error);
          });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
};

const loginUser = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
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
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          message: "Authentication failed. User not found.",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign(
        JSON.parse(JSON.stringify(user)),
        authConfig.secret,
        {
          expiresIn: 86400 * 30,
        }
      );
      jwt.verify(token, authConfig.secret, function (err, data) {
        console.log(err, data);
      });
      res.json({
        success: true,
        // token: "JWT " + token,
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: "JWT " + token,
        userrole: user,
      });
    })
    .catch((error) => res.status(400).send(error));
};

module.exports = {
  registerUser,
  loginUser,
};
