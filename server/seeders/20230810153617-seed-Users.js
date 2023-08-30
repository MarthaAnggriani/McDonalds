'use strict';
const fs = require("fs");
const { hashPassword } = require("../helpers/bcrypt");
const user = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"))
user.map(e => {
  e.password = hashPassword(e.password);
  e.createdAt = e.updatedAt = new Date()
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', user, {});
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
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
