const express = require("express");
const router = express.Router();
const db = require("../models");
const Slider = db.slider;

router.get("/", (req, res) => {
  Slider.findAll({
    order: [["position"]],
  })
    .then((sliders) => res.status(200).send(sliders))
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
