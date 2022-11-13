"use strict";
const { Model } = require("sequelize");
const { User, Review } = require("./");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(User, {
        foreignKey: {
          type: DataTypes.UUID,
        },
      });
      Item.hasMany(Review, {
        foreignKey: {
          type: DataTypes.UUID,
        },
      });
    }
  }
  Item.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      date: DataTypes.DATEONLY,
      image: DataTypes.BLOB,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Item",
      tableName: "items",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Item;
};
