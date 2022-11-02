module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    role_id: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
