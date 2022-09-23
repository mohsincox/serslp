module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define("players", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,
    },
    specification: {
      type: DataTypes.STRING,
    },
    batting_position: {
      type: DataTypes.INTEGER,
    },
    jersey_no: {
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
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });

  return Player;
};
