module.exports = (sequelize, DataTypes) => {
  const TournamentTeam = sequelize.define("tournament_teams", {
    name: {
      type: DataTypes.STRING,
    },
    tournament_id: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    country_id: {
      type: DataTypes.INTEGER,
    },
    franchise_id: {
      type: DataTypes.INTEGER,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });

  return TournamentTeam;
};
