module.exports = (sequelize, DataTypes) => {
  const Franchise = sequelize.define("franchises", {
    name: {
      type: DataTypes.STRING,
    },
    country_id: {
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

  return Franchise;
};
