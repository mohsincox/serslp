const db = require("../models");
const Franchise = db.franchise;

const franchiseDuplicateCheck = (req, res, next) => {
  console.log("firstuuuuuuuu --------------", req.body);
  if (!req.body.name) {
    res.status(400).send({
      msg: "Please pass franchise name I middlew",
    });
    return;
  }

  Franchise.findOne({
    where: {
      name: req.body.name,
    },
  }).then((franchise) => {
    if (franchise) {
      res.status(400).send({
        msg: "Failed! Franchise name is already exist!",
      });
      return;
    }

    next();
  });
};

const franchiseDuplicateCheckUpdate = (req, res, next) => {
  console.log("firstyyyyyyyyyyyyyyy-------", req.body);
  Franchise.findOne({
    where: {
      name: req.body.name,
    },
  }).then((franchise) => {
    if (franchise) {
      if (franchise.id != req.params.id) {
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
  franchiseDuplicateCheck,
  franchiseDuplicateCheckUpdate,
};
