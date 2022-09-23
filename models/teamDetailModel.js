module.exports = (sequelize, DataTypes) => {
  const TeamDetail = sequelize.define("team_details", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    team_id: {
      type: DataTypes.INTEGER,
    },
    tournament_id: {
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
  });

  return TeamDetail;
};
