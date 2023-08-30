'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
          min: 5000
        }
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};