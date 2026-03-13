"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      img: DataTypes.TEXT,
      type: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      date: DataTypes.STRING,
      isDelete: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    },
  );
  return Product;
};
