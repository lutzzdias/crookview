"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Item belongs to User
    return queryInterface
      .addColumn(
        "items", // name of Source table
        "user_id", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "users", // name of Target table
            key: "id", // key in Target table that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      )
      .then(() => {
        // Review belongs to User
        return queryInterface.addColumn(
          "reviews", // name of Source table
          "user_id", // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: "users", // name of Target table
              key: "id", // key in Target table that we're referencing
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          }
        );
      })
      .then(() => {
        // Review belongs to Item
        return queryInterface.addColumn(
          "reviews", // name of Source table
          "item_id", // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: "items", // name of Target table
              key: "id", // key in Target table that we're referencing
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          }
        );
      });
  },

  async down(queryInterface, Sequelize) {
    // Remove Item belongs to User
    return queryInterface
      .removeColumn("items", "user_id")
      .then(() => {
        // Remove Review belongs to User
        return queryInterface.removeColumn("reviews", "user_id");
      })
      .then(() => {
        // Remove Review belongs to Item
        return queryInterface.removeColumn("reviews", "item_id");
      });
  },
};
