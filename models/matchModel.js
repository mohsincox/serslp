module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define("matches", {
    stage_name: {
      type: DataTypes.STRING,
    },
    tournament_id: {
      type: DataTypes.INTEGER,
    },
    country_one_id: {
      type: DataTypes.INTEGER,
    },
    country_two_id: {
      type: DataTypes.INTEGER,
    },
    start_date: {
      type: DataTypes.DATEONLY,
    },
    start_time: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });

  return Match;
};
