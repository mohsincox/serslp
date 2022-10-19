const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const db = require("../models");
const Tournament = db.tournament;
const TeamDetail = db.teamDetail;
const User = db.user;

router.get("/", (req, res) => {
  Tournament.findAll({})
    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
});

// router.get("/", (req, res) => {
//     Tournament.findAll({})
//       .then((tournaments) =>
//         // res.status(200).send(tournaments)
//         TeamDetail.findAll(
//           {
//             attributes: ["team_id", "tournament_id"],
//             group: "team_id",
//           },
//           { where: { tournament_id: 5 } }
//         )
//           .then((teamDetail) => res.status(200).send(teamDetail))
//           .catch((err) => {
//             res.status(400).send(err);
//           })
//       )
//       .catch((err) => {
//         res.status(400).send(err);
//       });
//   });

router.get("/test/:id", (req, res) => {
  TeamDetail.findAll({
    attributes: [
      "user_id",
      "team_id",
      "tournament_id",
      [sequelize.fn("sum", sequelize.col("total_point")), "total_point"],
    ],
    group: "team_id",
    where: { tournament_id: req.params.id },
    include: [
      {
        model: User,
      },
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
