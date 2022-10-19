const db = require("../models");
const Widget = db.widget;
const Helper = require("../utils/helper");
const helper = new Helper();

const widgetAdd = (req, res) => {
    if (!req.body.name || !req.body.status) {
        res.status(400).send({
            msg: "Widget name and status is required",
        });
    } else {
        Widget.create({
            name: req.body.name,
            status: req.body.status
        })
        .then((widget) => res.status(201).send(widget))
        .catch((err) => {console.log(err);res.status(400).send(err);});
    }

};

const widgetGetAll = (req, res) => {
    Widget.findAll().then((widgets) => res.status(200).send(widgets))
    .catch((err) => {
        res.status(400).send(err);
    });
};

const widgetGet = (req, res) => {
    Widget.findByPk(req.params.id)
    .then((widget) => {res.status(200).send(widget)})
    .catch((err) => {res.status(400).send(err);});
};

const widgetUpdate = (req, res) => {
    if (!req.params.id || !req.body.name) {
        res.status(400).send({
            msg: "Please pass widget ID, name, status",
        });
    } else {
        Widget.findByPk(req.params.id)
        .then((widget) => {
            Widget.update(
                {
                    name: req.body.name || widget.name,
                    status: req.body.status || widget.status,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            )
                .then((_) => {
                    res.status(200).send({
                        msg: "Widget updated",
                    });
                })
                .catch((err) => res.status(400).send(err));
        })
        .catch((error) => {
            res.status(400).send(error);
        });
    }
};

const widgetDelete = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            msg: "Please pass widget ID.",
        });
    } else {
        Widget.findByPk(req.params.id)
            .then((widget) => {
                if (widget) {
                    widget
                        .destroy({
                            where: {
                                id: req.params.id,
                            },
                        })
                        .then((_) => {
                            res.status(200).send({
                                msg: "Widget deleted",
                            });
                        })
                        .catch((err) => res.status(400).send(err));
                } else {
                    res.status(404).send({
                        msg: "Widget not found",
                    });
                }
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }
};

module.exports = {
  widgetAdd,
  widgetGetAll,
  widgetGet,
  widgetUpdate,
  widgetDelete,
};
