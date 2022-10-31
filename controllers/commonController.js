const db = require("../models");
const Country = db.country;
const Tournament = db.tournament;

const countryGetAllCommon = (req, res) => {
  Country.findAll()
    .then((games) => res.status(200).send(games))
    .catch((err) => {
      res.status(400).send(err);
    });
};

const countryGetCommon = (req, res) => {
  Country.findByPk(req.params.id)
    .then((game) => res.status(200).send(game))
    .catch((err) => {
      res.status(400).send(err);
    });
};

const tournamentGetCommon = (req, res) => {
  Tournament.findByPk(req.params.id)
    .then((tournament) => res.status(200).send(tournament))
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  countryGetAllCommon,
  countryGetCommon,
  tournamentGetCommon,
};
