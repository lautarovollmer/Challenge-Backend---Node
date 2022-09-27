import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define("character", {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    history: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};

