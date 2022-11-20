const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const db = require("../models");
const Tournament = db.tournament;
const TeamDetail = db.teamDetail;
const User = db.user;
// const axios = require("axios");

router.get("/", (req, res) => {
  Tournament.findAll({
    order: [["id", "DESC"]],
  })
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
  })
    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
});

/*
router.get("/live", (req, res) => {
  // const options = {
  //   method: "GET",
  //   url: "https://api-football-v1.p.rapidapi.com/v3/timezone",
  //   headers: {
  //     "X-RapidAPI-Key": "f6be1d33ffmshd95468f201cd49dp1085cbjsn4f07188ff6a6",
  //     "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //   },
  // };

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: { live: "all" },
    headers: {
      "X-RapidAPI-Key": "f6be1d33ffmshd95468f201cd49dp1085cbjsn4f07188ff6a6",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    // .then(function (response) {
    //   console.log(response.data);
    // })
    .then((response) => res.status(200).send(response))
    .catch(function (error) {
      console.error(error);
    });
});
*/

module.exports = router;
