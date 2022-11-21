const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const db = require("../models");
const Tournament = db.tournament;
const TeamDetail = db.teamDetail;
const User = db.user;
const Sequelize = require("sequelize");
const op = Sequelize.Op;

router.get("/fff", (req, res) => {
  let a = Tournament.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: TeamDetail,
        attributes: [
          "user_id",
          "team_id",
          "tournament_id",
          [sequelize.fn("sum", sequelize.col("total_point")), "total_point"],
        ],
        group: "team_id",
        // where: { tournament_id: id },
        order: sequelize.literal("total_point DESC"),
        // limit: 2,
        include: [
          {
            model: User,
          },
          {
            model: Tournament,
          },
        ],
      },
    ],
    group: ["id"],
  })
    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
});

// router.get("/", (req, res) => {
//   let arr = [];
//   Tournament.findAll({})
//     .then((tournaments) =>
//       // res.status(200).send(tournaments)

//       {
//         for (let i = 0; i < tournaments.length; i++) {
//           TeamDetail.findAll({
//             attributes: [
//               "user_id",
//               "team_id",
//               "tournament_id",
//               [
//                 sequelize.fn("sum", sequelize.col("total_point")),
//                 "total_point",
//               ],
//             ],
//             group: "team_id",
//             where: { tournament_id: tournaments[i].id },
//             order: sequelize.literal("total_point DESC"),
//             // limit: 2,
//             include: [
//               {
//                 model: User,
//               },
//               {
//                 model: Tournament,
//               },
//             ],
//           }).then((teamDetail) => {
//             //   res.status(200).send(teamDetail)

//             // console.log(teamDetail);

//             arr.push(teamDetail);

//             console.log("arr-----------------------", arr);

//             res.status(200).send(arr);
//           });
//           //   .catch((err) => {
//           //     res.status(400).send(err);
//           //   });
//         }

//         // res.status(200).send(arr);
//       }
//     )
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

router.get("/zzz", (req, res) => {
  let a = Tournament.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: TeamDetail,
        attributes: [
          "user_id",
          "team_id",
          "tournament_id",
          [sequelize.fn("sum", sequelize.col("total_point")), "total_point"],
        ],
        group: "team_id",
        where: { tournament_id: Tournament.id },
        // where: {
        //   tournament_id: { $col: "Tournament.id" },
        // },

        // where: {
        //   tournament_id: { [op.col]: "Tournament.id" },
        // },

        // where: { tournament_id: Tournament.sequelize.literal("id") },

        // group : ['ClientModel.id'],
        order: sequelize.literal("total_point DESC"),
        // limit: 2,
        include: [
          {
            model: User,
          },
          {
            model: Tournament,
          },
        ],
      },
    ],
    // group: ["id"],
  })
    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/dtr/:id", (req, res) => {
  TeamDetail.findAll({
    attributes: [
      "user_id",
      "team_id",
      "tournament_id",
      [sequelize.fn("sum", sequelize.col("total_point")), "total_point"],
    ],
    group: "team_id",
    where: { tournament_id: req.params.id },
    order: sequelize.literal("total_point DESC"),
    limit: 5,
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

router.get("/dtr-all/:id", (req, res) => {
  TeamDetail.findAll({
    attributes: [
      "user_id",
      "team_id",
      "tournament_id",
      [sequelize.fn("sum", sequelize.col("total_point")), "total_point"],
    ],
    group: "team_id",
    where: { tournament_id: req.params.id },
    order: sequelize.literal("total_point DESC"),
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
