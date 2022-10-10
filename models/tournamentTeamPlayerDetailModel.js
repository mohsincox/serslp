module.exports = (sequelize, DataTypes) => {
  const TournamentTeamPlayerDetail = sequelize.define(
    "tournament_team_player_details",
    {
      tournament_team_player_id: {
        type: DataTypes.INTEGER,
      },
      tournament_id: {
        type: DataTypes.INTEGER,
      },
      tournament_team_id: {
        type: DataTypes.INTEGER,
      },
      player_id: {
        type: DataTypes.INTEGER,
      },
      created_by: {
        type: DataTypes.INTEGER,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
    }
  );

  return TournamentTeamPlayerDetail;
};
