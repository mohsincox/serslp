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
    total_point: {
      type: DataTypes.DOUBLE(8, 2),
      allowNull: false,
      defaultValue: 0.0,
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
