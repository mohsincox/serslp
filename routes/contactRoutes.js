const express = require("express");
const router = express.Router();
const db = require("../models");
const Contact = db.contact;
//test

router.post("/", (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      msg: "Please pass name.",
    });
  } else {
    Contact.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    })
      .then((contact) => res.status(201).send(contact))
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }
});

router.get("/", (req, res) => {
  Contact.findAll({})
    .then((contacts) => res.status(200).send(contacts))
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/:id/detail", (req, res) => {
  Contact.findByPk(req.params.id)
    .then((contact) => res.status(200).send(contact))
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
