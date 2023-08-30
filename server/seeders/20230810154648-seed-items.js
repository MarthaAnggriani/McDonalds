'use strict';
const fs = require("fs");
const items = JSON.parse(fs.readFileSync("./data/items.json", "utf-8"));
items.map(e => {
  delete e.id
  e.createdAt = e.updatedAt = new Date()
})


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', items, {});
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
    await queryInterface.bulkDelete('Items', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
