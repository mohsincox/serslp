const express = require("express");
var nodeMailer = require("nodemailer");
const router = express.Router();
const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
//test

router.post("/", function (req, res) {
  if (!req.body.email) {
    res.status(400).send({
      msg: "Please pass email",
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
            msg: "Email is not exist.",
          });
        }
        // console.log("first", user);

        var new_password = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        console.log(new_password);

        let transporter = nodeMailer.createTransport({
          host: "mail.shoplover.com",
          port: 465,
          secure: true,
          auth: {
            user: "play11@shoplover.com",
            pass: "9HLMN2Ma",
          },
        });
        let mailOptions = {
          from: '"PLAY11" <play11@shoplover.com>',
          to: req.body.email,
          subject: "Reset Password",
          text:
            "Your New Password is: " +
            new_password +
            " Please Change Your Password.",
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message %s sent: %s", info.messageId, info.response);
          // res.render("index");
          res.status(200).send({
            msg: "Mail sent successfully.",
          });
        });

        User.update(
          {
            password: bcrypt.hashSync(new_password, 8),
          },
          {
            where: {
              email: req.body.email,
            },
          }
        )
          .then((_) => {
            res.status(200).send({
              msg: "Mail sent successfully and password changed.",
            });
          })
          .catch((err) => res.status(400).send(err));
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
});

module.exports = router;
