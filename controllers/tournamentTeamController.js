const db = require("../models");
const TournamentTeam = db.tournamentTeam;
const Tournament = db.tournament;
const Country = db.country;
const Franchise = db.franchise;
const Helper = require("../utils/helper");
const helper = new Helper();

const tournamentTeamAdd = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "tournament_team_add")
    .then((rolePerm) => {
      if (!req.body.name || !req.body.tournament_id) {
        res.status(400).send({
          msg: "Please pass name, tournament.",
        });
      } else {
        if (req.body.category == "International") {
          TournamentTeam.create({
            name: req.body.name,
            tournament_id: req.body.tournament_id,
            category: req.body.category,
            country_id: req.body.country_id,
            franchise_id: "",
          })
            .then((tournamentTeam) => res.status(201).send(tournamentTeam))
            .catch((err) => {
              console.log(err);
              res.status(400).send(err);
            });
        } else {
          TournamentTeam.create({
            name: req.body.name,
            tournament_id: req.body.tournament_id,
            category: req.body.category,
            country_id: "",
            franchise_id: req.body.franchise_id,
          })
            .then((tournamentTeam) => res.status(201).send(tournamentTeam))
            .catch((err) => {
              console.log(err);
              res.status(400).send(err);
            });
        }
      }
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const tournamentTeamGetAll = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "tournament_team_get_all")
    .then((rolePerm) => {
      TournamentTeam.findAll({
        include: [
          {
            model: Tournament,
          },
          {
            model: Country,
          },
          {
            model: Franchise,
          },
        ],
      })
        .then((tournamentTeams) => res.status(200).send(tournamentTeams))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const tournamentTeamGet = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "tournament_team_get")
    .then((rolePerm) => {
      TournamentTeam.findByPk(req.params.id)
        .then((tournamentTeam) => res.status(200).send(tournamentTeam))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const tournamentTeamUpdate = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "tournament_team_update")
    .then((rolePerm) => {
      if (!req.params.id || !req.body.name || !req.body.tournament_id) {
        res.status(400).send({
          msg: "Please pass tournament Team ID, tournament",
        });
      } else {
        if (req.body.category == "International") {
          TournamentTeam.findByPk(req.params.id)
            .then((tournamentTeam) => {
              TournamentTeam.update(
                {
                  name: req.body.name,
                  tournament_id: req.body.tournament_id,
                  category: req.body.category,
                  country_id: req.body.country_id,
                  franchise_id: "",
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then((_) => {
                  res.status(200).send({
                    msg: "Tournament Team updated",
                  });
                })
                .catch((err) => res.status(400).send(err));
            })
            .catch((error) => {
              res.status(400).send(error);
            });
        } else {
          TournamentTeam.findByPk(req.params.id)
            .then((tournamentTeam) => {
              TournamentTeam.update(
                {
                  name: req.body.name,
                  tournament_id: req.body.tournament_id,
                  category: req.body.category,
                  country_id: "",
                  franchise_id: req.body.franchise_id,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then((_) => {
                  res.status(200).send({
                    msg: "Tournament Team updated",
                  });
                })
                .catch((err) => res.status(400).send(err));
            })
            .catch((error) => {
              res.status(400).send(error);
            });
        }
      }
    })
    .catch((error) => {
      res.status(403).send(error);
    });
};

const tournamentTeamDelete = (req, res) => {
  helper
    .checkPermission(req.user.role_id, "tournament_team_delete")
    .then((rolePerm) => {
      if (!req.params.id) {
        res.status(400).send({
          msg: "Please pass tournamentTeam ID.",
        });
      } else {
        TournamentTeam.findByPk(req.params.id)
          .then((tournamentTeam) => {
            if (tournamentTeam) {
              tournamentTeam
                .destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                .then((_) => {
                  res.status(200).send({
                    msg: "Tournament Team deleted",
                  });
                })
                .catch((err) => res.status(400).send(err));
            } else {
              res.status(404).send({
                msg: "Tournament Team not found",
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
  tournamentTeamAdd,
  tournamentTeamGetAll,
  tournamentTeamGet,
  tournamentTeamUpdate,
  tournamentTeamDelete,
};
