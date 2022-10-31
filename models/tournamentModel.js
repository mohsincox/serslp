module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define("tournaments", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    game_id: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    month: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    upcomming: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });

  return Tournament;
};
