const express = require("express");
var nodeMailer = require("nodemailer");
const router = express.Router();
const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");

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

        console.log(" PPpppppppppppppppp", new_password);

        let transporter = nodeMailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "mohsincse2015@gmail.com",
            pass: "ffjavfbgeeqoxnoy",
          },
        });
        let mailOptions = {
          from: '"PLAY11" <test@gmail.com>',
          to: req.body.email,
          subject: "Reset Password",
          text: "Your password is: " + new_password,
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

  /*
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mohsincse2015@gmail.com",
      pass: "ffjavfbgeeqoxnoy",
    },
  });
  let mailOptions = {
    from: '"Mohsin Iqbal" <test@gmail.com>',
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.body,
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

*/
});

module.exports = router;
