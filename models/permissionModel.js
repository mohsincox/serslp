module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define("permissions", {
    perm_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    perm_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Permission;
};
