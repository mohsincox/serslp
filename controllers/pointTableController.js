const db = require("../models");
const PointTable = db.pointTable;
const Match = db.match;
const Tournament = db.tournament;
const TournamentTeam = db.tournamentTeam;
const Country = db.country;
const Franchise = db.franchise;
const Player = db.player;
const TeamDetail = db.teamDetail;
const Settings = db.settings;
const GamePointSetting = db.gamePointSetting;
const Helper = require("../utils/helper");
const helper = new Helper();

const pointTableAdd = (req, res) => {
    helper
        .checkPermission(req.user.role_id, "point_table_add")
        .then((rolePerm) => {
            if (!req.body.match_id) {
                res.status(400).send({
                    msg: "Please pass point table name.",
                });
            } else {
                Settings.findByPk(1)
                    .then((settings) => {
                        PointTable.create({
                            match_id: req.body.match_id,
                            tournament_team_id: req.body.tournament_team_id,
                            player_id: req.body.player_id,
                            run: req.body.run,
                            wicket: req.body.wicket,
                            man_of_the_match: req.body.man_of_the_match,
                            fifty: req.body.fifty,
                            hundred: req.body.hundred,
                            five_wickets: req.body.five_wickets,
                        })
                            .then((pointTable) =>
                                TeamDetail.increment(
                                    {
                                        total_point:
                                            +(settings.run_point * req.body.run) +
                                            settings.wicket_point * req.body.wicket +
                                            settings.man_of_the_match_point *
                                            req.body.man_of_the_match +
                                            settings.fifty_point * req.body.fifty +
                                            settings.hundred_point * req.body.hundred +
                                            settings.five_wickets_point * req.body.five_wickets,
                                    },
                                    {where: {player_id: pointTable.player_id}}
                                )
                                    .then((_) => {
                                        // res.status(200).send({
                                        //   msg: "Match updated",
                                        // });
                                        res.status(201).send(pointTable);
                                    })
                                    .catch((err) => res.status(400).send(err))
                            )
                            .catch((err) => {
                                console.log(err);
                                res.status(400).send(err);
                            });
                    })
                    .catch((err) => {
                        console.log("Err Settings", err);
                        res.status(400).send(err);
                    });
            }
        })
        .catch((error) => {
            res.status(403).send(error);
        });
};


