module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define("players", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    game_id: {
      type: DataTypes.INTEGER,
    },
    specification: {
      type: DataTypes.STRING,
    },
    country_id: {
      type: DataTypes.INTEGER,
    },
    franchise_id: {
      type: DataTypes.INTEGER,
    },
    ranking: {
      type: DataTypes.INTEGER,
    },
    point: {
      type: DataTypes.DOUBLE(8, 2),
    },
    image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });

  return Player;
};
