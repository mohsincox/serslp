module.exports = (sequelize, DataTypes) => {
  const Slider = sequelize.define("sliders", {
    name: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.INTEGER,
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

  return Slider;
};
