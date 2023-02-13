'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface
    .removeColumn(
      "items",
      "date"
      ).then(() => {
        return queryInterface.renameColumn("reviews", "stars","rating")
      });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface
    .addColumn(
      "items",
      "date"
      ).then(() => {
        return queryInterface.renameColumn("reviews", "rating", "stars");
      });
  }
};
