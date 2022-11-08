module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("contacts", {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING(1000),
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });

  return Contact;
};
