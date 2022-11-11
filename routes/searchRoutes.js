const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const db = require("../models");
const User = db.user;
const Player = db.player;
const Country = db.country;

router.get("/user-search", (req, res) => {
  User.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${req.query.searchQuery}%` } },
        { email: { [Op.like]: `%${req.query.searchQuery}%` } },
        { phone_number: { [Op.like]: `%${req.query.searchQuery}%` } },
      ],
    },
  })
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/player-search", (req, res) => {
  Player.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${req.query.searchQuery}%` } },
        { country_id: req.query.country_id },
      ],
    },
    include: [
      {
        model: Country,
      },
    ],
  })
    .then((players) => res.status(200).send(players))
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
