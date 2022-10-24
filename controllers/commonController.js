const db = require("../models");
const Country = db.country;

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

module.exports = {
  countryGetAllCommon,
  countryGetCommon,
};
