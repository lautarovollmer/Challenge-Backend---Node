import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define("movie", {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
