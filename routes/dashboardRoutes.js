const express = require("express");
const router = express.Router();
const db = require("../models");
const Tournament = db.tournament;
const User = db.user;
const Team = db.team;
const { sequelize } = require("../models");

router.get("/user-count2", (req, res) => {
  Tournament.findAll({
    order: [["id", "DESC"]],
  })
    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/user-count", async (req, res) => {
  const userCount = await User.count({ where: { role_id: 8 } });
  res.json({ user_count: userCount });
});

router.get("/tournament-count", async (req, res) => {
  const tournamentCount = await Tournament.count({});
  res.json({ tournament_count: tournamentCount });
});

router.get("/tournament-wise-user-count", (req, res) => {
  Team.findAll({
    attributes: ["tournament_id", [sequelize.fn("COUNT", "id"), "user_count"]],
    group: "tournament_id",
    include: [
      {
        model: Tournament,
      },
    ],
  })
    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
