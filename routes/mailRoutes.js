const express = require("express");
const router = express.Router();
var nodeMailer = require("nodemailer");
const db = require("../models");
const Tournament = db.tournament;

router.get("/", (req, res) => {
  Tournament.findAll({})
    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/send-email", function (req, res) {
  let transporter = nodeMailer.createTransport({
    // host: "smtp.gmail.com",
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
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    res.status(200).send({
      msg: "Mail sent successfully.",
    });
  });
});

module.exports = router;
