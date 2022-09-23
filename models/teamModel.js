module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("teams", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    tournament_id: {
      type: DataTypes.INTEGER,
    },
    player_ids: {
      type: DataTypes.STRING,
    },
    ranking: {
      type: DataTypes.INTEGER,
    },
    point: {
      type: DataTypes.DOUBLE(8, 2),
    },
    confirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });

  return Team;
};
