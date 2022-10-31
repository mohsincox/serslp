const db = require("../models");
const Tournament = db.tournament;
const Game = db.game;
// const Helper = require("../utils/helper");
// const helper = new Helper();

const tournamentCricketGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_get_all")
  //     .then((rolePerm) => {
  Tournament.findAll({
    where: {
      game_id: 1,
    },
  })
    .then((cricketTournamets) => res.status(200).send(cricketTournamets))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const tournamentFootballGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_get_all")
  //     .then((rolePerm) => {
  Tournament.findAll({
    where: {
      game_id: 2,
    },
  })
    .then((cricketTournamets) => res.status(200).send(cricketTournamets))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const gameTournamentsGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_get_all")
  //     .then((rolePerm) => {
  Game.findAll({
    include: [
      {
        model: Tournament,
      },
    ],
  })
    .then((games) => res.status(200).send(games))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const gameTournamentsActiveGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_get_all")
  //     .then((rolePerm) => {
  Game.findAll({
    include: [
      {
        model: Tournament,
        where: { status: "Active" },
      },
    ],
  })
    .then((games) => res.status(200).send(games))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

const gameTournamentsUpcommingGetAll = (req, res) => {
  //   helper
  //     .checkPermission(req.user.role_id, "permission_get_all")
  //     .then((rolePerm) => {
  Game.findAll({
    include: [
      {
        model: Tournament,
        where: { upcomming: "Yes" },
      },
    ],
  })
    .then((games) => res.status(200).send(games))
    .catch((err) => {
      res.status(400).send(err);
    });
  // })
  // .catch((err) => {
  //   res.status(403).send(err);
  // });
};

module.exports = {
  tournamentCricketGetAll,
  tournamentFootballGetAll,
  gameTournamentsGetAll,
  gameTournamentsUpcommingGetAll,
  gameTournamentsActiveGetAll,
};
