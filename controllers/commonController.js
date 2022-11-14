const db = require("../models");
const Country = db.country;
const Tournament = db.tournament;
const TournamentTeamPlayerDetail = db.tournamentTeamPlayerDetail;
const Player = db.player;
const Game = db.game;
const Franchise = db.franchise;
const TournamentTeam = db.tournamentTeam;
const GamePointSetting = db.gamePointSetting;

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

const tournamentGetCommon = (req, res) => {
  Tournament.findByPk(req.params.id)
    .then((tournament) => res.status(200).send(tournament))
    .catch((err) => {
      res.status(400).send(err);
    });
};

const tournamentTeamPlayerDetailGetAllCommon = (req, res) => {
  TournamentTeamPlayerDetail.findAll({
    where: {
      tournament_id: req.params.tourId,
    },
    include: [
      {
        model: Player,
        include: [
          {
            model: Game,
          },
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
    .then((tournamentTeamPlayerDetail) =>
      res.status(200).send(tournamentTeamPlayerDetail)
    )
    .catch((err) => {
      res.status(400).send(err);
    });
};

const tournamentTeamGetAllCommon = (req, res) => {
  TournamentTeam.findAll({
    where: {
      tournament_id: req.params.tourId,
    },
    include: [
      {
        model: Country,
      },
      {
        model: Franchise,
      },
    ],
  })
    .then((games) => res.status(200).send(games))
    .catch((err) => {
      res.status(400).send(err);
    });
};

const tournamentFootballTeamSettingCommon = (req, res) => {
  GamePointSetting.findByPk(2)
    .then((setting) => res.status(200).send(setting))
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  countryGetAllCommon,
  countryGetCommon,
  tournamentGetCommon,
  tournamentTeamPlayerDetailGetAllCommon,
  tournamentTeamGetAllCommon,
  tournamentFootballTeamSettingCommon,
};