const pointTableGetAll = (req, res) => {
    helper
        .checkPermission(req.user.role_id, "point_table_get_all")
        .then((rolePerm) => {
            PointTable.findAll({
                include: [
                    {
                        model: Match,
                        include: [
                            {
                                model: Tournament,
                            },
                            {
                                model: TournamentTeam,
                                as: "tournament_team_one",
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
                                model: TournamentTeam,
                                as: "tournament_team_two",
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
                    },
                    {
                        model: Player,
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
                .then((pointTables) => res.status(200).send(pointTables))
                .catch((err) => {
                    res.status(400).send(err);
                });
        })
        .catch((err) => {
            res.status(403).send(err);
        });
};

const pointTableGet = (req, res) => {
    helper
        .checkPermission(req.user.role_id, "point_table_get")
        .then((rolePerm) => {
            PointTable.findByPk(req.params.id)
                .then((pointTable) => res.status(200).send(pointTable))
                .catch((err) => {
                    res.status(400).send(err);
                });
        })
        .catch((err) => {
            res.status(403).send(err);
        });
};

const pointTableUpdate = (req, res) => {
    helper
        .checkPermission(req.user.role_id, "point_table_update")
        .then((rolePerm) => {
            // console.log("firstfgfhf======", req.body);
            // return;
            if (!req.params.id || !req.body.match_id) {
                res.status(400).send({
                    msg: "Please pass pointTable ID, match_id",
                });
            } else {
                Settings.findByPk(1)
                    .then((settings) => {
                        PointTable.findByPk(req.params.id)
                            .then((pointTable) => {
                                PointTable.update(
                                    {
                                        match_id: req.body.match_id,
                                        tournament_team_id: req.body.tournament_team_id,
                                        player_id: req.body.player_id,
                                        run: req.body.run,
                                        wicket: req.body.wicket,
                                        man_of_the_match: req.body.man_of_the_match,
                                        fifty: req.body.fifty,
                                        hundred: req.body.hundred,
                                        five_wickets: req.body.five_wickets,
                                    },
                                    {
                                        where: {
                                            id: req.params.id,
                                        },
                                    }
                                )
                                    .then((pointTableUpdate) => {
                                        TeamDetail.increment(
                                            {
                                                total_point:
                                                    +(settings.run_point * req.body.run) +
                                                    settings.wicket_point * req.body.wicket +
                                                    settings.man_of_the_match_point *
                                                    req.body.man_of_the_match +
                                                    settings.fifty_point * req.body.fifty +
                                                    settings.hundred_point * req.body.hundred +
                                                    settings.five_wickets_point * req.body.five_wickets -
                                                    (settings.run_point * pointTable.run +
                                                        settings.wicket_point * pointTable.wicket +
                                                        settings.man_of_the_match_point *
                                                        pointTable.man_of_the_match +
                                                        settings.fifty_point * pointTable.fifty +
                                                        settings.hundred_point * pointTable.hundred +
                                                        settings.five_wickets_point *
                                                        pointTable.five_wickets),
                                            },
                                            {where: {player_id: req.body.player_id}}
                                        );
                                    })
                                    .then((_) => {
                                        res.status(200).send({
                                            msg: "Point Table updated",
                                        });
                                    })
                                    .catch((err) => res.status(400).send(err));
                            })
                            .catch((error) => {
                                res.status(400).send(error);
                            });
                    })
                    .catch((err) => {
                        console.log("Err Settings", err);
                        res.status(400).send(err);
                    });
            }
        })
        .catch((error) => {
            res.status(403).send(error);
        });
};

const pointTableDelete = (req, res) => {
    helper
        .checkPermission(req.user.role_id, "point_table_delete")
        .then((rolePerm) => {
            if (!req.params.id) {
                res.status(400).send({
                    msg: "Please pass pointTable ID.",
                });
            } else {
                Settings.findByPk(1)
                    .then((settings) => {
                        PointTable.findByPk(req.params.id)
                            .then((pointTable) => {
                                if (pointTable) {
                                    TeamDetail.increment(
                                        {
                                            total_point: -(
                                                settings.run_point * pointTable.run +
                                                settings.wicket_point * pointTable.wicket +
                                                settings.man_of_the_match_point *
                                                pointTable.man_of_the_match +
                                                settings.fifty_point * pointTable.fifty +
                                                settings.hundred_point * pointTable.hundred +
                                                settings.five_wickets_point * pointTable.five_wickets
                                            ),
                                        },
                                        {where: {player_id: pointTable.player_id}}
                                    );
                                } else {
                                    res.status(404).send({
                                        msg: "Point Table not found",
                                    });
                                }

                                if (pointTable) {
                                    pointTable
                                        .destroy({
                                            where: {
                                                id: req.params.id,
                                            },
                                        })
                                        .then((_) => {
                                            res.status(200).send({
                                                msg: "Point Table deleted",
                                            });
                                        })
                                        .catch((err) => res.status(400).send(err));
                                } else {
                                    res.status(404).send({
                                        msg: "Point Table not found",
                                    });
                                }
                            })
                            .catch((error) => {
                                res.status(400).send(error);
                            });
                    })
                    .catch((err) => {
                        console.log("Err Settings", err);
                        res.status(400).send(err);
                    });
            }
        })
        .catch((error) => {
            res.status(403).send(error);
        });
};

const footballPointTableAdd = async (req, res) => {
    try {
        await helper.checkPermission(req.user.role_id, "point_table_add");
    } catch (error) {
        res.status(403).send(error);
    }

    try {
        let {footballPoints, match_id, tournament_team_id, player_id, currentPlayerSpcification, currentMatch} = req.body
        const pointTableCreate = await PointTable.create({
            match_id: match_id,
            tournament_team_id: tournament_team_id,
            player_id: player_id,
            ...footballPoints
        });
        const totalPoint = await helper.calculateFootballPlayerTotalPoint(footballPoints, currentPlayerSpcification);
        const userTeamPointUpdate = TeamDetail.increment({total_point: totalPoint}, {
                where: {player_id: player_id, tournament_id: currentMatch.tournament_id}
            }
        );
        if(pointTableCreate && userTeamPointUpdate) {
            res.status(201).send(pointTableCreate);
        }
    } catch (error) {
        res.status(400).send(error);
    }



}

module.exports = {
    pointTableAdd,
    pointTableGetAll,
    pointTableGet,
    pointTableUpdate,
    pointTableDelete,
    footballPointTableAdd
};
