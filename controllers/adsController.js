const db = require("../models");
const Ads = db.ads;
const Helper = require("../utils/helper");
const helper = new Helper();

const adsAdd = (req, res) => {
    if (!req.body.name || !req.body.status || !req.body.img_src) {
        res.status(400).send({
            msg: "Ads name and status is required",
        });
    } else {
        Ads.create({
            name: req.body.name,
            status: req.body.status,
            img_src: req.body.img_src,
            widget_id: req.body.widget_id,
            link: req.body.link,
            page_name: req.body.page_name,
            position: req.body.position,
            min_age: req.body.min_age,
            max_age: req.body.max_age,
            gender: req.body.gender,
        })
        .then((ads) => res.status(201).send(ads))
        .catch((err) => {console.log(err);res.status(400).send(err);});
    }

};

const adsGetAll = (req, res) => {
    Ads.findAll().then((adss) => res.status(200).send(adss))
    .catch((err) => {
        res.status(400).send(err);
    });
};

const adsGet = (req, res) => {
    Ads.findByPk(req.params.id)
    .then((ads) => {res.status(200).send(ads)})
    .catch((err) => {res.status(400).send(err);});
};

const adsUpdate = (req, res) => {
    if (!req.params.id || !req.body.name) {
        res.status(400).send({
            msg: "Please pass ads ID, name, status",
        });
    } else {
        Ads.findByPk(req.params.id)
        .then((ads) => {
            Ads.update(
                {
                    name: req.body.name || ads.name,
                    status: req.body.status || ads.status,
                    img_src: req.body.img_src || ads.img_src,
                    widget_id: req.body.widget_id || ads.widget_id,
                    link: req.body.link || ads.link,
                    page_name: req.body.page_name || ads.page_name,
                    position: req.body.position || ads.position,
                    min_age: req.body.min_age || ads.min_age,
                    max_age: req.body.max_age || ads.max_age,
                    gender: req.body.gender || ads.gender,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            )
                .then((_) => {
                    res.status(200).send({
                        msg: "Ads updated",
                    });
                })
                .catch((err) => res.status(400).send(err));
        })
        .catch((error) => {
            res.status(400).send(error);
        });
    }
};

const adsDelete = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            msg: "Please pass ads ID.",
        });
    } else {
        Ads.findByPk(req.params.id)
            .then((ads) => {
                if (ads) {
                    ads
                        .destroy({
                            where: {
                                id: req.params.id,
                            },
                        })
                        .then((_) => {
                            res.status(200).send({
                                msg: "Ads deleted",
                            });
                        })
                        .catch((err) => res.status(400).send(err));
                } else {
                    res.status(404).send({
                        msg: "Ads not found",
                    });
                }
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }
};

module.exports = {
  adsAdd,
  adsGetAll,
  adsGet,
  adsUpdate,
  adsDelete,
};
