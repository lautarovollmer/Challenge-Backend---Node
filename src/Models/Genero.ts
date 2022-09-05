import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define("genre", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
