const express = require("express");
const router = express.Router();
const db = require("../models");
const News = db.news;
const Tournament = db.tournament;

router.get("/", (req, res) => {
  News.findAll({
    limit: 3,
    order: [["id", "DESC"]],
    include: [
      {
        model: Tournament,
      },
    ],
  })
    .then((newsS) => res.status(200).send(newsS))
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
