const db = require("../models");
const Settings = db.settings;
const Helper = require("../utils/helper");
const helper = new Helper();

const settingsAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "settings_add")
    .then((rolePerm) => {
      //   if (!req.body.name) {
      //     res.status(400).send({
      //       msg: "Please pass settings name.",
      //     });
      //   } else {

      Settings.create({
        run_point: req.body.run_point,
        wicket_point: req.body.wicket_point,
        man_of_the_match_point: req.body.man_of_the_match_point,
        fifty_point: req.body.fifty_point,
        hundred_point: req.body.hundred_point,
        five_wickets_point: req.body.five_wickets_point,
        admin_cricket_player: req.body.admin_cricket_player,
        user_cricket_player: req.body.user_cricket_player,
        admin_football_player: req.body.admin_football_player,
        user_football_player: req.body.user_football_player,
      })
        .then((settings) => res.status(201).send(settings))
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });

      //   }
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const settingsGetAll = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "settings_get_all")
    .then((rolePerm) => {
      Settings.findAll()
        .then((settingss) => res.status(200).send(settingss))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const settingsGet = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "settings_get")
    .then((rolePerm) => {
      Settings.findByPk(req.params.id)
        .then((settings) => res.status(200).send(settings))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const settingsUpdate = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "settings_update")
    .then((rolePerm) => {
      //   if (!req.params.id || !req.body.name) {
      //     res.status(400).send({
      //       msg: "Please pass settings ID, name",
      //     });
      //   } else {

      Settings.findByPk(req.params.id)
        .then((settings) => {
          Settings.update(
            {
              run_point: req.body.run_point || settings.run_point,
              wicket_point: req.body.wicket_point || settings.wicket_point,
              man_of_the_match_point:
                req.body.man_of_the_match_point ||
                settings.man_of_the_match_point,
              fifty_point: req.body.fifty_point || settings.fifty_point,
              hundred_point: req.body.hundred_point || settings.hundred_point,
              five_wickets_point:
                req.body.five_wickets_point || settings.five_wickets_point,
              admin_cricket_player:
                req.body.admin_cricket_player || settings.admin_cricket_player,
              user_cricket_player:
                req.body.user_cricket_player || settings.user_cricket_player,
              admin_football_player:
                req.body.admin_football_player ||
                settings.admin_football_player,
              user_football_player:
                req.body.user_football_player || settings.user_football_player,
            },
            {
              where: {
                id: req.params.id,
              },
            }
          )
            .then((_) => {
              res.status(200).send({
                msg: "Settings updated",
              });
            })
            .catch((err) => res.status(400).send(err));
        })
        .catch((error) => {
          res.status(400).send(error);
        });

      //   }
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const settingsDelete = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "settings_delete")
    .then((rolePerm) => {
      if (!req.params.id) {
        res.status(400).send({
          msg: "Please pass game ID.",
        });
      } else {
        Settings.findByPk(req.params.id)
          .then((settings) => {
            if (settings) {
              settings
                .destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                .then((_) => {
                  res.status(200).send({
                    msg: "Settings deleted",
                  });
                })
                .catch((err) => res.status(400).send(err));
            } else {
              res.status(404).send({
                msg: "Settings not found",
              });
            }
          })
          .catch((error) => {
            res.status(400).send(error);
          });
      }
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

module.exports = {
  settingsAdd,
  settingsGetAll,
  settingsGet,
  settingsUpdate,
  settingsDelete,
};
