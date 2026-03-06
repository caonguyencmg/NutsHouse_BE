"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bill.init(
    {
      fullName: DataTypes.STRING,
      billsCode: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.TEXT,
      productId: DataTypes.STRING,
      status: DataTypes.INTEGER,
      totalPrice: DataTypes.FLOAT,
      isDelete: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bill",
    },
  );
  return Bill;
};
