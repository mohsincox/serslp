module.exports = (sequelize, DataTypes) => {
  const PointTable = sequelize.define("point_tables", {
    match_id: {
      type: DataTypes.INTEGER,
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
    tournament_team_id: {
      type: DataTypes.INTEGER,
    },
    player_id: {
      type: DataTypes.INTEGER,
    },
    run: {
      type: DataTypes.INTEGER,
    },
    wicket: {
      type: DataTypes.INTEGER,
    },
    nam_of_the_match: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fifty: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    hundred: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    five_wickets: {
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

  return PointTable;
};
