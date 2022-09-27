module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define("matches", {
    stage_name: {
      type: DataTypes.STRING,
    },
    tournament_id: {
      type: DataTypes.INTEGER,
    },
    tournament_team_one_id: {
      type: DataTypes.INTEGER,
    },
    tournament_team_two_id: {
      type: DataTypes.INTEGER,
    },
    start_date: {
      type: DataTypes.STRING,
    },
    start_time: {
      type: DataTypes.STRING,
    },
    venue: {
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
