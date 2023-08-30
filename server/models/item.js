'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category, { foreignKey: "categoryId" })
      Item.belongsTo(models.User, { foreignKey: "authorId" })
      Item.hasMany(models.Ingredient, { foreignKey: "itemId" })
    }

    static async createItem(req) {
      const t = await sequelize.transaction();
      try {
        const { name, description, price, imgUrl, categoryId, ingredients } = req.body;
        const item = await Item.create(
          {
            name,
            description,
            price,
            imgUrl,
            categoryId,
            authorId: req.user.id,
          },
          { transaction: t }
        );
        await sequelize.models.Ingredient.bulkCreate(
          ingredients.map((ingredient) => {
            return {
              name: ingredient,
              itemId: item.id,
            };
          }),
          { validate: true, transaction: t }
        );
        await t.commit();
      } catch (err) {
        t.rollback();
      }
    }

  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Description is required" },
        notEmpty: { msg: "Description is required" },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Price is required" },
        notEmpty: { msg: "Price is required" },
        min: 5000,
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Image URL is required" },
        notEmpty: { msg: "Image URL is required" },
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};