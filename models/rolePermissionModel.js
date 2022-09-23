module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define("role_permissions", {
    role_id: DataTypes.INTEGER,
    perm_id: DataTypes.INTEGER,
  });

  return RolePermission;
};
