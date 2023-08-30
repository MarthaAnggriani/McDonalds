'use strict';
const fs = require("fs");
const categories = JSON.parse(fs.readFileSync("./data/categories.json", "utf-8"));
categories.map(e => {
  e.createdAt = e.updatedAt = new Date()
})
console.log(categories);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', categories, {});
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
    await queryInterface.bulkDelete('Categories', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
