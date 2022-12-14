"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.User, {
        foreignKey: {
          name: "user_id",
          type: DataTypes.UUID,
        },
      });
      Item.hasMany(models.Review, {
        foreignKey: {
          name: "item_id",
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
      trending: DataTypes.BOOLEAN,
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
