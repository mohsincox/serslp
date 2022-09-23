const db = require("../models");
const Country = db.country;

const countryDuplicateCheck = (req, res, next) => {
  console.log("firstuuuuuuuu --------------", req.body);
  if (!req.body.name) {
    res.status(400).send({
      msg: "Please pass country name I middlew",
    });
    return;
  }

  Country.findOne({
    where: {
      name: req.body.name,
    },
  }).then((country) => {
    if (country) {
      res.status(400).send({
        msg: "Failed! Country name is already exist!",
      });
      return;
    }

    next();
  });
};

const countryDuplicateCheckUpdate = (req, res, next) => {
  console.log("firstyyyyyyyyyyyyyyy-------", req.body);
  Country.findOne({
    where: {
      name: req.body.name,
    },
  }).then((country) => {
    if (country) {
      if (country.id != req.params.id) {
        res.status(400).send({
          msg: "Failed! Country name is already exist!",
        });
        return;
      }
    }

    next();
  });
};

module.exports = {
  countryDuplicateCheck,
  countryDuplicateCheckUpdate,
};
