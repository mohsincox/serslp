const db = require("../models");
const Slider = db.slider;

const sliderDuplicateCheck = (req, res, next) => {
  console.log("firstuuuuuuuu --------------", req.body);
  if (!req.body.name) {
    res.status(400).send({
      msg: "Please pass slider name I middlew",
    });
    return;
  }

  Slider.findOne({
    where: {
      name: req.body.name,
    },
  }).then((slider) => {
    if (slider) {
      res.status(400).send({
        msg: "Failed! Slider name is already exist!",
      });
      return;
    }

    next();
  });
};

const sliderDuplicateCheckUpdate = (req, res, next) => {
  console.log("firstyyyyyyyyyyyyyyy-------", req.body);
  Slider.findOne({
    where: {
      name: req.body.name,
    },
  }).then((slider) => {
    if (slider) {
      if (slider.id != req.params.id) {
        res.status(400).send({
          msg: "Failed! Slider name is already exist!",
        });
        return;
      }
    }

    next();
  });
};

module.exports = {
  sliderDuplicateCheck,
  sliderDuplicateCheckUpdate,
};
