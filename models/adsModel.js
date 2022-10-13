module.exports = (sequelize, DataTypes) => {
  const Ads = sequelize.define("ads", {
    widget_id : {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    },
    img_src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
    },
    page_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "/"
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    min_age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max_age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    updated_by: {
      type: DataTypes.INTEGER,
    },
  });
  return Ads;
};
