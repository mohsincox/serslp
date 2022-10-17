module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define("settings", {
    run_point: {
      type: DataTypes.DOUBLE(8, 2),
    },
    wicket_point: {
      type: DataTypes.DOUBLE(8, 2),
    },
    man_of_the_match_point: {
      type: DataTypes.DOUBLE(8, 2),
    },
    fifty_point: {
      type: DataTypes.DOUBLE(8, 2),
    },
    hundred_point: {
      type: DataTypes.DOUBLE(8, 2),
    },
    five_wickets_point: {
      type: DataTypes.DOUBLE(8, 2),
    },
    admin_cricket_player: {
      type: DataTypes.INTEGER,
    },
    user_cricket_player: {
      type: DataTypes.INTEGER,
    },
    admin_football_player: {
      type: DataTypes.INTEGER,
    },
    user_football_player: {
      type: DataTypes.INTEGER,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });

  return Settings;
};
