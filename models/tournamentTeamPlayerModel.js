module.exports = (sequelize, DataTypes) => {
  const TournamentTeamPlayer = sequelize.define("tournament_team_players", {
    tournament_id: {
      type: DataTypes.INTEGER,
    },
    tournament_team_id: {
      type: DataTypes.INTEGER,
    },
    player_ids: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });

  return TournamentTeamPlayer;
};
