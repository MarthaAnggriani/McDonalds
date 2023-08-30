'use strict';
const fs = require("fs");
const ingredients = JSON.parse(fs.readFileSync("./data/ingredients.json", "utf-8"));
ingredients.map(e => {
  e.createdAt = e.updatedAt = new Date()
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ingredients', ingredients, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ingredients', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
