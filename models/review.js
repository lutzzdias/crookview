"use strict";
const { Model } = require("sequelize");
const { User, Item } = require("./");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(User, {
        foreignKey: {
          type: DataTypes.UUID,
        },
      });
      Review.belongsTo(Item, {
        foreignKey: {
          type: DataTypes.UUID,
        },
      });
    }
  }
  Review.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      stars: DataTypes.INTEGER,
      like_count: DataTypes.INTEGER,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "reviews",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Review;
};
