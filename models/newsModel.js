module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define("news", {
    tournament_id: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.TEXT,
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

  return News;
};
