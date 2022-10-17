module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define("clubs", {
    name: {
      type: DataTypes.STRING,
    },
    game_id: {
      type: DataTypes.INTEGER,
    },
    country_id: {
      type: DataTypes.INTEGER,
    },
    franchise_id: {
      type: DataTypes.INTEGER,
    },
    logo: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });

  return Club;
};
