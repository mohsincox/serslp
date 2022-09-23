module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define("countries", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    short_name: {
      type: DataTypes.STRING,
    },
    flag: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });

  return Country;
};
