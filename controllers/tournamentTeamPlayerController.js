const db = require("../models");
const TournamentTeamPlayer = db.tournamentTeamPlayer;
const TournamentTeamPlayerDetail = db.tournamentTeamPlayerDetail;
const TournamentTeam = db.tournamentTeam;
const Tournament = db.tournament;
const Country = db.country;
const Franchise = db.franchise;
const Game = db.game;
const Player = db.player;
const Helper = require("../utils/helper");
const helper = new Helper();

const tournamentTeamPlayerAdd = async (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "game_add")
  //     .then((rolePerm) => {
  if (!req.body.tournament_id || !req.body.tournament_team_id) {
    res.status(400).send({
      msg: "Please pass Tournament ID, Team ID",
    });
  } else {
    const teamPlayerFind = await TournamentTeamPlayer.findOne({
      where: {
        tournament_id: req.body.tournament_id,
        tournament_team_id: req.body.tournament_team_id,
      },
    });

    console.log("---------", teamPlayerFind);

    if (teamPlayerFind === null) {
      TournamentTeamPlayerDetail.destroy({
        where: {
          tournament_team_id: req.body.tournament_team_id,
        },
      });

      TournamentTeamPlayer.create({
        tournament_id: req.body.tournament_id,
        tournament_team_id: req.body.tournament_team_id,
        player_ids: req.body.player_ids,
      })
        .then((tournamentTeamPlayer) => {
          const selectedPlayers = JSON.parse(req.body.player_ids);

          for (i = 0; i < selectedPlayers.length; i++) {
            TournamentTeamPlayerDetail.create({
              tournament_team_player_id: tournamentTeamPlayer.id,
              tournament_id: req.body.tournament_id,
              tournament_team_id: req.body.tournament_team_id,
              player_id: selectedPlayers[i],
            });
          }
        })
        .then((tournamentTeamPlayer) =>
          res.status(201).send(tournamentTeamPlayer)
        )
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    } else {
      console.log(teamPlayerFind instanceof TournamentTeamPlayer); // true
      console.log(teamPlayerFind.tournament_id); // 'My Title'

      TournamentTeamPlayerDetail.destroy({
        where: {
          tournament_team_id: req.body.tournament_team_id,
        },
      });

      teamPlayerFind
        .update({
          tournament_id: req.body.tournament_id,
          tournament_team_id: req.body.tournament_team_id,
          player_ids: req.body.player_ids,
        })
        .then((tournamentTeamPlayer) => {
          const selectedPlayers = JSON.parse(req.body.player_ids);

          for (i = 0; i < selectedPlayers.length; i++) {
            TournamentTeamPlayerDetail.create({
              tournament_team_player_id: tournamentTeamPlayer.id,
              tournament_id: req.body.tournament_id,
              tournament_team_id: req.body.tournament_team_id,
              player_id: selectedPlayers[i],
            });
          }
        })
        .then((_) => {
          res.status(200).send({
            msg: "TournamentTeamPlayer updated",
          });
        })
        .catch((err) => res.status(400).send(err));
    }

    // return;

    // TournamentTeamPlayerDetail.destroy({
    //   where: {
    //     tournament_team_id: req.body.tournament_team_id,
    //   },
    // });

    // TournamentTeamPlayer.create({
    //   tournament_id: req.body.tournament_id,
    //   tournament_team_id: req.body.tournament_team_id,
    //   player_ids: req.body.player_ids,
    // })
    //   .then((tournamentTeamPlayer) => {
    //     const selectedPlayers = JSON.parse(req.body.player_ids);

    //     for (i = 0; i < selectedPlayers.length; i++) {
    //       TournamentTeamPlayerDetail.create({
    //         tournament_team_player_id: tournamentTeamPlayer.id,
    //         tournament_id: req.body.tournament_id,
    //         tournament_team_id: req.body.tournament_team_id,
    //         player_id: selectedPlayers[i],
    //       });
    //     }
    //   })
    //   .then((tournamentTeamPlayer) =>
    //     res.status(201).send(tournamentTeamPlayer)
    //   )
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(400).send(err);
    //   });
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const tournamentTeamPlayerGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "game_get_all")
  //     .then((rolePerm) => {
  TournamentTeamPlayer.findAll({
    include: [
      {
        model: Tournament,
      },
      {
        model: TournamentTeam,
        include: [
          {
            model: Country,
          },
          {
            model: Franchise,
          },
        ],
      },
    ],
  })
    .then((tournamentTeamPlayers) =>
      res.status(200).send(tournamentTeamPlayers)
    )
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const matchTournamentTeamPlayerGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "game_get_all")
  //     .then((rolePerm) => {
  console.log("first hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  TournamentTeamPlayerDetail.findAll({
    where: { tournament_team_id: req.params.tournament_team_id },
    include: [
      {
        model: Player,
      },
    ],
  })
    .then((tournamentTeamPlayers) =>
      res.status(200).send(tournamentTeamPlayers)
    )
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const teamTournamentGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "game_get_all")
  //     .then((rolePerm) => {
  TournamentTeam.findAll({
    where: {
      tournament_id: req.params.tournament_id,
    },
    include: [
      {
        model: Tournament,
        include: [
          {
            model: Game,
          },
        ],
      },
      {
        model: Country,
      },
      {
        model: Franchise,
      },
    ],
  })
    .then((tournamentTeamPlayers) =>
      res.status(200).send(tournamentTeamPlayers)
    )
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const gamePlayerGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "game_get_all")
  //     .then((rolePerm) => {
  Player.findAll({
    where: {
      game_id: req.params.game_id,
      status: "Active",
    },
    include: [
      {
        model: Country,
      },
    ],
  })
    .then((tournamentTeamPlayers) =>
      res.status(200).send(tournamentTeamPlayers)
    )
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const tournamentTeamPlayerGet = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "game_get")
  //     .then((rolePerm) => {
  TournamentTeamPlayer.findByPk(req.params.id, {
    include: [
      {
        model: TournamentTeam,
        include: [
          {
            model: Country,
          },
          {
            model: Franchise,
          },
        ],
      },
      {
        model: TournamentTeamPlayerDetail,
        include: [
          {
            model: Player,
            include: [
              {
                model: Country,
              },
            ],
          },
        ],
      },
    ],
  })
    .then((tournamentTeamPlayer) => res.status(200).send(tournamentTeamPlayer))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const tournamentTeamPlayerUpdate = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "game_update")
  //     .then((rolePerm) => {
  if (!req.params.id || !req.body.tournament_id) {
    res.status(400).send({
      msg: "Please pass TournamentTeamPlayer ID, tournament_id",
    });
  } else {
    TournamentTeamPlayer.findByPk(req.params.id)
      .then((tournamentTeamPlayer) => {
        TournamentTeamPlayer.update(
          {
            name: req.body.name || tournamentTeamPlayer.name,
            detail: req.body.detail || tournamentTeamPlayer.detail,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then((_) => {
            res.status(200).send({
              msg: "TournamentTeamPlayer updated",
            });
          })
          .catch((err) => res.status(400).send(err));
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

const tournamentTeamPlayerDelete = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "game_delete")
  //     .then((rolePerm) => {
  if (!req.params.id) {
    res.status(400).send({
      msg: "Please pass TournamentTeamPlayer ID.",
    });
  } else {
    TournamentTeamPlayerDetail.destroy({
      where: {
        tournament_team_player_id: req.params.id,
      },
    });

    TournamentTeamPlayer.findByPk(req.params.id)
      .then((tournamentTeamPlayer) => {
        if (tournamentTeamPlayer) {
          tournamentTeamPlayer
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then((_) => {
              res.status(200).send({
                msg: "TournamentTeamPlayer deleted",
              });
            })
            .catch((err) => res.status(400).send(err));
        } else {
          res.status(404).send({
            msg: "TournamentTeamPlayer not found",
          });
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
  // })
  // .catch((error) => {
  //   res.status(403).send(error);
  // });
};

module.exports = {
  tournamentTeamPlayerAdd,
  tournamentTeamPlayerGetAll,
  tournamentTeamPlayerGet,
  tournamentTeamPlayerUpdate,
  tournamentTeamPlayerDelete,
  teamTournamentGetAll,
  gamePlayerGetAll,
  matchTournamentTeamPlayerGetAll,
};
