module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define("games", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    detail: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });

  return Game;
};
