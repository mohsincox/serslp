const express = require("express");
var nodeMailer = require("nodemailer");
const router = express.Router();
const db = require("../models");
const User = db.user;

router.post("/", function (req, res) {
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
});

module.exports = router;
