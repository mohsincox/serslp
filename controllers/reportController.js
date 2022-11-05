const db = require("../models");
const TeamDetail = db.teamDetail;
const User = db.user;
const Tournament = db.tournament;
const Helper = require("../utils/helper");
const helper = new Helper();
const { sequelize } = require("../models");

const tournamentReport = (req, res) => {
  Tournament.findAll({})
    .then((tournaments) => res.status(200).send(tournaments))
    .catch((err) => {
      res.status(400).send(err);
    });
};

const tournamentRankingReport = (req, res) => {
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
};

module.exports = {
  tournamentReport,
  tournamentRankingReport,
};
